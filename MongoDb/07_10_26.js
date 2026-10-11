//? read
//? to see all dbs:
// show dbs

//? to see collections
// show collections

//? to see data
// 1. findOne()
        // returns 1 document 
        // db.collectioName.findOne({condition})
        // without condition it returns first doc/data of collection.
        // with condition it returns first matching doc/data of collection.
        // on empty collection it returns null.

    // example: 
            // db.emp.findOne({})
            // db.emp.findOne({name: "John"})
// 2. find()
        // retunr multiple document 
        // db.collectioName.find({condition})
        // without condition it returns first 20 doc/data of collection. (if you want next 20 docs so you erite 'it' command in terminal)
        // with condition it returns all matching doc/data of collection.(but at a time it will return first 20 matching docs/data of collection. (if you want next 20 matching docs so you erite 'it' command in terminal)
        // on empty collection it returns "blank space".

    // example: 
            // db.emp.find({})
            // db.emp.find({name: "John"})


//? update
// database name cannot be updated but collection name and data can be updated.

//? to update collection name
// db.collectionName.renameCollection("newCollectionName")
// db.emp.renameCollection("employee")

//? to update data in collection
// 1. updateOne()
    // updateOne() method updates a single document that matches the specified filter. If multiple documents match the filter, only the first matching document will be updated. If no documents match the filter, no changes will be made.
    // db.collection.updateOne({filter}, {$set: {field: newValue}})
// 2. updateMany()
    // updateMany() method updates all documents that match the specified filter. If no documents match the filter, no changes will be made.
    // db.collection.updateMany({filter}, {$set: {field: newValue}})

//? delete
//? to delete database
// db.dropDatabase()  // it will delete the database and all the collections in it. It will return true if the database is deleted successfully, otherwise it will return false.

//? to delete collection
// db.collection.drop()  // it will delete the collection and all the documents in it. It will return true if the collection is deleted successfully, otherwise it will return false.

//? to delete data in collection
// 1. deleteOne()
    // deleteOne() method deletes a single document that matches the specified filter. If multiple documents match the filter, only the first matching document will be deleted. If no documents match the filter, no changes will be made. 
    // db.collection.deleteOne({filter}) // first matching document will be deleted. If no documents match the filter, no changes will be made.
     // db.collection.deleteOne({})  // it will delete the first document of the collection. If the collection is empty, no changes will be made.
// 2. deleteMany() 
    // deleteMany() method deletes all documents that match the specified filter. If no documents match the filter, no changes will be made.
    // db.collection.deleteMany({filter}) // all matching documents will be deleted. If no documents match the filter, no changes will be made.
    // db.collection.deleteMany({}) // it will delete all documents of the collection. If the collection is empty, no changes will be made. (all docs not only 20 at a time)


 





