import express from 'express';
const app = express();

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("working")
})

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})