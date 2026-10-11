//? Database
// A Database is a collection of data that is organized in a way that allows for easy access, management, and updating. Databases are used in various applications, from simple data storage to complex data analysis and reporting. They can be relational, non-relational, or hybrid, depending on the structure and requirements of the data being stored.

//? Collection
// A Collection is a grouping of MongoDB documents. It is the equivalent of a table in relational databases. Collections do not enforce a schema, meaning that documents within a collection can have different fields and structures. Collections are used to organize and store related data within a database.

//? Capped Collection
// A Capped Collection is a fixed-size collection that maintains the insertion order of documents. When the allocated space is filled, the oldest documents are automatically overwritten by new ones. Capped collections are useful for scenarios where you want to maintain a rolling log of data, such as logging events or storing temporary data. They provide high-performance insert and retrieval operations due to their fixed size and structure.

//? Document
// A Document is a single record in a MongoDB collection. It is represented in BSON (Binary JSON) format, which allows for the storage of complex data types, including arrays and nested documents. Each document has a unique identifier (_id) and can contain various fields with different data types. Documents are the primary unit of data storage in MongoDB and can be easily queried, updated, and deleted.
// it is a key value pair and also key value pair can be called as fields
// the notation of document is {key: value, key: value, key: value}  // key is field name and value is field value.
// max size of document is 16MB. if you want to store more than 16MB data then you can use GridFS. it is a specification for storing and retrieving files that exceed the BSON-document size limit of 16MB. GridFS divides a file into chunks and stores each chunk as a separate document, allowing for efficient storage and retrieval of large files.
// exists inside collection and collection exists inside database. so document is a part of collection and collection is a part of database.


//? objectId
// generated automatically by mongodb during document creation
// it is in the form of String and it is unique for each document. it is a 12-byte value (each byte contains 2 char) consisting of a 4-byte timestamp, a 5-byte random value, and a 3-byte incrementing counter. it is used as the default value for the _id field in MongoDB documents, which serves as the primary key for the document. it can be used to uniquely identify documents within a collection and can also be used to sort documents based on their creation time.
// it is 12 byte hexadecimal string and it is unique for each document. it is generated automatically by mongodb during document creation. it is used as the default value for the _id field in MongoDB documents, which serves as the primary key for the document. it can be used to uniquely identify documents within a collection and can also be used to sort documents based on their creation time.
// it acts like a primary key of collection.
// we can overwride objectId but it is highly not recommended.


