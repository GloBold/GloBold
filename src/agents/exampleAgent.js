import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateColdEmail(businessName, offer) {
  const prompt = `Write a cold email to ${businessName} about ${offer}. Make it professional and short.`;
  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt,
    max_tokens: 150,
  });
  return response.data.choices[0].text;
} 