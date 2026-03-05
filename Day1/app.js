const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server first request");   
});

app.post("/notes", (req, res) => {
    console.log(req.body);
    if(!req.body.title || !req.body.description) {
        return res.status(400).send("Title and description are required");
    }
   
});

app.listen(3000, () => console.log("Server is runnning on port 3000"));