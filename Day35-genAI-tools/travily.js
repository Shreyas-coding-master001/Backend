import {tavily} from "@tavily/core";
import "dotenv/config";

const tvly = tavily({api : process.env.Travily_API_KEY});

async function searchWeb(search){
    const resp = await tvly.search(search);

    // console.log("✅ Tavily response received");

    return resp;
}

export default searchWeb;