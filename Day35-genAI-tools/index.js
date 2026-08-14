import readline from "node:readline/promises";
import { ChatMistralAI  } from "@langchain/mistralai";
import { createAgent, HumanMessage, tool } from "langchain";
import { sendEmail } from "./email.js";
import searchWeb from "./travily.js";
import "dotenv/config";
import * as z from "zod";

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
});

const model = new ChatMistralAI ({
    model : "mistral-small-latest",
    apiKey : process.env.MISTRAL_API_KEY
});

const emailTool = tool(
    sendEmail,
    {
        name : "send_mail",
        description : "Send Mail to person using there given email address",
        schema : z.object({
            to : z.string().describe("This is the recipient's email"),
            subject : z.string().describe("The subject od the email"),
            html : z.string().describe("The HTML content of the email")
        })
        
    }
);

const webSearch_tool = tool(searchWeb, {
    name: "web_search",
    description: "Search the web and retrieve relevant information from web pages using the Tavily API.",
    parameters: z.object({
        query: z.string().describe("The search query to find relevant information on the web.")
    })
});

const agent = createAgent({
    model,
    tools : [emailTool, webSearch_tool]
})

const messages = [];

while(true){
    const user_question = await rl.question("\x1b[32mYou : \x1b[0m");

    messages.push(new HumanMessage(user_question));

    const resp = await agent.invoke({ messages });

    messages.push(resp.messages[resp.messages.length -1]);

    console.log(`\x1b[31mAI : \x1b[0m${resp.messages[resp.messages.length - 1].content}`);
    // console.log(messages);
}

rl.close();