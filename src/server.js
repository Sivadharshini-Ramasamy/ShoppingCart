const http = require("http");
const app = require("./backend/app");
/* const server = http.createServer((req,res)=>{
    res.end("Welcome to Node");
});
server.listen(3000,()=>{
    console.log("Check url http://localhost:3000");
}); */

const server = http.createServer(app);

server.listen(3000,()=>{
    console.log("Check url http://localhost:3000");
});