//? Operators
// operators are special symbols or keywords that perform specific operations on data in a database. 
// they are used to filter, sort, update, and manipulate data in various ways.

    // Types of Operators
    // 1. Query Operators
        // Query operators are used to filter documents based on specific conditions. 
        // They allow you to specify criteria for matching documents in a collection. 
        // Some common query operators include:
        // $eq: Matches values that are equal to a specified value.(=)
        // $ne: Matches values that are not equal to a specified value.(!=)
        // $gt: Matches values that are greater than a specified value.(>)
        // $lt: Matches values that are less than a specified value.(<) 
        // $gte: Matches values that are greater than or equal to a specified value.(>=)
        // $lte: Matches values that are less than or equal to a specified value.(<=)
        // $in: Matches any of the values specified in an array.(IN)
        // $nin: Matches none of the values specified in an array.(NOT IN)

        //Syntax:
        // db.collection.find({field: {$operator: value}})
        // example:
            // db.emp.find({age: {$gt: 30}})  // it will return all documents where age is greater than 30.
            // db.emp.find({age: {$in: [25, 30, 35]}})  // it will return all documents where age is either 25, 30 or 35.

        // Queries
        //1. display employee details of where ename is equals to allen
        // db.emp.find({ename: {$eq: "allen"}})  // it will return all documents where ename is equals to allen.
        // db.emp.find({ename: "allen"}) // it is shortcut for equal only.

        //2. display employee details where employee is earning less than 3000
        // db.emp.find({sal: {$lt: 3000}})  // it will return all documents where sal is less than 3000.

        //3. display employee details except king
        // db.emp.find({ename: {$ne: "king"}})  // it will return all documents where ename is not equals to king.

        //4. display employee details where employee is earning sal 3000 and 800
        // db.emp.find({sal: {$in: [3000, 800]}})  // it will return all documents where sal is either 3000 or 800.

        //Note: query operators work in single field or condition only. if you want to work in multiple fields then you can use logical operators.

        // ?Assignment queries
        // 1. Diplay employee details where employee is earning more than 2500
        // db.emp.find({sal: {$gt: 2500}})

        // 2. Display employee details where employee is earning less than 1250
        // db.emp.find({sal: {$lt: 1250}})

        // 3. Dispay employee details where employee is earning more than or equal to 3000
        // db.emp.find({sal: {$gte: 3000}})

        // 4. Display employee details where employee is earning less than or equal to 1500
        // db.emp.find({sal: {$lte: 1500}})

        // 5. Display employee details where employee is a manager
        // db.emp.find({job:{$eq: "MANAGER"}})

        // 6. Display employee details where employee is not a salesman
        // db.emp.find({job: {$ne: "SALESMAN"}})

        // 7. Display employee details where department number is 10, 20, 30
        // db.emp.find({deptno:{$in: [10, 20, 30]}})

        // 8. Display employee details where department number is not 10, 30
        // db.emp.find({deptno: {$nin: [10, 30]}})

        // 9. Display Employee details whose job is either "CLERK" or "ANALYST"
        // db.emp.find({job:{$in: ["CLERK", "ANALYST"]}})

        // 10. Display employee details where employee is earning more than 2000 and department number is 20
        // db.emp.find({sal:{$gt:2000}, deptno:{$eq: 20}})  //internally it applies AND operator. it will return all documents where sal is greater than 2000 and deptno is equals to 20.

        // 11. Display employee details where employee is earning less than equals 5000 and more than equals 3000
        // db.emp.find({sal:{$lte:5000, $gte: 3000}})

        //12. Display employee details where employee is earning between 3000 and 5000 (inclusive)
        // db.emp.find({sal:{$gt:2999, $lt: 5001}})

    //2. Logical Operators
        // Logical operators are used to combine multiple query conditions and return documents that match the specified criteria. 
        // They allow you to create more complex queries by combining multiple conditions using logical operators. 
        // Some common logical operators include:
        // $and: Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.(AND)
        // $or: Joins query clauses with a logical OR returns all documents that match the conditions of either clause.(OR)
        // $not: Inverts the effect of a query expression and returns documents that do not match the specified condition.(NOT) 
        // (instead of this we can use $ne operator), not will not accept array of conditions. it will accept only one condition.
        // thats why we can use $ne operator instead of $not operator.
        // $nor: Joins query clauses with a logical NOR returns all documents that fail to match both clauses.(NOR)

        //? Syntax:
        // db.collection.find({$operator: [{condition1}, {condition2}, ...]})
        // example:
            // db.emp.find({$and: [{sal: {$gt: 3000}}, {deptno: {$eq: 20}}]})  // it will return all documents where sal is greater than 3000 and deptno is equals to 20.
            // db.emp.find({$or: [{sal: {$lt: 2000}}, {deptno: {$eq: 30}}]})  // it will return all documents where sal is less than 2000 or deptno is equals to 30.
            // db.emp.find({$not: {sal: {$gt: 3000}}})  // it will return all documents where sal is not greater than 3000.
            // db.emp.find({$nor: [{sal: {$gt: 3000}}, {deptno: {$eq: 20}}]})  // it will return all documents where sal is not greater than 3000 and


        //? Example Queries
        // 1. Display employee details where employee is earning more than 2000 and department number is 20
        // db.emp.find({$and: [{sal: {$gt: 2000}}, {deptno: {$eq: 20}}]})
        // db.emp.find({$and: [{sal: {$gt: 2000}}, {deptno: 20}]})

        // 2. Display employee details where employee is earning more than 2000 or department number is 20
        // db.emp.find({$or: [{sal: {$gt: 2000}}, {deptno: {$eq: 20}}]})
        // db.emp.find({$or: [{sal: {$gt: 2000}}, {deptno: 20}]})

        // 3. Display employee details except where employee is earning more than 2000 or department number is 20
        // db.emp.find({$nor: [{sal: {$gt: 2000}}, {deptno: {$eq: 20}}]})
        // db.emp.find({$nor: [{sal: {$gt: 2000}}, {deptno: 20}]})

        // 4. Display employee who is earning not less than 2000 
        // db.emp.find({$not: {sal: {$lt: 2000}}})  // it will return all documents where sal is not less than 2000.
        // db.emp.find({sal: {$gte: 2000}})  // it will return all documents where sal is greater than or equal to 2000. (shortcut for not less than)


//         8 oct assignment mongodb

// 1) emp> db.emp.find({sal:{$gt:2000},deptno:{$in:[10,20]}})
// 2)  db.emp.find({sal:{$lt:2000},job:{$in:['clerk','salesman']}})
// 3)  db.emp.find({deptno:{$eq:20},sal:{$ne:3000}})
// 4)db.emp.find({
//   $and: [
//     { sal: { $gte: 2000 } },
//     { sal: { $lte: 3000 } }
//   ]
// })
// 5) db.emp.find({$and:[{deptno:{$in:[10,20,30]}},{job:{$ne:'manager'}}]})
// 6) db.emp.find({$and:[{sal:{$gt:1500}},{dept:{$eq:10}}]})
// 7) db.emp.find({})






