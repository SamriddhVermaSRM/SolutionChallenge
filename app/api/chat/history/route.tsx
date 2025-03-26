import { OllamaEmbeddings, ChatOllama } from '@langchain/ollama';
import { z } from 'zod';
import { tool } from '@langchain/core/tools';
import { MemorySaver } from '@langchain/langgraph';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { v4 as uuidv4 } from 'uuid';
import { ChatGroq } from '@langchain/groq';
import { JSONLoader } from 'langchain/document_loaders/fs/json';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { memory } from '../route';
import { vectorStore } from '../route';

export async function POST(req: Request) {
    const { question } = await req.json();
    const JSONdata = {
        symptoms: {
            primarySymptom: "headache",
            duration: "days",
            severity: 5,
            additional: {
                fever: false,
                cough: false,
                fatigue: false,
                nausea: false
            }
        },
        environment: {
            temperature: "moderate",
            humidity: "moderate",
            airQuality: "moderate",
            location: ""
        },
        lifestyle: {
            exerciseFrequency: "moderate",
            dietType: "balanced",
            sleepDuration: "7-8",
            stressLevel: 4
        }
    }
    //Ollama (on cmd: ollama pull nomic-embed-text)
    const embed = new OllamaEmbeddings({ model: 'nomic-embed-text' });

    // GROQ
    // const llm = new ChatGroq({
    // 	model: 'llama-3.3-70b-versatile',
    // 	temperature: 0,
    // 	apiKey: 'YOUR_GROQ_API_KEY_HERE',
    // });

    // Ollama (on cmd: ollama pull llama3.2:latest)
    const llm = new ChatOllama({
        model: 'llama3.2',
        temperature: 0,
        stop: ['\n\n'],
    });

    // DB to store embeddings
    const vS = vectorStore(embed);


    // JSON to Blob
    const lissss = new Blob([JSON.stringify(JSONdata)], {
        type: 'application/json',
    });

    // loader for Blob
    const jsonLoader = new JSONLoader(lissss);

    // Load and create chunks of data
    const docs = await jsonLoader.load();
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    const allSplits = await splitter.splitDocuments(docs);
    console.log('allSplits', allSplits);


    // Save all chunks to DB
    vS.addDocuments(allSplits);

    // For retrieve tool
    const retrieveSchema = z.object({ query: z.string() });
    const retrieve = tool(
        async ({ query }) => {
            const retrievedDocs = await vS.similaritySearch(query, 2);
            const serialized = retrievedDocs
                .map(
                    (doc) => `Source: ${doc.metadata.source}\nContent: ${doc.pageContent}`
                )
                .join('\n');
            return [serialized, retrievedDocs];
        },
        {
            name: 'retrieve',
            description: 'Retrieve information related to a query.',
            schema: retrieveSchema,
            responseFormat: 'content_and_artifact',
        }
    );

    // create a new config for each new user (should get automatically created ig)
    const config1 = { configurable: { thread_id: uuidv4() } };

    // RAG agent with memory and retrieve function to auto create retriever queries
    const agent = createReactAgent({
        llm: llm,
        tools: [retrieve],
        checkpointer: memory,
    });


    // console.log('Get chat history with given uuid');

    // chat history
    const prevHis = await agent.getState(config1);
    console.log(prevHis);
    return new Response(JSON.stringify({ reply: prevHis }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
    // console.log(ans);


    
}


