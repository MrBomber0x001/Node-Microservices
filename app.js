import express from 'express';
import morgan from 'morgan';
import httpProxy from 'http-proxy';
import rateLimit from 'express-rate-limit';
import http from 'http'
const app = express();

const PORT = process.env.PORT || 3000



const limiter = rateLimit({
    windowMs: 1000 * 60, //1 minute
    max: 10, //10 requests per minute
    message: "Rate limit exceeded, please try again!"
})



app.use(morgan("combined"))
//Apply limiter to all requests
app.use(limiter);


//A proxy to handle load balancing
const proxy = httpProxy.createProxyServer();

app.get("/", (req, res) => {
    res.send("welcome to the gateway")
})


const services = [
    { target: "http://localhost:3001" }, // service 1
    { target: "http://localhost:3002" }, // service 2
    { target: "http://localhost:3003" }, // service 3
]


app.use('/service', (req, res) => {
    const { url } = req;
    const selectedService = services[Math.floor(Math.random() * services.length)];
    proxy.web(req, res, { target: selectedService.target + url })
})

//creating a seperating instances of the service
http.createServer((req, res) => {
    res.end("Service 1 response")
}).listen(3001)

http.createServer((req, res) => {
    res.end("Service 1 response")
}).listen(3001)

http.createServer((req, res) => {
    res.end("Service 1 response")
}).listen(3001)



//starting the gateway
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Edge gateway is running on ${PORT}`);
})