const app = require("./src/app");
const port = process.env.Port; 
const connectDB = require("./src/config/database");

connectDB();

app.get("/", (req,res) => {
    res.send("Hello");
});

app.listen(port, () => console.log(`Server is running on ${port}`));