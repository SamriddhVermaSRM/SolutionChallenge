import { OllamaEmbeddings, ChatOllama } from '@langchain/ollama';
import { ChatGroq } from '@langchain/groq';
import { JSONLoader } from 'langchain/document_loaders/fs/json';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
// for typeScript only
// import { ChatPromptTemplate } from '@langchain/core/prompts';
import { pull } from 'langchain/hub';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
function Home() {
	const testing = async () => {
		const embed = new OllamaEmbeddings({ model: 'nomic-embed-text' });

		// const llm = new ChatGroq({
		// 	model: 'llama-3.3-70b-versatile',
		// 	temperature: 0,
		// 	apiKey: 'YOUR_GROQ_API_KEY_HERE',
		// });

		const llm = new ChatOllama({
			model: 'llama3.2',
			temperature: 0,
			stop: ['\n\n'],
		});

		const vectorStore = new MemoryVectorStore(embed);

		const lissss = new Blob(
			[
				JSON.stringify({
					content:
						'my name is Samriddh Verma and I am a software engineer with over 10 years of experience in web development. I have a strong background in JavaScript, HTML, CSS, and various frameworks such as React and Angular. I am passionate about creating user-friendly applications and continuously learning new technologies to improve my skills. In my free time, I enjoy contributing to open-source projects and sharing my knowledge with the developer community.',
				}),
			],
			{
				type: 'application/json',
			}
		);

		const jsonLoader = new JSONLoader(lissss);

		const docs = await jsonLoader.load();

		const splitter = new RecursiveCharacterTextSplitter({
			chunkSize: 1000,
			chunkOverlap: 200,
		});
		const allSplits = await splitter.splitDocuments(docs);

		console.log('allSplits', allSplits);

		vectorStore.addDocuments(allSplits);

		// Define prompt for question-answering
		// for typeScript uncomment dis
		// const promptTemplate = await pull<ChatPromptTemplate>('rlm/rag-prompt');
		const promptTemplate = await pull('rlm/rag-prompt');

		// Compile application and test
		let question = 'What is the name of the person who is in the document?';

		const retrievedDocs = await vectorStore.similaritySearch(question);
		const docsContent = retrievedDocs.map((doc) => doc.pageContent).join('\n');
		const messages = await promptTemplate.invoke({
			question: question,
			context: docsContent,
		});
		const answer = await llm.invoke(messages);
		console.log('answer', answer);
	};
	testing();
	return <></>;
}

export default Home;
