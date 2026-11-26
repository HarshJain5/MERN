//? FS (File System)


//? To create a file
// using synchronous method
// const fs = require('fs');
// fs.writeFileSync('file.txt', 'Hello World!');

// fs.writeFileSync('file.txt', 'I am HArsh');
// so the problem is it will override the previous data
// to overcome this we can use appendFileSync() method

//? appendFileSync() method
// const fs = require('fs');
// fs.appendFileSync('file.txt', 'I am Harsh');
// fs.appendFileSync('file.txt', 'I am a Web Developer');

//? To read a file
// const fs = require('fs');
// const data = fs.readFileSync('file.txt');
// console.log(data);
// it will give data in unreadable format or in buffer format like binary so to overcome this we have two ways
// 1. Using encoding parameter
// const data = fs.readFileSync('file.txt', 'utf-8'); // mostly recommended to use this method
// console.log(data);
// 2. Using toString() method
// const data = fs.readFileSync('file.txt');
// console.log(data.toString());

//? update
// it means update the file name 
// const fs = require('fs');
// fs.renameSync('file.txt', 'newFile.txt');

//you can also change the extension also
// fs.renameSync('newFile.txt', 'newFile.java');


//? To Delete
// const fs = require('fs');
// fs.unlinkSync('newFile.java');



//Asynchronous
// performedusing two ways
//1. using callback function
//? To create file
// const fs = require('fs')
// fs.writeFile('./demo.txt','i am async file')   // getting an error without callback function because it is asynchronous so it will take time to create a file and if we don't use callback function then it will give an error

// fs.writeFile('./demo.txt','i am async file',()=>{})

// fs.writeFile('./demo.txt','i am async file',()=>{
//     console.log('file created')
// })


//? To read fil
// fs.readFile('./demo.txt','utf-8',(err, data)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data)
//     }
// })
// fs.readFile('./demo.txt','utf-8',(err,data)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data)
//     }
// })

//? update
// fs.rename("./demo.txt", "newdemoo.java", ()=>{
//     console.log("File Updated")
// })

//?delete
// fs.unlink("./newdemo.java", ()=>{
//     console.log("File Deleted")
// })


//2. using async await 
//? create
// const fs = require('fs')
// const createFile = async()=>{
//     await fs.writeFile('./demo.txt','')
//     console.log('file created')
// }
// createFile()        //getting callback error to avoid it use promises


// const fs = require('fs').promises
// const fs = require('fs/promises')
// const createFile = async()=>{
//     try{
//         await fs.writeFile('./demo.txt','')
//         console.log('file created')
//     }
//     catch(err){
//         console.log(err)
//     }
// }
// createFile()

//?Read FIle
// const fs = require('fs/promises')
// const readFile = async()=>{
//     try{
//         const data = await fs.readFile('./demo.txt','utf-8')
//         console.log(data)
//     }
//     catch(err){
//         console.log(err)
//     }
// }
// readFile()

//? update
// const fs = require('fs/promises')
// const updateFile = async()=>{
//     try{
//         await fs.rename('./demo.txt','./newDemo.java')
//         console.log('File Updated')
//     }
//     catch(err){
//         console.log(err)
//     }
// }
// updateFile()

//? delete
// const fs = require('fs/promises')
// const deleteFile = async()=>{
//     try{
//         await fs.unlink('./newDemo.java')
//         console.log("file deleted")
//     }
//     catch(err){
//         console.log(err)
//     }
// }
// deleteFile()

//append also works



//? to overcome the problem in which the data is too much to read using readfile so user can lose intrest in the application so to overcome this problem we can use readstream which is a built in module of node.js
//? STREAMS
// collection of data like array
// it reads data in chunks and not all at once
// using fs module we can read data in chunks using readstream and write data in chunks using writestream


// type of streams
// 1. Readable streams
// which is used to read data in chunks from a file or any other source
// const fs = require('fs');
// let data  = fs.createReadStream('file.txt','utf8');
// it will not give the expected output so we use events
//?events
// data.on('data',(info)=>{
//     console.log(info);
// })
// data.on('error',(err)=>{
//     console.log(err);
// })


// 2. Writable streams
// which is used to write data in chunks to a file or any other destination
// const fs = require('fs');
// fs.createWriteStream('file.txt').write('Hello World');
// console.log("File Written")


// 3. Duplex streams
// here we can perform both reading and writing operations on the same stream
// const fs = require('fs');
// const stream = fs.createReadStream('file.txt','utf8');
// stream.on('data',(info)=>{
//     console.log(info);
// })
// stream.on('error',(err)=>{
//     console.log(err);
// })   
// // 
// stream.pipe(fs.createWriteStream('file2.txt'));


// 4. Transform streams
// it is a type of duplex stream which can modify the data while reading or writing



//? Buffer
// in node js it is an class
// it is used to store data in temporary purpose
// it is used to manipulate the binary data
// buffer 