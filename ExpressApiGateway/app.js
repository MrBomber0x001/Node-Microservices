const app = require("express")()
const port = 3000
app.use("/api", (req, res) => {
    res.send("working")
})
app.listen(3000, () => {
    console.log("running on port" + port);
})