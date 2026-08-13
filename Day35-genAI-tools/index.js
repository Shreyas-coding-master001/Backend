import readline from "node:readline/promises";
import { ChatMistralAI  } from "@langchain/mistralai";
import { HumanMessage } from "langchain";
import "dotenv/config";

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
});

const model = new ChatMistralAI ({
    model : "mistral-small-latest",
    apiKey : process.env.MISTRAL_API_KEY
})

const messages = [];

while(true){
    const user_question = await rl.question("\x1b[32mYou : \x1b[0m");

    messages.push(new HumanMessage(user_question));

    const resp = await model.invoke(messages);

    messages.push(resp);

    console.log(`\x1b[31mAI : \x1b[0m${resp.content}`);
    console.log(messages);
}

rl.close();