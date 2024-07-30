import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.YOUR_SITE_URL,
    "X-Title": process.env.YOUR_SITE_NAME,
  },
});

interface Flashcard {
  question: string;
  answer: string;
}

export async function POST(request: NextRequest) {
  try {
    const { topic } = (await request.json()) as { topic: string };

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct:free",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates flashcards. Provide 5 question-answer pairs about the given topic in JSON format. The response should be an array of objects, each with 'question' and 'answer' properties.",
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

    // Parse the content as JSON, or create a structured format if it's not valid JSON
    let flashcards: Flashcard[];
    try {
      flashcards = JSON.parse(content);
    } catch (error) {
      // If parsing fails, attempt to structure the content
      const lines = content.split("\n").filter((line) => line.trim() !== "");
      flashcards = [];
      for (let i = 0; i < lines.length; i += 2) {
        flashcards.push({
          question: lines[i].replace(/^Q: /, "").trim(),
          answer: lines[i + 1]?.replace(/^A: /, "").trim() || "",
        });
      }
    }

    return NextResponse.json(flashcards, { status: 200 });
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return NextResponse.json(
      { error: "Error generating flashcards" },
      { status: 500 },
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_API_KEY,
//   defaultHeaders: {
//     "HTTP-Referer": process.env.YOUR_SITE_URL,
//     "X-Title": process.env.YOUR_SITE_NAME,
//   },
// });

// interface Flashcard {
//   question: string;
//   answer: string;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { topic } = (await request.json()) as { topic: string };

//     const completion = await openai.chat.completions.create({
//       model: "meta-llama/llama-3.1-8b-instruct:free",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a helpful assistant that generates flashcards. Provide 5 question-answer pairs about the given topic in JSON format. The response should be an array of objects, each with 'question' and 'answer' properties.",
//         },
//         {
//           role: "user",
//           content: `Generate 5 flashcards about ${topic}.`,
//         },
//       ],
//     });

//     const content = completion.choices[0]?.message?.content;
//     if (!content) {
//       throw new Error("No content generated from OpenAI");
//     }

//     // Parse the content as JSON, or create a structured format if it's not valid JSON
//     let flashcards: Flashcard[];
//     try {
//       flashcards = JSON.parse(content);
//     } catch (error) {
//       // If parsing fails, attempt to structure the content
//       const lines = content.split("\n").filter((line) => line.trim() !== "");
//       flashcards = [];
//       for (let i = 0; i < lines.length; i += 2) {
//         flashcards.push({
//           question: lines[i].replace(/^Q: /, "").trim(),
//           answer: lines[i + 1]?.replace(/^A: /, "").trim() || "",
//         });
//       }
//     }

//     return NextResponse.json(flashcards, { status: 200 });
//   } catch (error) {
//     console.error("Error generating flashcards:", error);
//     return NextResponse.json(
//       { error: "Error generating flashcards" },
//       { status: 500 },
//     );
//   }
// }

// Below is the openai version

// import { NextApiRequest, NextApiResponse } from "next";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// interface Flashcard {
//   question: string;
//   answer: string;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method === "POST") {
//     try {
//       const { topic } = req.body as { topic: string };
//       const completion = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are a helpful assistant that generates flashcards. Provide 5 question-answer pairs about the given topic in JSON format.",
//           },
//           {
//             role: "user",
//             content: `Generate 5 flashcards about ${topic}.`,
//           },
//         ],
//       });

//       const content = completion.choices[0]?.message?.content;

//       if (!content) {
//         throw new Error("No content generated from OpenAI");
//       }

//       const flashcards: Flashcard[] = JSON.parse(content);
//       res.status(200).json(flashcards);
//     } catch (error) {
//       console.error("Error generating flashcards:", error);
//       res.status(500).json({ error: "Error generating flashcards" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
