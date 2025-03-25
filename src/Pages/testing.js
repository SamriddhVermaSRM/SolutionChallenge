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
// for typeScript only
// import { ChatPromptTemplate } from '@langchain/core/prompts';

const testing = async () => {
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
		temperature: 0.5,
		stop: ['\n\n'],
	});

	// DB to store embeddings
	const vectorStore = new MemoryVectorStore(embed);

	// User data, from report save as JSON
	const JSONdata = {
		content:
			'my name is Samriddh Verma and I am a software engineer with over 10 years of experience in web development. I have a strong background in JavaScript, HTML, CSS, and various frameworks such as React and Angular. I am passionate about creating user-friendly applications and continuously learning new technologies to improve my skills. In my free time, I enjoy contributing to open-source projects and sharing my knowledge with the developer community.',
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
	console.log('allSplits', allSplits);

	// Save all chunks to DB
	vectorStore.addDocuments(allSplits);

	// For retrieve tool
	const retrieveSchema = z.object({ query: z.string() });
	const retrieve = tool(
		async ({ query }) => {
			const retrievedDocs = await vectorStore.similaritySearch(query, 2);
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

	// Memory for chat history
	const memory = new MemorySaver();

	// RAG agent with memory and retrieve function to auto create retriever queries
	const agent = createReactAgent({
		llm: llm,
		tools: [retrieve],
		checkpointer: memory,
	});

	// message
	const msg = {
		role: 'user',
		content:
			'what are the tech stack this person knows, after that tell me what each tech stack can do',
	};

	// usage
	const ans = await agent.invoke(
		{
			messages: msg,
		},
		// pass the config (uuid) while generating to save to History
		config1
	);
	console.log(ans);

	console.log('Get chat history with given uuid');

	// chat history
	const prevHis = await agent.getState(config1);
	console.log(prevHis);
};
testing();
