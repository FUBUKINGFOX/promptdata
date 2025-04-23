import { ChatOllama } from "@langchain/community/chat_models/ollama";

const ollamaLlm = new ChatOllama({
  baseUrl: "http://localhost:", // Default value
  model: "llama2", // Default value
});