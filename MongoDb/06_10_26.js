//? Some Basic Commands of MongoDB
// MongoDB is case sensitive, so be careful while writing commands.

//1. Create Db
// use dbName
// use Flipkart


//2. Create Collection
// explicitly create collection using createCollection() method
// db.createCollection("collectionName")
// db.createCollection("Mobile")

//3. Insert Data or Documents

    //a. Insert One Documents
    // db.collection.insertOne({key:value})
    // db.Mobile.insertOne({name: "Iphone 18 Pro", price: 180000, color: "Purple"})

    //b. Insert Many or Multiple Documents
    // db.collection.insertMany([{key:value}, {key:value}])
    // db.Mobile.insertMany([
    //     {name: "Iphone 17 Pro", price: 150000, color: "Silver"}, 
    //     {name: "Samsung Galaxy S23", price: 150000, color: "Black"}
    // ])

//? without using createCollection() method, we can also create collection while inserting data. If the collection does not exist, it will be created automatically when we insert the first document.  
// implicitly create collection while inserting data
// db.collection.insertOne({key:value}) 
// db.laptop.insertOne({name: "Dell XPS 13", price: 120000, color: "Silver"})


//?restrict how many documents we want to insert in a single collection.
//? capped collection is a fixed-size collection that automatically overwrites the oldest documents when it reaches its maximum size. It is useful for scenarios where you want to maintain a limited number of documents, such as logging or caching.
// db.createCollection("collectionName", { capped: true, size: 10000, max: 3 })    //size is in bytes so 10000 bytes = 10 kb
// db.createCollection("logs", { capped: true, size: 10000, max: 3 })

//if you try to insert more than 3 documents, it will overwrite the oldest document automatically or delete the first document and insert the new document.
// it follows FIFO (First In First Out) method.

//? Query to check the size of the collection
// db.collection.stats()  // it will give the size of the collection in bytes   
// db.logs.stats()  // it will give the size of the collection in bytes
//? Query to check the size of the collection in kb
// db.collection.stats().size / 1024  // it will give the size of the collection in kb
// db.logs.stats().size / 1024  // it will give the size of the collection in kb    

//? query for limiting the number of documents to be inserted in a collection
// db.collection.insertMany([{key:value}, {key:value}, {key:value}, {key:value}])  // it will insert all the documents if the collection is not capped
// db.logs.insertMany([{message: "Log 1"}, {message: "Log 2"}, {message: "Log 3"}, {message: "Log 4"}])  // it will insert all the documents if the collection is not capped    

//? trying to insert document with more than the size 10000 bytes
// db.logs.insertOne({message: "This is a very long log message that exceeds the maximum size of the capped collection. It will not be inserted because it exceeds the size limit of 10000 bytes."})  // it will not insert the document because it exceeds the size limit of 10000 bytes


//? Assignment
//db->vegacity
// collections 
// 1. max          ->2 docs
// 2. lifestyle     ->3docs
// 3. burgerking    ->1 docs
//4. kfc            ->4 docs
//5. pvr            ->5 docs
//6. puma           ->2docs

//?Query's for Assignment
// 1. use vegacity
//     1. db.createCollection("max")
        // db.max.insertMany([
        //     {name: "Shirt", price: 500, color: "grey", size: "M"}, 
        //     {name: "Jeans", price: 800, color: "blue", size: 32}
        // ])


//     2. db.createCollection("lifestyle")
        // db.lifestyle.insertMany([
        //     {name: "T-shirt", price: 400, color: "white", size: "L"}, 
        //     {name: "Shorts", price: 600, color: "black", size: "M"}, 
        //     {name: "Jacket", price: 1200, color: "brown", size: "XL"}
        // ])

    // 3. db.createCollection("burgerking")
    //     db.burgerking.insertOne({name: "Biryani", price: 250})

    // 4. db.createCollection("kfc")
    //     db.kfc.insertMany([
    //         {name: "Veg Burger", price: 150}, 
    //         {name: "French Fries", price: 100}, 
    //         {name: "Veg Wings", price: 200}, 
    //         {name: "Coleslaw", price: 80}
    //     ])

    // 5. db.createCollection("pvr")
    //     db.pvr.insertMany([
    //         {name: "Dhurandhar", price: 200}, 
    //         {name: "Drishyam 3", price: 250}, 
    //         {name: "Padmavati", price: 150}, 
    //         {name: "KGF", price: 100}, 
    //         {name: "War", price: 120}
    //     ])

    // 6. db.createCollection("puma")
    //     db.puma.insertMany([
    //         {name: "Shoes", price: 3000, color: "black", size: 9}, 
    //         {name: "Track Pants", price: 1500, color: "grey", size: "M"}
    //     ])

