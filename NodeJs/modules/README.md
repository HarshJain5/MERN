# 🚀 Node.js Complete Study Guide

> **A comprehensive, beginner-friendly reference guide covering Node.js architecture, asynchronous programming, core modules, streams, buffers, HTTP servers, status codes, and interview/tricky practice questions.**

## 📑 Table of Contents

1. [Introduction to Node.js](#-1-introduction-to-nodejs)
2. [Architecture & Asynchronous Execution](#-2-architecture--asynchronous-execution)
   * [Why Node.js is Single-Threaded](#why-nodejs-is-single-threaded)
   * [Execution Priority Order](#execution-priority-order)
   * [libuv & The Event Loop (6 Phases)](#libuv--the-event-loop-6-phases)
3. [Node.js Modules](#-3-nodejs-modules)
   * [import vs. require](#import-es-modules-vs-require-commonjs)
   * [1. Local (Custom) Modules](#1-local-custom-modules)
   * [2. Third-Party Modules & npm](#2-third-party-modules--npm)
   * [3. Built-in (Core) Modules](#3-built-in-core-modules)
4. [Deep Dive into Built-in Modules](#-4-deep-dive-into-built-in-modules)
   * [OS Module (`os`)](#a-os-module-os)
   * [Path Module (`path`)](#b-path-module-path)
   * [URL Module (`url`)](#c-url-module-url)
   * [File System Module (`fs`)](#d-file-system-module-fs)
   * [Streams, Events & Buffers](#e-streams-events--buffers)
   * [HTTP Module & Web Server (`http`)](#f-http-module--web-server-http)
5. [HTTP Request Methods & Status Codes](#-5-http-request-methods--status-codes)
6. [Interview, Tricky Output & Practice Questions](#-6-interview-tricky-output--practice-questions)
   * [Part A: Top Node.js Interview Questions](#part-a-top-nodejs-interview-questions)
   * [Part B: Tricky Event Loop & Async Output Questions](#part-b-tricky-event-loop--async-output-questions)
   * [Part C: Hands-On Practice Problems](#part-c-hands-on-practice-problems)

---

## 🌟 1. Introduction to Node.js

### What is Node.js?
**Node.js** is an **open-source**, **cross-platform** JavaScript **runtime environment** that allows developers to execute JavaScript code outside of a web browser (without needing an HTML file).

* **Open Source:** Completely free to use, and its source code is publicly available for anyone to inspect, modify, or contribute to.
* **Cross-Platform:** Runs seamlessly across major operating systems including Windows, Linux, macOS, and Ubuntu.
* **Runtime Environment:** Provides all the necessary tools, libraries, and APIs required to execute `.js` files directly on a machine or server.

### Why Use Node.js? (Key Advantages)
1. **Build Custom Servers:** Create fast, lightweight web servers from scratch.
2. **Real-Time Applications:** Ideal for chat apps, live notifications, and collaborative tools.
3. **High Scalability:** Handles thousands of concurrent connections efficiently.
4. **Full-Stack JavaScript:** Enables using a single programming language (JavaScript) for both client-side and server-side development.
5. **High Performance & Speed:** Built on Google Chrome's V8 JavaScript engine, compiling JS directly into machine code.

### History
* **Inventor:** Ryan Dahl
* **Year:** 2009
* **How it was built:** Ryan Dahl embedded C++ code into Google's **V8 JavaScript engine** to give JavaScript system-level capabilities (like file access and networking).

---

## ⚙️ 2. Architecture & Asynchronous Execution

### Why Node.js is Single-Threaded
By default, Node.js is **single-threaded** and **asynchronous (non-blocking)** in nature.
* Instead of spawning a separate thread for every incoming client request (which consumes heavy memory), Node.js executes all JavaScript code on a **single main thread**.
* It follows an **Event-Driven Architecture** powered by the **Event Loop** and the **libuv** thread pool to handle multiple asynchronous operations concurrently.

### Synchronous vs. Asynchronous Execution
* **Synchronous Code:** Executes line-by-line on the **Call Stack** via the main thread. It blocks subsequent code until the current line finishes (**1st Priority**).
* **Asynchronous Code:** Time-consuming tasks (file I/O, network calls, timers) are offloaded by the main thread to **libuv / OS**. Once completed, their callbacks are queued and pushed back to the Call Stack by the Event Loop.

### Execution Priority Order
When mixing synchronous code, microtasks, and macrotasks, Node.js executes them in the following strict priority order:

$$
\text{Synchronous Code} > \text{process.nextTick()} > \text{Promises / queueMicrotask()} > \text{setTimeout(0)} > \text{setImmediate()} > \text{fetch() / I/O}
$$

#### Example 1: Basic `setTimeout` vs. Synchronous Code
```javascript
console.log("we");

setTimeout(() => {
    console.log("Timeout-1");
}, 1000);

console.log("love");

setTimeout(() => {
    console.log("Timeout-2");
}, 1000);

console.log("Nodejs");

setTimeout(() => {
    console.log("Timeout-3");
}, 2000);

/* Output:
we
love
Nodejs
Timeout-1
Timeout-2
Timeout-3
*/
```

#### Example 2: `process.nextTick()`, Promises, `setTimeout()`, and `setImmediate()`
```javascript
console.log("A");

process.nextTick(() => console.log("B"));

Promise.resolve().then(() => {
    console.log("C");
    process.nextTick(() => console.log("D"));
    Promise.resolve().then(() => console.log("E"));
});

setTimeout(() => console.log("F"), 0);
setImmediate(() => console.log("G"));

console.log("H");

/* Output:
A
H
B
C
D
E
F
G
*/
```
> **Why?** Synchronous logs (`A`, `H`) run first. Next, the `nextTick` queue (`B`) empties before the Promise microtask queue (`C`). Inside the Promise, `D` (`nextTick`) and `E` (nested Promise) finish before moving to the Timer (`F`) and Check (`G`) phases.

### `libuv` & The Event Loop (6 Phases)

#### What is `libuv`?
* `libuv` is a multi-platform **C library** built into Node.js that provides access to the underlying Operating System (OS).
* It manages the **thread pool** for heavy asynchronous operations (File System, DNS, Crypto, Networking).
* Without `libuv`, Node.js could not perform non-blocking multi-tasking on a single thread.

#### What is the Event Loop?
* The **Event Loop** is a continuously running semi-infinite loop that acts as a **bridge between the Call Stack and `libuv`**.
* It keeps running as long as there are pending callbacks to process.
* It executes asynchronous callbacks across **6 distinct phases**:

| Phase | Name | Responsibility |
| :--- | :--- | :--- |
| **1** | **Timers** | Executes callbacks scheduled by `setTimeout()` and `setInterval()`. |
| **2** | **Pending Callbacks** | Executes I/O callbacks deferred to the next loop iteration (e.g., TCP errors). |
| **3** | **Idle, Prepare** | Internal housekeeping and preparation used by Node.js before polling. |
| **4** | **Poll** | Retrieves new I/O events and executes file/network I/O callbacks. |
| **5** | **Check** | Executes `setImmediate()` callbacks (a special timer exclusive to Node.js). |
| **6** | **Close Callbacks** | Executes cleanup callbacks when handles/sockets close (e.g., `socket.on('close')`). |

---

## 📦 3. Node.js Modules

A **module** is a reusable block of pre-written JavaScript code encapsulated in a file or object. Modules simplify complex applications and enforce the **DRY (Don't Repeat Yourself)** principle.
* By default, Node.js uses the **CommonJS** module system (`require` and `module.exports`).

### `import` (ES Modules) vs. `require` (CommonJS)

| Feature | `import` (ES Modules) | `require` (CommonJS) |
| :--- | :--- | :--- |
| **Syntax Style** | Modern JavaScript syntax (`import x from 'y'`) | Traditional Node.js syntax (`const x = require('y')`) |
| **Placement** | Usually written at the top level of a file | Can be called anywhere (inside functions or `if` blocks) |
| **Loading** | Asynchronous | Synchronous |
| **Common Usage** | Modern JS, React, Frontend, modern Node (`"type": "module"`) | Standard/default Node.js backend projects |

### 1. Local (Custom) Modules
Modules created by you inside your project directory.

#### Exporting & Importing a Single Function
```javascript
// math.js (Exporting)
let add = (a, b) => {
    console.log(a + b);
};
module.exports = add;

// app.js (Importing)
const addOperation = require('./math');
addOperation(10, 20); // Output: 30
```

#### Exporting Multiple Functions & Object Destructuring
```javascript
// operations.js (Method 1: Exporting an object)
let add = (a, b) => console.log(a + b);
let sub = (a, b) => console.log(a - b);
let div = (a, b) => console.log(a / b);

module.exports = { add, sub, div };

// operations.js (Method 2: Named exports)
exports.mul = (a, b) => console.log(a * b);

// app.js (Importing with Destructuring)
const { add, sub, div } = require('./operations');
add(10, 5); // 15
sub(10, 5); // 5
div(10, 5); // 2
```

### 2. Third-Party Modules & `npm`
External packages built by the open-source community (e.g., `express`, `mongodb`, `nodemon`).
* **`npm` (Node Package Manager):** The world's largest open-source software registry containing over **3.2 million packages**.
* **Install Command:**
  ```bash
  npm install express
  # or shorthand:
  npm i mongodb
  ```

#### `package.json`
`package.json` is the **heart/manifest file** of every Node.js project. It stores project metadata (name, version, scripts) and tracks installed dependencies. It is automatically updated when packages are installed alongside the `node_modules` folder.
* **Implicit Creation (Fast/Default):** `npm init -y` *(Automatically creates `package.json` using default values from the current folder).*
* **Explicit Creation (Interactive):** `npm init` *(Prompts you to manually enter the package name, version, description, entry point, author, and keywords).*

### 3. Built-in (Core) Modules
Pre-installed modules bundled directly inside Node.js. No installation is needed—just import them using `require('moduleName')`. Common examples: `os`, `path`, `url`, `fs`, `http`.

---

## 🛠️ 4. Deep Dive into Built-in Modules

### A. OS Module (`os`)
Provides system-level information about the computer's operating system, CPU, and memory.
```javascript
const os = require('os');

console.log("CPU Info:", os.cpus());
console.log("Logical CPUs:", os.cpus().length);
console.log("Free RAM (GB):", os.freemem() / (1024 * 1024 * 1024));
console.log("Total RAM (GB):", os.totalmem() / (1024 * 1024 * 1024));
console.log("Architecture:", os.arch());       // e.g., 'x64'
console.log("OS Type:", os.type());            // e.g., 'Windows_NT', 'Linux'
console.log("OS Release:", os.release());
console.log("OS Version:", os.version());
console.log("User Info:", os.userInfo());
```

### B. Path Module (`path`)
Helps work with and normalize file and directory paths across different operating systems (`\` on Windows vs. `/` on Linux/macOS).
```javascript
const path = require('path');

console.log("Directory Path:", __dirname);
console.log("File Path:", __filename);

console.log("Base File Name:", path.basename(__filename));       // e.g., app.js
console.log("Base Folder Name:", path.basename(__dirname));      // e.g., builtIn
console.log("File Extension:", path.extname(__filename));        // e.g., .js
console.log("Is Absolute?:", path.isAbsolute(__dirname));        // true
console.log("Is Absolute?:", path.isAbsolute("path.js"));        // false

// Parse path into an object & format back to string
const parsedPath = path.parse(__dirname);
console.log("Parsed Object:", parsedPath);
console.log("Formatted Path:", path.format(parsedPath));

// Joining and Resolving paths
console.log("Joined Path:", path.join(__dirname, 'f1', 'f2', 'file.js'));
console.log("Resolved Path:", path.resolve("os", "path", "http.js"));
```

### C. URL Module (`url`)
Used to parse web URLs into readable components and extract query parameters.
```javascript
const myUrl = new URL("http://localhost:5000/login?username=abcd&password=123");

console.log("Protocol:", myUrl.protocol);                       // 'http:'
console.log("Hostname:", myUrl.hostname);                       // 'localhost'
console.log("Pathname:", myUrl.pathname);                       // '/login'
console.log("Full Query:", myUrl.search);                       // '?username=abcd&password=123'
console.log("Username:", myUrl.searchParams.get("username"));   // 'abcd'
console.log("Password:", myUrl.searchParams.get("password"));   // '123'
```

### D. File System Module (`fs`)
Used to perform **CRUD** (Create, Read, Update, Delete) operations on files and folders. It supports **Synchronous** and **Asynchronous** (Callbacks & Promises/Async-Await) patterns.

#### 1. Synchronous Approach (Blocking)
```javascript
const fs = require('fs');

// File Operations
fs.writeFileSync("app.js", "we love Node.js");              // Create / Overwrite
fs.appendFileSync("app.js", "\nThis is appended text");     // Update / Append
let data = fs.readFileSync("app.js", "utf-8");              // Read
console.log(data);
fs.renameSync("app.js", "demo.js");                         // Rename
fs.unlinkSync("demo.js");                                   // Delete File

// Folder Operations
fs.mkdirSync("./express");                                  // Create Folder
fs.writeFileSync("./express/node.js", "");                  // Create file inside
let files = fs.readdirSync("./express", { recursive: true, withFileTypes: true });
console.log(files);
fs.renameSync("./express", "./js");                         // Rename Folder
fs.rmSync("./js", { recursive: true });                     // Delete Folder
```

#### 2. Asynchronous Approach — Using Callbacks (Non-Blocking)
```javascript
const fs = require('fs');

fs.writeFile("jsp.txt", "This is a file", (err) => {
    if (err) throw err;
    console.log("File created");
});

fs.readFile("jsp.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log("File content:", data);
});

fs.appendFile("jsp.txt", "\nMore data", () => {
    console.log("Data appended");
});

fs.mkdir("./express", () => console.log("Folder created"));
fs.rename("./express", "./js", () => console.log("Folder renamed"));
fs.rm("./js", { recursive: true }, () => console.log("Folder deleted"));
```

#### 3. Asynchronous Approach — Using `async/await` (`fs.promises`)
```javascript
const fs = require('fs').promises;

const manageFiles = async () => {
    try {
        await fs.writeFile("./jsp.json", '{"course": "Node.js"}');
        console.log("File created");

        const content = await fs.readFile("./jsp.json", "utf-8");
        console.log("Read:", content);

        await fs.appendFile("./jsp.json", "\n// Updated");
        await fs.rename("./jsp.json", "./updated.json");
        await fs.unlink("./updated.json");
        console.log("File renamed and deleted");
    } catch (err) {
        console.error("Error:", err);
    }
};

const manageFolders = async () => {
    try {
        await fs.mkdir("./jspiders");
        const list = await fs.readdir("./jspiders");
        console.log("Folder contents:", list);

        await fs.rename("./jspiders", "./qspiders");
        await fs.rmdir("./qspiders");
        console.log("Folder renamed and deleted");
    } catch (err) {
        console.error("Error:", err);
    }
};

manageFiles();
manageFolders();
```

### E. Streams, Events & Buffers
* **Streams:** Allow you to read or write large amounts of data (videos, audio, large logs) **chunk-by-chunk** instead of loading the entire file into RAM at once.
  * `data`: Fires whenever a new chunk of data is available to read.
  * `error`: Fires if an error occurs while reading/writing.
  * `close`: Fires when the stream and its underlying resource have closed.
* **Types of Streams:**
  1. **Readable Stream:** Reads data from a source file (`createReadStream`).
  2. **Writable Stream:** Writes data to a destination file (`createWriteStream`).
  3. **Duplex Stream & Piping:** Reads and writes simultaneously. The `.pipe()` method connects a readable stream directly to a writable stream.
* **Buffer:** A built-in global class representing temporary memory outside the V8 heap used to store and manipulate **raw binary data (`0`s and `1`s)** during stream transfers.

```javascript
const fs = require('fs');

// 1. Readable Stream
let readStream = fs.createReadStream("./demo.txt", "utf-8");
readStream.on("data", (chunk) => console.log("Received chunk:", chunk));
readStream.on("error", (err) => console.error("Stream error:", err));
readStream.on("close", () => console.log("Stream closed"));

// 2. Writable Stream
let writeStream = fs.createWriteStream("./app.txt");
writeStream.write("I am writing to app.txt via a stream!");

// 3. Piping (Readable -> Writable)
fs.createReadStream("./demo.txt").pipe(fs.createWriteStream("./copy.txt"));
console.log("File transferred using pipe()");
```

### F. HTTP Module & Web Server (`http`)
* **HTTP (HyperText Transfer Protocol)** is a **stateless protocol**—the server does not remember previous requests and treats every incoming request as brand new.

```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/home') {
        fs.createReadStream('./home.html').pipe(res);
    } else if (req.url === '/about') {
        res.end("About Page");
    } else if (req.url === '/login') {
        res.end("Login Page");
    } else if (req.url === '/register') {
        res.end("Register Page");
    } else if (req.url === '/contact') {
        res.end("Contact Page");
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 - Page Not Found");
    }
});

server.listen(5000, (err) => {
    if (err) throw err;
    console.log("Server is running on port 5000");
});
```

---

## 🌐 5. HTTP Request Methods & Status Codes

### HTTP Request Methods (CRUD Mapping)

| HTTP Method | Action | Purpose |
| :--- | :--- | :--- |
| **`GET`** | Read | Fetch or retrieve data from the server. |
| **`POST`** | Create | Send new data to the server to create a resource. |
| **`PUT`** | Update | Update or replace existing data on the server. |
| **`DELETE`** | Delete | Remove existing data from the server. |

### HTTP Status Codes Reference

#### `1xx` — Informational Responses
| Code | Status | Description |
| :--- | :--- | :--- |
| **100** | Continue | Client should continue sending the request body. |
| **101** | Switching Protocols | Server is switching protocols (e.g., HTTP to WebSockets). |
| **102** | Processing | Server has received and is processing the request (prevents timeout). |
| **103** | Early Hints | Lets the browser start preloading assets (CSS/JS) while the server prepares a response. |
| **104** | Upload Resumption | Indicates support for resuming an interrupted upload. |
| **105** | Unassigned | Reserved for future use. |

#### `2xx` — Success Responses
| Code | Status | Description |
| :--- | :--- | :--- |
| **200** | OK | Request succeeded and the requested data was returned. |
| **201** | Created | Request succeeded and a new resource was created (common for `POST`). |
| **202** | Accepted | Request accepted for processing, though processing is not yet complete. |
| **204** | No Content | Request succeeded, but there is no content to send back (common for `DELETE`). |
| **206** | Partial Content | Server is delivering only part of the resource (used in video streaming/range requests). |

#### `3xx` — Redirection Responses
| Code | Status | Description |
| :--- | :--- | :--- |
| **300** | Multiple Choices | Multiple response options are available for the resource. |
| **301** | Moved Permanently | The requested resource has permanently moved to a new URL. |
| **302** | Found | Temporary redirect to another URL. |
| **304** | Not Modified | Cached version of the resource is still valid; no need to re-download. |
| **307** | Temporary Redirect | Temporary redirect that preserves the original HTTP method (e.g., `POST` stays `POST`). |

#### `4xx` — Client Errors
| Code | Status | Description |
| :--- | :--- | :--- |
| **400** | Bad Request | Server cannot process the request due to invalid syntax or malformed data. |
| **401** | Unauthorized | Authentication is required (user is not logged in or token is missing). |
| **402** | Payment Required | Reserved for future digital payment systems. |
| **403** | Forbidden | Client is authenticated, but does not have permission to access the resource. |
| **404** | Not Found | Requested URL or resource does not exist on the server. |
| **429** | Too Many Requests | User has sent too many requests in a given timeframe (rate limit exceeded). |

#### `5xx` — Server Errors
| Code | Status | Description |
| :--- | :--- | :--- |
| **500** | Internal Server Error | Generic unexpected crash or error on the server side. |
| **501** | Not Implemented | Server does not recognize or support the requested method/feature. |
| **502** | Bad Gateway | Server acting as a gateway received an invalid response from an upstream server. |
| **503** | Service Unavailable | Server is temporarily overloaded or down for maintenance. |
| **504** | Gateway Timeout | Upstream server failed to respond in time. |

---

## 🎯 6. Interview, Tricky Output & Practice Questions

### Part A: Top Node.js Interview Questions

**Q1. If Node.js is single-threaded, how does it handle thousands of concurrent requests without blocking?**
> **Answer:** Node.js uses a **Single-Threaded Event Loop** combined with the **libuv** C++ library. All lightweight synchronous JS executes on the single main thread. Whenever a slow I/O operation (file read, database query, network call) arrives, Node.js delegates it to the OS kernel or `libuv`'s worker thread pool (default 4 threads). While `libuv` processes it in the background, the main thread stays free to accept new requests. Once finished, the callback is queued and pushed back to the Call Stack by the Event Loop.

**Q2. What is the difference between `process.nextTick()` and `setImmediate()`?**
> **Answer:**
> * `process.nextTick()` executes **immediately after the current operation finishes**, *before* the Event Loop moves to the next phase (it has the highest async priority and can starve I/O if called recursively).
> * `setImmediate()` executes during the **Check Phase (Phase 5)** of the Event Loop, *after* the Poll (I/O) phase completes.

**Q3. Why should we prefer `fs.createReadStream()` over `fs.readFile()` for large files?**
> **Answer:** `fs.readFile()` reads the **entire file into RAM** before returning the data. If a 2 GB video file is requested by 10 users simultaneously, the server will crash with an *Out of Memory* error. `fs.createReadStream()` reads and sends the file in small **chunks** (default 64 KB) using Buffers, keeping memory usage minimal and constant.

**Q4. What is the difference between `path.join()` and `path.resolve()`?**
> **Answer:**
> * `path.join('/a', '/b', 'c')` simply concatenates path segments using the OS-specific separator (`\a\b\c`).
> * `path.resolve('/a', '/b', 'c')` resolves segments from right-to-left into an **absolute path**. Whenever it encounters a leading `/`, it treats it as the root directory and ignores everything to its left (e.g., `path.resolve('/a', '/b', 'c')` outputs `/b/c`, whereas `path.resolve('a', 'b')` prepends `__dirname` / current working directory).

**Q5. What is the difference between `exports` and `module.exports` in CommonJS?**
> **Answer:** Initially, `exports` is just a reference/alias pointing to `module.exports`. You can attach properties like `exports.add = ...`. However, if you reassign `exports = { add }`, you break the reference link, and Node.js will still export whatever is attached to `module.exports`. Always use `module.exports` when exporting a single function or replacing the entire export object.

**Q6. What is the difference between HTTP `401 Unauthorized` and `403 Forbidden`?**
> **Answer:**
> * **401 Unauthorized:** The server doesn't know *who* you are (missing, invalid, or expired login token/credentials).
> * **403 Forbidden:** The server knows *who* you are (authenticated), but your role/account lacks permission to access that specific resource (e.g., a regular user trying to access `/admin`).

---

### Part B: Tricky Event Loop & Async Output Questions

#### Tricky Puzzle 1: `setTimeout(0)` vs `setImmediate()` inside an I/O Callback
```javascript
const fs = require('fs');

fs.readFile(__filename, () => {
    setTimeout(() => console.log("1. setTimeout"), 0);
    setImmediate(() => console.log("2. setImmediate"));
});
```
> **Output:**
> ```text
> 2. setImmediate
> 1. setTimeout
> ```
> **Explanation:** Outside an I/O cycle, the order between `setTimeout(0)` and `setImmediate()` is non-deterministic. However, **inside an I/O callback** (which runs in Phase 4: **Poll**), the Event Loop always moves immediately to Phase 5 (**Check**) next, before looping back to Phase 1 (**Timers**). Therefore, `setImmediate()` *always* runs before `setTimeout(0)` inside I/O callbacks.

---

#### Tricky Puzzle 2: `process.nextTick` Starvation & Nested Microtasks
```javascript
Promise.resolve().then(() => console.log("Promise 1"));
process.nextTick(() => {
    console.log("nextTick 1");
    process.nextTick(() => console.log("nextTick 2"));
});
Promise.resolve().then(() => console.log("Promise 2"));
```
> **Output:**
> ```text
> nextTick 1
> nextTick 2
> Promise 1
> Promise 2
> ```
> **Explanation:** Node.js completely drains the `nextTick` queue (including any newly added `nextTick` callbacks) *before* processing a single item from the Promise microtask queue.

---

#### Tricky Puzzle 3: `module.exports` vs `exports` Reassignment Trap
```javascript
// helper.js
exports.sayHi = () => console.log("Hi");
exports = {
    sayHello: () => console.log("Hello")
};

// index.js
const helper = require('./helper');
console.log(helper);
```
> **Output:** `{ sayHi: [Function] }`
> **Explanation:** `exports.sayHi` mutated the original `module.exports` object. Reassigning `exports = { ... }` only pointed the local `exports` variable to a new object, leaving `module.exports` unchanged with only `sayHi`.

---

#### Tricky Puzzle 4: Synchronous `throw` inside `async` / `Promise` vs `setTimeout`
```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timer");
}, 0);

new Promise((resolve) => {
    console.log("Inside Promise Executor");
    resolve();
}).then(() => {
    console.log("Promise Then");
});

console.log("End");
```
> **Output:**
> ```text
> Start
> Inside Promise Executor
> End
> Promise Then
> Timer
> ```
> **Explanation:** The executor function passed to `new Promise(...)` runs **synchronously**! Only the `.then()` callback is asynchronous (Microtask), which runs after `"End"` and before `"Timer"`.

---

### Part C: Hands-On Practice Problems

Try building these mini-tasks using only Node.js built-in modules (`fs`, `http`, `path`, `url`, `os`):

1. **System Health Logger (`os` + `fs`):**
   * Create a script `healthLogger.js` that checks free RAM (in GB) and CPU count every 5 seconds using `setInterval`, and appends a timestamped log line into `system_logs.txt` using `fs.appendFile()`.
2. **Custom File Backup Utility (`fs` Streams + `path`):**
   * Write a function `backupFile(filePath)` that takes any file path, extracts its base name and extension using `path.parse()`, and streams a backup copy named `<filename>_backup.<ext>` using `createReadStream().pipe(createWriteStream())`.
3. **JSON API Server with Query Filtering (`http` + `url`):**
   * Create an HTTP server on port `4000` with a route `/products?category=electronics`. Parse the query parameter using `new URL()` and return filtered JSON data with proper `200` and `404` status codes (`res.writeHead(200, { 'Content-Type': 'application/json' })`).
4. **Recursive Directory Scanner (`fs.promises` + `path`):**
   * Write an `async/await` function that reads all files inside a folder, filters only `.js` files using `path.extname()`, and prints each file's name and character count.