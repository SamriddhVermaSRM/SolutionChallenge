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

export async function GET(req: Request) {
	const prevHis = await agent.getState(config);
	console.log(prevHis);
	return new Response(JSON.stringify({ reply: prevHis }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
}

export async function PUT(req: Request) {
	const JSONdata = {
		symptoms: {
			primarySymptom: 'headache',
			duration: 'days',
			severity: 5,
			additional: {
				fever: false,
				cough: false,
				fatigue: false,
				nausea: false,
			},
		},
		environment: {
			temperature: 'moderate',
			humidity: 'moderate',
			airQuality: 'moderate',
			location: '',
		},
		lifestyle: {
			exerciseFrequency: 'moderate',
			dietType: 'balanced',
			sleepDuration: '7-8',
			stressLevel: 4,
		},
	};
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
	// console.log('allSplits', allSplits);

	// Save all chunks to DB
	vectorStore.addDocuments(allSplits);
}

export async function POST(req: Request) {
	const { question } = await req.json();

	// GROQ
	// const llm = new ChatGroq({
	// 	model: 'llama-3.3-70b-versatile',
	// 	temperature: 0,
	// 	apiKey: 'YOUR_GROQ_API_KEY_HERE',
	// });

	// message with question
	const msg = {
		role: 'user',
		content: question,
	};

	// message with system prompt
	const systemPrompt = {
		role: 'system',
		content: `You are a medical assistant. Answer the question based on the symptoms provided. If you don't know the answer, say "I don't know".`,
	};

	// usage
	const ans = await agent.invoke(
		{
			messages: [systemPrompt, msg],
		},
		// pass the config (uuid) while generating to save to History
		config
	);

	return new Response(JSON.stringify({ reply: true, response: ans }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
	// console.log(ans);
}

// Ollama (on cmd: ollama pull llama3.2:latest)
export const llm = new ChatOllama({
	model: 'llama3.2',
	temperature: 0,
	stop: ['\n\n'],
});

//Ollama (on cmd: ollama pull nomic-embed-text)
export const embed = new OllamaEmbeddings({ model: 'nomic-embed-text' });

// DB to store embeddings
export const vectorStore = new MemoryVectorStore(embed);

// Memory for chat history
export const memory = new MemorySaver();

// RAG agent with memory and retrieve function to auto create retriever queries
export const agent = createReactAgent({
	llm: llm,
	tools: [
		tool(
			async ({ query }) => {
				const retrievedDocs = await vectorStore.similaritySearch(query, 2);
				const serialized = retrievedDocs
					.map(
						(doc) =>
							`Source: ${doc.metadata.source}\nContent: ${doc.pageContent}`
					)
					.join('\n');
				return [serialized, retrievedDocs];
			},
			{
				name: 'retrieve',
				description:
					'Retrieve the patient history, which can be used to better answer the question.',
				schema: z.object({ query: z.string() }),
				responseFormat: 'content_and_artifact',
			}
		),
	],
	checkpointer: memory,
});

// create a default config for the agent
export const config = { configurable: { thread_id: 'abc123' } };
