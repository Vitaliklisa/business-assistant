// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt missing" });
  }

  if (prompt.length > 500) {
    return res.status(400).json({ error: "Prompt too long" });
  }

  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt: ` AI business assistant that can predict market trends with high accuracy. AI helps a business owner make strategic decisions that lead to significant growth, detailing the interactions and the thought process behind the AI’s recommendations.”
    Topic: ${prompt}\n
      Answer:`,
    max_tokens: 500,
    temperature: 0.5,
    presence_penalty: 0,
    frequency_penalty: 0,
  });
  const quote = completion.data.choices[0].text;

  res.status(200).json({ quote });
}
