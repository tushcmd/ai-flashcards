import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Flashcard {
  question: string;
  answer: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { topic } = req.body as { topic: string };
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that generates flashcards. Provide 5 question-answer pairs about the given topic in JSON format.",
          },
          {
            role: "user",
            content: `Generate 5 flashcards about ${topic}.`,
          },
        ],
      });

      const content = completion.choices[0]?.message?.content;

      if (!content) {
        throw new Error("No content generated from OpenAI");
      }

      const flashcards: Flashcard[] = JSON.parse(content);
      res.status(200).json(flashcards);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      res.status(500).json({ error: "Error generating flashcards" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
