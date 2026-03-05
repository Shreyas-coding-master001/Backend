const express = require('express');
const app = express();

let notes = [];
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Server Initial request");
});

app.get("/notes",(req,res)=>{
    res.json(notes);
});

app.post("/notes",(req,res)=>{
    const {title, description} = req.body;
    if(!title || !description) {
        return res.status(400).send("Title and description both are required");
    }
    
    notes.push({title,description});
    res.status(201).json({message: "Note added successfully"});
});

app.delete("/notes/:idx", (req,res)=>{
    delete notes[req.params.idx];
    res.json({message: "Note deleted successfully"});
});

app.patch("/notes/:idx", (req,res)=>{

    const idx = req.params.idx;
    if (typeof notes[idx] === 'undefined') {
        return res.status(404).json({ error: "Note not found" });
    }

    if(req.body.title) {
        notes[ idx].title = req.body.title; 
    }
    if(req.body.description) {
        notes[idx].description = req.body.description;
    }
    
    res.json({message: "Note updated successfully", note: notes[idx]});
});

app.put("/notes/:idx",(req,res)=>{
    notes[req.params.idx] = req.body;

    console.log(req.body);

    res.status(200).json({message: "Note Succesfully changed!!"});
    
});

app.listen(3000, () => console.log("Server is running on port 3000"));