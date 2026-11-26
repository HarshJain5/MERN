//? HTTP 
// Hyper text transfer protocol (HTTP) is an application layer protocol for distributed, collaborative, hypermedia information systems. HTTP is the foundation of data communication for the World Wide Web, where hypertext documents include hyperlinks to other resources that the user can easily access, for example by a mouse click or by tapping the screen. HTTP was developed to facilitate the sharing of information between clients and servers.
// built in module for HTTP requests and responses
// communicate & transfer the data between client and server
// stateless protocol: which will not hold the information of previous request and treats every request as a new request
// create our own server

// const http = require('http')

// http.createServer((req,res)=>{
//     res.end("Hello Node Js")
// }).listen(5000,err=>{
//     if(err) throw err;
//     console.log("Server is Running on Port 5000")
// })

//?Basic Routing
// http.createServer((req,res)=>{
//     if(req.url=='/home' || req.url == '/'){
//         res.end("Home Node Js")
//     } else if(req.url=='/about'){
//         res.end("About Node Js")
//     } else if(req.url=='/contact'){
//         res.end("Contact Node Js")
//     } else if(req.url=='/login'){
//         res.end("Login Node Js")
//     } else {
//         res.end("404 Not Found")
//     }
// }).listen(5000,err=>{
//     if(err) throw err;
//     console.log("Server is Running on Port 5000")
// })

// const fs = require('fs')

// http.createServer((req,res)=>{
//     if(req.url=='/home' || req.url == '/'){
//         fs.createReadStream("./home.html").pipe(res)
//     } else if(req.url=='/about'){
//         res.end("About Node Js")
//     } else if(req.url=='/contact'){
//         res.end("Contact Node Js")
//     } else if(req.url=='/login'){
//         res.end("Login Node Js")
//     } else {
//         res.end("404 Not Found")
//     }
// }).listen(5000,err=>{
//     if(err) throw err;
//     console.log("Server is Running on Port 5000")
// })


//? HTTP Status Code
// 100 to 500 each first 5 codes
// 1. 100 Continue
// 2. 101 Switching Protocols
// 3. 102 Processing 
// 4. 103 Early Hints
// 5. 104 Upload Resumption Supporte

// 1. 200 OK
// 2. 201 Created
// 3. 202 Accepted
// 4. 203 Non-Authoritative Information
// 5. 204 No Content

// 1. 300 Multiple Choices
// 2. 301 Moved Permanently
// 3. 302 Found
// 4. 303 See Other
// 5. 304 Not Modified

// 1. 400 Bad Request
// 2. 401 Unauthorized
// 3. 402 Payment Required
// 4. 403 Forbidden
// 5. 404 Not Found

// 1. 500 Internal Server Error
// 2. 501 Not Implemented
// 3. 502 Bad Gateway
// 4. 503 Service Unavailable
// 5. 504 Gateway Timeout


//?db connection
const http = require('http')
const mongodb = require('mongodb').MongoClient

let dbConnection = async()=>{
    let connection = await mongodb.connect("mongodb://localhost:27017")
    let db = connection.db("school")
    let collection = db.createCollection("student")
    console.log("Database Connected")
}
dbConnection()