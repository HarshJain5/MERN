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
    // db.collection.updateOne({condition}, {$set: {field: newValue}})
// 2. updateMany()
    // updateMany() method updates all documents that match the specified filter. 
    // If no documents match the filter, no changes will be made.
    // it will change the value in dbs
    // syntax: db.collection.updateMany({filter}, {updation})
    //1. $inc
    // db.emp.updateOne({ename:'smith'},{$inc:{sal: 1000}})
    // db.emp.updateOne({ename:'smith'},{$inc:{sal: -800}})

    //2. $max 
    // same as increment but it will only work when the specified value is greater than actual value. 
    //// db.emp.updateOne({ename:'smith'},{$max:{sal: 1000}})
    // db.emp.updateOne({ename:'smith'},{$max:{sal: 800}}) does not update anything because it is lesss than actual value

    //3. $min 
    // same as increment but it will only work when the specified value is less than actual value. 
    //// db.emp.updateOne({ename:'smith'},{$max:{sal: 500}})
    // db.emp.updateOne({ename:'smith'},{$max:{sal: 1000}}) does not update anything because it is greater than actual value

    //4. $mul:
    // when we have to perform mathematical operations or double the salary. only performed on numeric value
    // db.emp.updateOne({ename:'smith'},{$mul:{sal: 2}})   it will double the salary

    //these all 4 are used only on number datatype

    //5. $set
    // it will work on every datatype
    // db.emp.updateOne({ename:'smith'},{$set:{sal: 800}})
    // db.emp.updateOne({ename:'smith'},{$set:{ename: 'steve'}})
    // db.emp.updateOne({ename:'smith'},{$set:{ename: 'steve',sal: 800}})

    //?To modify the key name
    //6. $rename
    // rename is used to modify the keyname
    //db.emp.updateOne({ename:'smith'},{$rename:{ename: 'emp_name',sal:'salary'}})

    //7. $unset 
    // unset is mainly use to delete particular key/fields or values
    // db.emp.updateOne({age:23},{$unset:{name:"" }})
    // db.emp.updateOne({age:23},{$unset:{age:"" }})

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


 





