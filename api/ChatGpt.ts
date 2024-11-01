import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

type Quote = {
    title: string,
    message:string
}

export default async function getChatCompletion() {

    const agents = {
        redactor: {
          role: "system",
          content: "Eres un Redactor de Contenidoo experto en coaching motivacional, con un tono calmado y accesible, Genera un objeto quote con message 50 palabras para darme animos de empoderamiento y mejorar en el trabajo y un title acorde"
        },
        editor: {
          role: "user",
          content: `Eres un experto experto en coaching motivacional. Respondes de manera profesional, con un tono calmado y accesible. Ofreces ejemplos detallados y explicaciones prácticas sobre fraces de motivacionales empresariales.`
        }
      };

      const chatCompletion = await openai.chat.completions.create({
        messages: [{ 
            role: "system", 
            content: agents.redactor.content },
            { 
                role: "user", 
                content: agents.editor.content}
        ],
        tools: [{type:"function",function:{
            description:"Genra un objeto JSON tipo Quote",
            name:"quote",
            parameters: {
                type:"object",
                properties:{
                    title: {type:"string"},
                    message: {type:"string"}
                },
                required:["title","message"]
            }
        }
        }],
        tool_choice: {type: "function", function: {name: "quote"}},
        model: "gpt-4o",
    });
    const content = chatCompletion.choices[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (content) {
        const json = <Quote>JSON.parse(content);
        return json;
    } else {
        throw new Error("Received null content from OpenAI API");
    }
}

