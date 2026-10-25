# MongoDB Complete Learning Notes

## Table of Contents

- [1. MongoDB Fundamentals](#1-mongodb-fundamentals)
- [2. Database, Collections, Documents, and ObjectId](#2-database-collections-documents-and-objectid)
- [3. Basic Shell Commands](#3-basic-shell-commands)
- [4. Insert Operations](#4-insert-operations)
- [5. Read Operations, Cursors, Sorting, and Pagination](#5-read-operations-cursors-sorting-and-pagination)
- [6. Projection](#6-projection)
- [7. Query Operators](#7-query-operators)
- [8. Logical Operators](#8-logical-operators)
- [9. Element Operators](#9-element-operators)
- [10. Evaluation Operators and Regular Expressions](#10-evaluation-operators-and-regular-expressions)
- [11. Update Operations](#11-update-operations)
- [12. Update Operators](#12-update-operators)
- [13. Delete Operations](#13-delete-operations)
- [14. Date Queries and Date Expressions](#14-date-queries-and-date-expressions)
- [15. Aggregation Framework](#15-aggregation-framework)
- [16. Aggregation Stages](#16-aggregation-stages)
- [17. Aggregation Accumulators](#17-aggregation-accumulators)
- [18. `$lookup`: Joining Collections](#18-lookup-joining-collections)
- [19. Self Join](#19-self-join)
- [20. `$lookup` with a Pipeline and Variables](#20-lookup-with-a-pipeline-and-variables)
- [21. SQL Concepts Compared with MongoDB](#21-sql-concepts-compared-with-mongodb)
- [22. Practice Questions from the Learning Files](#22-practice-questions-from-the-learning-files)
- [23. Common Errors and Their Fixes](#23-common-errors-and-their-fixes)
- [24. Interview Quick Revision](#24-interview-quick-revision)

---

## 1. MongoDB Fundamentals

### What is MongoDB?

**MongoDB is a document-oriented NoSQL database**. It stores information as documents that look similar to JSON objects. Internally, MongoDB stores documents in a binary format called **BSON**.

Example document:

```javascript
{
  ename: "SCOTT",
  job: "ANALYST",
  sal: 3000,
  deptno: 20
}
```

### What is a database?

A **database** is an organized container used to store and manage related data. In MongoDB, a database contains collections.

### What is a collection?

A **collection** is a group of related documents. It is similar to a table in a relational database, but documents in one collection do not always need to contain exactly the same fields.

Example: `emp` can contain employee documents and `dept` can contain department documents.

### What is a document?

A **document** is one record in MongoDB. It contains field-value pairs and is similar to a row in a SQL table.

### What is a field?

A **field** is a named piece of information inside a document. In `{ ename: "SCOTT" }`, `ename` is the field and `"SCOTT"` is its value.

### What is BSON?

**BSON (Binary JSON)** is the binary representation MongoDB uses to store documents. It supports JSON-like values and additional data types, including dates and ObjectIds.

### SQL vs NoSQL

**SQL** is a language used to query relational databases. The term **SQL database** commonly refers to a database that stores data in related tables. **NoSQL** is a broad category of database systems that use data models beyond the traditional relational-table model. MongoDB is a document-based NoSQL database.

| Basis | Relational / SQL database | MongoDB |
|---|---|---|
| Main structure | Tables | Collections |
| Record | Row | Document |
| Attribute | Column | Field |
| Typical query style | SQL statements such as `SELECT` and `UPDATE` | Methods such as `find()`, `updateOne()`, and `aggregate()` |
| Structure | Usually defined through table columns and types | Flexible document structure; validation can still enforce rules |
| Relationships | Often use primary keys, foreign keys, and joins | Often use embedded documents or references; `$lookup` can join collections |
| Transactions | Many relational systems support ACID transactions | MongoDB supports atomic single-document operations and multi-document transactions |
| Examples | MySQL, Oracle Database, PostgreSQL, SQL Server | MongoDB |

**Important interview point:** NoSQL does not mean “no structure” or “no relationships.” MongoDB documents have structure, and MongoDB supports references, `$lookup`, indexes, and transactions. Neither SQL nor NoSQL is always better; the choice depends on the application's requirements.

### Vertical scaling vs horizontal scaling

- **Vertical scaling (scale up):** Increase the resources of one machine, such as CPU, RAM, or storage.
- **Horizontal scaling (scale out):** Add more machines and distribute the workload or data across them.

### ACID properties

ACID describes properties that make database transactions reliable.

| Property | Simple definition |
|---|---|
| **Atomicity** | A transaction completes fully or does not complete at all. |
| **Consistency** | A transaction keeps the data within valid rules. |
| **Isolation** | Concurrent transactions are controlled so they do not interfere incorrectly. |
| **Durability** | Once a transaction is committed, its changes are persisted. |

---

## 2. Database, Collections, Documents, and ObjectId

### Select or create a database

```javascript
use companyDB
```

This switches to `companyDB`. MongoDB generally creates the database physically when data is first stored in it.

### Show the current database

```javascript
db
```

### List databases

```javascript
show dbs
```

### List collections in the current database

```javascript
show collections
```

### Create a collection

```javascript
db.createCollection("employees")
```

MongoDB can also create a collection automatically when data is inserted into a collection that does not yet exist.

### Drop a collection

```javascript
db.employees.drop()
```

This removes the collection and its documents. Be careful: this is destructive.

### Drop the current database

```javascript
db.dropDatabase()
```

This removes the current database. Confirm the selected database before running it.

### What is `_id`?

`_id` is the unique identifier field for a document. MongoDB automatically creates it if you do not provide one.

```javascript
{ _id: ObjectId("..."), ename: "SCOTT" }
```

- `_id` must be unique within a collection.
- It acts similarly to a primary key.
- Its value cannot be changed using an update operation.
- `ObjectId` is a common automatically generated value for `_id`; it is typically 12 bytes.
- ObjectIds often contain a timestamp component, but do not treat them as a guaranteed precise business timestamp or as a substitute for a dedicated date field.

You can supply your own `_id` when inserting a document, but do not reuse an `_id` already present in the collection.

---

## 3. Basic Shell Commands

| Command | Meaning |
|---|---|
| `show dbs` | Display databases |
| `use companyDB` | Switch to a database |
| `db` | Show current database |
| `show collections` | Display collections in the current database |
| `db.emp.find()` | Display documents from `emp` |
| `db.emp.countDocuments({})` | Count all documents in `emp` |
| `db.emp.distinct("job")` | Return unique values of `job` |
| `db.emp.drop()` | Drop the `emp` collection |

**Naming reminder:** MongoDB names are case-sensitive in many contexts. `emp`, `Emp`, and `EMP` may refer to different collection names. String values such as `"SCOTT"` and `"scott"` are also different unless a case-insensitive collation or query pattern is used.

---

## 4. Insert Operations

### `insertOne()`

**Definition:** Inserts one document into a collection.

```javascript
db.emp.insertOne({
  empno: 101,
  ename: "AMIT",
  job: "CLERK",
  sal: 1200,
  deptno: 10
})
```

### `insertMany()`

**Definition:** Inserts multiple documents in one operation.

```javascript
db.employees.insertMany([
  { id: 1, name: "Rahul", dept: "IT", salary: 50000, age: 25 },
  { id: 2, name: "Sneha", dept: "HR", salary: 35000, age: 28 },
  { id: 3, name: "Amit", dept: "IT", salary: 60000, age: 30 }
])
```

If `_id` is not provided, MongoDB generates it for each inserted document.

---

## 5. Read Operations, Cursors, Sorting, and Pagination

### `find()`

**Definition:** Finds all documents that match a filter. If the filter is empty, it matches all documents.

```javascript
db.emp.find()                       // All documents
db.emp.find({ deptno: 20 })         // Employees in department 20
db.emp.find({ sal: { $gt: 2000 } }) // Salary greater than 2000
```

The basic form is:

```javascript
db.collection.find(filter, projection)
```

- `filter` decides which documents match.
- `projection` decides which fields are returned.

### `findOne()`

**Definition:** Returns one matching document, or `null` if no document matches.

```javascript
db.emp.findOne({ ename: "SCOTT" })
```

`findOne()` is useful when you need one matching document, but it does **not** automatically mean “highest salary” or “first by salary.” Without an explicit sort, do not assume which matching document will be returned.

To get the highest-paid employee, use:

```javascript
db.emp.find().sort({ sal: -1 }).limit(1)
```

A `findOne()` options form can also specify sorting in supported MongoDB shell versions:

```javascript
db.emp.findOne({}, { sort: { sal: -1 } })
```

If a shell/version or command form does not behave as expected, use the more widely understood `find().sort().limit(1)` pattern and check the returned document fields.

### What is a cursor?

A **cursor** is an object that lets MongoDB return and iterate through query results. `find()` returns a cursor, not just one document. The shell displays a portion of the results and may fetch more as needed.

### `sort()`

**Definition:** Arranges query results according to one or more fields.

```javascript
db.emp.find().sort({ sal: 1 })  // Ascending: low to high
db.emp.find().sort({ sal: -1 }) // Descending: high to low
```

For multiple fields, MongoDB applies sort keys in the order specified:

```javascript
db.employees.find().sort({ salary: -1, age: 1 })
```

This sorts salary from highest to lowest, then age from lowest to highest for equal salaries.

### `limit()`

**Definition:** Restricts the maximum number of documents returned.

```javascript
db.emp.find().sort({ sal: -1 }).limit(1)
```

`limit(1)` returns only one document from the sorted result.

### `skip()`

**Definition:** Skips a number of documents before returning results.

```javascript
db.employees.find().sort({ salary: -1 }).skip(1).limit(1)
```

This returns the second document in the sorted result. If two employees have the same salary, this means the second document, not necessarily the second distinct salary.

**Second-highest distinct salary** requires a different approach, such as grouping salaries or using `distinct()` and sorting the values.

### `countDocuments()`

```javascript
db.emp.countDocuments({})                 // Count all documents
db.emp.countDocuments({ deptno: 20 })     // Count matching documents
```

### `distinct()`

**Definition:** Returns unique values for a field.

```javascript
db.emp.distinct("job")
db.employees.distinct("dept")
```

---

## 6. Projection

**Projection** selects which fields are returned by a query. By default, MongoDB returns all fields, including `_id`.

### Include specific fields

```javascript
db.emp.find({}, { ename: 1, sal: 1 })
```

This returns `ename`, `sal`, and `_id` by default.

### Exclude `_id`

```javascript
db.emp.find({}, { ename: 1, sal: 1, _id: 0 })
```

### Exclude a field

```javascript
db.emp.find({}, { comm: 0 })
```

In a normal projection, you generally cannot mix inclusion and exclusion fields, except that `_id` can be excluded while other fields are included.

### Filter vs projection

```javascript
db.emp.find(
  { deptno: 20 },                 // Filter: which documents match
  { ename: 1, sal: 1, _id: 0 }   // Projection: which fields to display
)
```

A condition belongs in the first object. Projection belongs in the second object.

---

## 7. Query Operators

**Query operators** filter documents based on field values. They are written with a `$` prefix.

| Operator | Meaning | Example |
|---|---|---|
| `$eq` | Equal to | `{ sal: { $eq: 3000 } }` |
| `$ne` | Not equal to | `{ job: { $ne: "CLERK" } }` |
| `$gt` | Greater than | `{ sal: { $gt: 2000 } }` |
| `$gte` | Greater than or equal to | `{ sal: { $gte: 2000 } }` |
| `$lt` | Less than | `{ sal: { $lt: 2000 } }` |
| `$lte` | Less than or equal to | `{ sal: { $lte: 2000 } }` |
| `$in` | Matches any value in a list | `{ deptno: { $in: [10, 20] } }` |
| `$nin` | Matches none of the listed values | `{ deptno: { $nin: [10, 20] } }` |

### `$eq` and its shortcut

```javascript
db.emp.find({ ename: { $eq: "ALLEN" } })
db.emp.find({ ename: "ALLEN" }) // Shorter equality form
```

### Salary examples

```javascript
db.emp.find({ sal: { $gt: 2500 } })
db.emp.find({ sal: { $lt: 1250 } })
db.emp.find({ sal: { $gte: 3000 } })
db.emp.find({ sal: { $lte: 1500 } })
```

### Range: both boundaries included

```javascript
db.emp.find({ sal: { $gte: 1000, $lte: 3000 } })
```

This means salary is at least 1000 and at most 3000.

### Range: boundaries excluded

```javascript
db.emp.find({ sal: { $gt: 1000, $lt: 3000 } })
```

This means salary is greater than 1000 and less than 3000.

**Important:** Conditions on the same field are combined with AND. Therefore, `{ sal: { $lt: 1000, $gt: 3000 } }` cannot match a normal numeric salary because it asks for a value below 1000 and above 3000 at the same time.

### `$in` and `$nin`

```javascript
db.emp.find({ deptno: { $in: [10, 20, 30] } })
db.emp.find({ job: { $in: ["CLERK", "ANALYST"] } })
db.emp.find({ deptno: { $nin: [10, 20] } })
```

`$in` means the field matches at least one listed value. `$nin` matches values not in the list and may also match documents where the field is missing, so consider field existence if that matters.

---

## 8. Logical Operators

Logical operators combine or reverse query conditions.

| Operator | Definition |
|---|---|
| `$and` | Every condition must match |
| `$or` | At least one condition must match |
| `$nor` | None of the listed conditions may match |
| `$not` | Reverses one field-level query condition |

### `$and`

```javascript
db.emp.find({
  $and: [
    { sal: { $gt: 2000 } },
    { deptno: 20 }
  ]
})
```

Both conditions must be true.

MongoDB usually combines different field conditions with an implicit AND, so this is also valid:

```javascript
db.emp.find({ sal: { $gt: 2000 }, deptno: 20 })
```

Use explicit `$and` when it makes the query clearer or when conditions on the same field need to be expressed separately.

### `$or`

```javascript
db.emp.find({
  $or: [
    { sal: { $gt: 3000 } },
    { deptno: 20 }
  ]
})
```

A document matches if salary is greater than 3000 **or** department number is 20.

### `$nor`

```javascript
db.emp.find({
  $nor: [
    { sal: { $gt: 3000 } },
    { deptno: 20 }
  ]
})
```

This matches documents that do not match either listed condition.

### `$not`

`$not` is a **field-level operator**. Put it inside a field's condition:

```javascript
db.emp.find({ sal: { $not: { $lt: 2000 } } })
```

Do **not** write this as a top-level query:

```javascript
// Incorrect
db.emp.find({ $not: { sal: { $lt: 2000 } } })
```

For the simple meaning “salary is not less than 2000,” use the clearer equivalent:

```javascript
db.emp.find({ sal: { $gte: 2000 } })
```

Remember: `$and`, `$or`, and `$nor` take arrays of query conditions. `$not` does not work like those array-based top-level logical operators.

### Combine `$or` with another condition

```javascript
db.emp.find({
  $or: [
    { deptno: 20 },
    { sal: { $gt: 3000 } }
  ],
  job: { $ne: "CLERK" }
})
```

This means **(department is 20 OR salary is above 3000) AND job is not CLERK**.

### More practice examples

```javascript
// Salary above 2000 and department is 10 or 20
db.emp.find({ sal: { $gt: 2000 }, deptno: { $in: [10, 20] } })

// Salary below 2000 and job is CLERK or SALESMAN
db.emp.find({ sal: { $lt: 2000 }, job: { $in: ["CLERK", "SALESMAN"] } })

// Department 20 and salary is not 3000
db.emp.find({ deptno: 20, sal: { $ne: 3000 } })

// Department is not 10, 20, or 30 and salary is above 1000
db.emp.find({ deptno: { $nin: [10, 20, 30] }, sal: { $gt: 1000 } })

// Either a SALESMAN in department 30 or an ANALYST in department 20
db.emp.find({
  $or: [
    { job: "SALESMAN", deptno: 30 },
    { job: "ANALYST", deptno: 20 }
  ]
})
```

---

## 9. Element Operators

Element operators check whether a field exists or what type of value it contains.

### `$exists`

**Definition:** Checks whether a field is present in a document.

```javascript
db.emp.find({ comm: { $exists: true } })
db.emp.find({ comm: { $exists: false } })
```

A field can exist with value `null`. Therefore, “field exists” and “field has a non-null value” are not the same thing.

### `$type`

**Definition:** Matches documents where a field has a specified BSON type.

```javascript
db.emp.find({ ename: { $type: "string" } })
db.emp.find({ sal: { $type: "number" } })
db.emp.find({ hiredate: { $type: "date" } })
```

Common BSON type names include `"string"`, `"int"`, `"long"`, `"double"`, `"decimal"`, `"bool"`, `"date"`, `"object"`, `"array"`, and `"objectId"`.

---

## 10. Evaluation Operators and Regular Expressions

### `$expr`

**Definition:** Allows aggregation expressions to be used inside a query filter. It is useful when comparing one field with another field in the same document.

In `$expr`, field paths begin with `$`.

```javascript
// Employees whose commission is greater than their salary
db.emp.find(
  { $expr: { $gt: ["$comm", "$sal"] } },
  { _id: 0, ename: 1, comm: 1, sal: 1 }
)
```

```javascript
// Employees whose employee number is greater than their manager's employee number
db.emp.find(
  { $expr: { $gt: ["$empno", "$mgr"] } },
  { _id: 0, ename: 1, empno: 1, mgr: 1 }
)
```

Difference:
- `{ sal: { $gt: 2000 } }` compares a field with a fixed value.
- `{ $expr: { $gt: ["$comm", "$sal"] } }` compares two field values in each document.

### `$regex`

**Definition:** Searches string values using a pattern.

```javascript
db.emp.find({ ename: { $regex: /s/ } })       // Contains s
db.emp.find({ ename: { $regex: /^s/ } })      // Starts with s
db.emp.find({ ename: { $regex: /n$/ } })      // Ends with n
db.emp.find({ ename: { $regex: /^.{5}$/ } })  // Exactly 5 characters
db.emp.find({ ename: { $regex: /^[AEIOU]/i } }) // Starts with a vowel; case-insensitive
```

Useful regex symbols:

| Symbol | Meaning |
|---|---|
| `^` | Start of string |
| `$` | End of string |
| `.` | Any single character |
| `*` | Zero or more of the previous expression |
| `{5}` | Exactly five repetitions of the preceding expression |
| `i` | Case-insensitive matching option |

The pattern `/^.{5}$/` means: start of string, any five characters, then end of string.

**Tip:** Use a clear regex pattern and remember that regex searches strings, not numeric values.

---

## 11. Update Operations

An **update operation** changes fields in existing documents. Most updates use a filter and an update document.

### `updateOne()`

**Definition:** Updates the first matching document.

```javascript
db.emp.updateOne(
  { ename: "SCOTT" },
  { $set: { sal: 3200 } }
)
```

### `updateMany()`

**Definition:** Updates every document that matches the filter.

```javascript
db.emp.updateMany(
  { deptno: 20 },
  { $inc: { sal: 100 } }
)
```

This increases the salary of every employee in department 20 by 100.

### Update result

MongoDB reports fields such as:
- `matchedCount`: number of documents matching the filter.
- `modifiedCount`: number of documents actually changed.

If `matchedCount` is `0`, check the collection name, filter values, spelling, and case. If `matchedCount` is greater than `0` but `modifiedCount` is `0`, the matching documents may already have the requested values.

---

## 12. Update Operators

Update operators tell MongoDB how to modify fields. Use them inside an update document.

### `$set`

**Definition:** Adds a field if it does not exist, or replaces its value if it already exists.

```javascript
db.emp.updateOne({ ename: "SCOTT" }, { $set: { sal: 3100 } })
db.emp.updateOne({ ename: "SCOTT" }, { $set: { city: "INDORE" } })
```

### `$inc`

**Definition:** Increases or decreases a numeric field by an amount.

```javascript
db.emp.updateOne({ ename: "SCOTT" }, { $inc: { sal: 200 } })
db.emp.updateOne({ ename: "SCOTT" }, { $inc: { sal: -100 } })
```

If the field does not exist, `$inc` creates it with the specified amount. The field must be numeric if it already exists.

### `$unset`

**Definition:** Removes a field from a document.

```javascript
db.emp.updateOne({ ename: "SCOTT" }, { $unset: { city: "" } })
```

The value paired with the field is ignored; an empty string is commonly used for readability.

**Important:** `_id` is immutable. You cannot remove or change `_id` with `$unset` or another update operator.

### `$rename`

**Definition:** Changes a field's name.

```javascript
db.emp.updateOne(
  { ename: "SCOTT" },
  { $rename: { oldField: "newField" } }
)
```

Use the actual existing field name in place of `oldField`.

### `$max`

**Definition:** Updates a field only if the supplied value is greater than its current value.

```javascript
db.employees.updateOne(
  { id: 1 },
  { $max: { salary: 55000 } }
)
```

If the current salary is 60000, it stays 60000. If it is 50000, it becomes 55000.

### `$min`

**Definition:** Updates a field only if the supplied value is less than its current value.

```javascript
db.employees.updateOne(
  { id: 1 },
  { $min: { salary: 45000 } }
)
```

### `$mul`

**Definition:** Multiplies a numeric field by a specified number.

```javascript
db.employees.updateOne(
  { id: 1 },
  { $mul: { salary: 2 } }
)
```

This doubles the salary of the matched document. Use carefully.

### Quick comparison

| Operator | What it does |
|---|---|
| `$set` | Set or add a field value |
| `$inc` | Add an amount to a number |
| `$unset` | Remove a field |
| `$rename` | Rename a field |
| `$max` | Keep the greater of current and supplied values |
| `$min` | Keep the smaller of current and supplied values |
| `$mul` | Multiply a numeric value |

### Update safely

Before running a large update, inspect the matching documents:

```javascript
db.emp.find({ deptno: 20 })
```

Then update:

```javascript
db.emp.updateMany({ deptno: 20 }, { $inc: { sal: 100 } })
```

For important data, use a backup or a test collection first.

---

## 13. Delete Operations

### `deleteOne()`

**Definition:** Deletes one document matching a filter.

```javascript
db.emp.deleteOne({ ename: "SCOTT" })
```

If more than one document matches, only one matching document is deleted.

### `deleteMany()`

**Definition:** Deletes all documents matching a filter.

```javascript
db.emp.deleteMany({ deptno: 10 })
```

### Delete all documents but keep the collection

```javascript
db.emp.deleteMany({})
```

This empties the collection but does not drop the collection itself.

### Delete vs drop

- `deleteMany({})` removes documents while keeping the collection.
- `db.emp.drop()` removes the collection itself.

Always check the filter before deleting data. A result with `deletedCount: 0` means no document matched that filter.

---

## 14. Date Queries and Date Expressions

MongoDB dates should normally be stored as BSON Date values, not as arbitrary strings.

### Use `new Date()`

**Definition:** Creates a JavaScript Date value that MongoDB can compare with a BSON Date field.

```javascript
db.emp.find({
  hiredate: {
    $gte: new Date("1982-01-01T00:00:00Z"),
    $lt: new Date("1983-01-01T00:00:00Z")
  }
})
```

This finds employees hired during calendar year 1982 using a start-inclusive, end-exclusive range. The `Z` indicates UTC; choose date boundaries that match your intended time zone and data.

Prefer `$lt` the next year's start over a date such as December 31 at midnight, because the latter can miss records later on December 31.

### Find employees hired after a date

```javascript
db.emp.find({
  hiredate: { $gt: new Date("1980-12-31T00:00:00Z") }
})
```

### Date expressions in aggregation

Date expressions extract parts of a date field. They are often used in an aggregation pipeline.

#### `$year`

Returns the year from a date.

```javascript
db.emp.aggregate([
  { $addFields: { year: { $year: "$hiredate" } } },
  { $match: { year: { $gt: 1980 } } }
])
```

#### `$month`

Returns the month number from 1 to 12.

```javascript
db.emp.aggregate([
  { $addFields: { month: { $month: "$hiredate" } } },
  { $match: { month: 12 } }
])
```

#### `$dayOfMonth`

Returns the day of the month from 1 to 31.

```javascript
db.emp.aggregate([
  { $addFields: { day: { $dayOfMonth: "$hiredate" } } },
  { $match: { day: 17 } }
])
```

`$addFields` adds a calculated field to each pipeline document. It does not permanently change the stored documents unless the pipeline writes results using a stage such as `$merge` or `$out`.

---

## 15. Aggregation Framework

### What is aggregation?

**Aggregation** processes documents through a sequence of stages to filter, transform, group, calculate, and combine data. It is useful for reports such as total salary by department or average salary by job.

Basic syntax:

```javascript
db.emp.aggregate([
  { $match: { deptno: 20 } },
  { $group: { _id: "$job", totalSal: { $sum: "$sal" } } },
  { $project: { _id: 0, job: "$_id", totalSal: 1 } }
])
```

The pipeline passes the output of one stage to the next stage.

### What is a pipeline?

A **pipeline** is an ordered list of aggregation stages. Each stage performs one task, and stage order matters.

### Aggregation vs `find()`

| `find()` | `aggregate()` |
|---|---|
| Best for retrieving documents using filters and projection | Best for multi-step transformations and calculations |
| Uses a filter and optional projection | Uses an array of stages |
| Can sort, skip, and limit results | Can filter, group, join, calculate, reshape, sort, and limit |

---

## 16. Aggregation Stages

### `$match` — filter documents

**Definition:** Keeps only documents that satisfy a condition. It is similar to `WHERE` in SQL when used before grouping.

```javascript
{ $match: { sal: { $gt: 2000 } } }
```

### `$group` — group documents and calculate values

**Definition:** Groups documents by an expression and can calculate aggregate values.

```javascript
{
  $group: {
    _id: "$deptno",
    totalSal: { $sum: "$sal" },
    avgSal: { $avg: "$sal" },
    employeeCount: { $sum: 1 }
  }
}
```

- `_id` defines the grouping key.
- `_id: "$deptno"` groups by department.
- `_id: "$job"` groups by job.
- `_id: null` groups all input documents together.

### `$project` — choose and reshape output

**Definition:** Selects, excludes, renames, or calculates fields in pipeline output.

```javascript
{
  $project: {
    _id: 0,
    deptno: "$_id",
    totalSal: 1
  }
}
```

Here `deptno: "$_id"` renames the group key to `deptno`.

### `$sort` — sort pipeline output

```javascript
{ $sort: { totalSal: -1 } }
```

`1` means ascending; `-1` means descending.

### `$limit` and `$skip`

```javascript
{ $sort: { sal: -1 } },
{ $skip: 1 },
{ $limit: 1 }
```

These stages support pagination or selecting a position in a sorted result.

### `$addFields` / `$set`

These stages add calculated fields while retaining existing fields.

```javascript
{ $addFields: { annualSal: { $multiply: ["$sal", 12] } } }
```

In aggregation, `$set` is an alias for `$addFields` in supported MongoDB versions. Do not confuse aggregation `$set` with the update operator form, although their broad purpose is similar.

### `$unwind` — expand an array

**Definition:** Creates a separate output document for each element in an array field.

If `deptInfo` contains one department object, `$unwind` turns that array element into a regular nested object for the next stages.

```javascript
{ $unwind: "$deptInfo" }
```

By default, documents with a missing, null, or empty array are dropped. To preserve them:

```javascript
{
  $unwind: {
    path: "$deptInfo",
    preserveNullAndEmptyArrays: true
  }
}
```

### `$count`

In a pipeline, `$count` creates a field with the number of documents reaching that stage:

```javascript
{ $count: "totalEmployees" }
```

Inside `$group`, a common way to count documents in each group is `{ $sum: 1 }`. Some MongoDB versions support the `$count` accumulator in `$group`; use the form supported by your installed version.

### SQL `WHERE` vs `HAVING` idea in aggregation

- `$match` **before** `$group` filters individual input documents, similar to SQL `WHERE`.
- `$match` **after** `$group` filters calculated groups, similar to SQL `HAVING`.

Example: total salary by department, then keep departments whose total exceeds 5000:

```javascript
db.emp.aggregate([
  { $group: { _id: "$deptno", totalSal: { $sum: "$sal" } } },
  { $match: { totalSal: { $gt: 5000 } } },
  { $project: { _id: 0, deptno: "$_id", totalSal: 1 } }
])
```

---

## 17. Aggregation Accumulators

Accumulators calculate values for each group.

| Accumulator | Definition | Example |
|---|---|---|
| `$sum` | Adds numeric values | `{ $sum: "$sal" }` |
| `$avg` | Calculates average | `{ $avg: "$sal" }` |
| `$min` | Finds minimum | `{ $min: "$sal" }` |
| `$max` | Finds maximum | `{ $max: "$sal" }` |
| `$first` | Returns the first value in the group input order | `{ $first: "$ename" }` |
| `$last` | Returns the last value in the group input order | `{ $last: "$ename" }` |
| `$push` | Collects values into an array, including duplicates | `{ $push: "$ename" }` |
| `$addToSet` | Collects unique values into an array | `{ $addToSet: "$job" }` |

For `$first` and `$last`, sort the pipeline before grouping if you need a meaningful order.

### Total salary by department

```javascript
db.emp.aggregate([
  { $group: { _id: "$deptno", totalSal: { $sum: "$sal" } } },
  { $project: { _id: 0, deptno: "$_id", totalSal: 1 } }
])
```

### Average salary by job

```javascript
db.emp.aggregate([
  { $group: { _id: "$job", avgSal: { $avg: "$sal" } } },
  { $project: { _id: 0, job: "$_id", avgSal: 1 } }
])
```

### Count employees in each department

```javascript
db.emp.aggregate([
  { $group: { _id: "$deptno", totalEmployees: { $sum: 1 } } },
  { $project: { _id: 0, deptno: "$_id", totalEmployees: 1 } }
])
```

### Find departments whose average salary is greater than 2000

```javascript
db.emp.aggregate([
  { $group: { _id: "$deptno", avgSal: { $avg: "$sal" } } },
  { $match: { avgSal: { $gt: 2000 } } },
  { $project: { _id: 0, deptno: "$_id", avgSal: 1 } }
])
```

### Find jobs with total salary greater than 4000, for departments 10 and 20

```javascript
db.emp.aggregate([
  { $match: { deptno: { $in: [10, 20] } } },
  { $group: { _id: "$job", totalSal: { $sum: "$sal" } } },
  { $match: { totalSal: { $gt: 4000 } } },
  { $project: { _id: 0, job: "$_id", totalSal: 1 } }
])
```

### More useful aggregation patterns

```javascript
// Average salary by department, excluding department 10
db.emp.aggregate([
  { $match: { deptno: { $ne: 10 } } },
  { $group: { _id: "$deptno", avgSal: { $avg: "$sal" } } },
  { $project: { _id: 0, deptno: "$_id", avgSal: 1 } }
])

// Total salary of employees whose job is MANAGER
db.emp.aggregate([
  { $match: { job: "MANAGER" } },
  { $group: { _id: "$job", totalSal: { $sum: "$sal" } } },
  { $project: { _id: 0, job: "$_id", totalSal: 1 } }
])

// Count employees in each job earning between 1000 and 3000 (exclusive)
db.emp.aggregate([
  { $match: { sal: { $gt: 1000, $lt: 3000 } } },
  { $group: { _id: "$job", totalEmployees: { $sum: 1 } } },
  { $project: { _id: 0, job: "$_id", totalEmployees: 1 } }
])

// Find departments whose minimum salary is above 1000
db.emp.aggregate([
  { $group: { _id: "$deptno", minSal: { $min: "$sal" } } },
  { $match: { minSal: { $gt: 1000 } } },
  { $project: { _id: 0, deptno: "$_id", minSal: 1 } }
])

// Average salary by job for employees hired before 1 January 1982
db.emp.aggregate([
  { $match: { hiredate: { $lt: new Date("1982-01-01T00:00:00Z") } } },
  { $group: { _id: "$job", avgSal: { $avg: "$sal" } } },
  { $project: { _id: 0, job: "$_id", avgSal: 1 } }
])
```

---

## 18. `$lookup`: Joining Collections

### What is `$lookup`?

**`$lookup` is an aggregation stage that combines documents from another collection based on matching fields.** It is similar in purpose to a left outer join in SQL. The joined results are placed in an array.

Basic syntax:

```javascript
{
  $lookup: {
    from: "dept",
    localField: "deptno",
    foreignField: "deptno",
    as: "deptInfo"
  }
}
```

- `from`: collection to search.
- `localField`: matching field in the current documents.
- `foreignField`: matching field in the other collection.
- `as`: name of the output array.

### Example: employee and department details

Assume:
- `emp` contains `ename`, `sal`, and `deptno`.
- `dept` contains `deptno`, `dname`, and `loc`.

```javascript
db.emp.aggregate([
  {
    $lookup: {
      from: "dept",
      localField: "deptno",
      foreignField: "deptno",
      as: "deptInfo"
    }
  },
  { $unwind: "$deptInfo" },
  {
    $project: {
      _id: 0,
      ename: 1,
      sal: 1,
      dname: "$deptInfo.dname",
      loc: "$deptInfo.loc"
    }
  }
])
```

### Find employees in the RESEARCH department

```javascript
db.emp.aggregate([
  {
    $lookup: {
      from: "dept",
      localField: "deptno",
      foreignField: "deptno",
      as: "deptInfo"
    }
  },
  { $unwind: "$deptInfo" },
  { $match: { "deptInfo.dname": "RESEARCH" } },
  {
    $project: {
      _id: 0,
      ename: 1,
      sal: 1,
      dname: "$deptInfo.dname"
    }
  }
])
```

Stored text must match the actual capitalization unless a case-insensitive collation or regex is used.

### Find employees working in Dallas and earning more than 2000

```javascript
db.emp.aggregate([
  {
    $lookup: {
      from: "dept",
      localField: "deptno",
      foreignField: "deptno",
      as: "deptInfo"
    }
  },
  { $unwind: "$deptInfo" },
  { $match: { "deptInfo.loc": "DALLAS", sal: { $gt: 2000 } } },
  {
    $project: {
      _id: 0,
      ename: 1,
      sal: 1,
      loc: "$deptInfo.loc"
    }
  }
])
```

### Keep employees even if no matching department exists

A regular `$unwind` drops documents whose lookup array is empty. Use `preserveNullAndEmptyArrays: true` to retain them.

```javascript
db.emp.aggregate([
  {
    $lookup: {
      from: "dept",
      localField: "deptno",
      foreignField: "deptno",
      as: "deptInfo"
    }
  },
  {
    $unwind: {
      path: "$deptInfo",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $project: {
      _id: 0,
      ename: 1,
      dname: { $ifNull: ["$deptInfo.dname", "No Department"] }
    }
  }
])
```

`$ifNull` returns the fallback value when the first expression is null or missing.

### Group using the department name

```javascript
db.emp.aggregate([
  {
    $lookup: {
      from: "dept",
      localField: "deptno",
      foreignField: "deptno",
      as: "deptInfo"
    }
  },
  { $unwind: "$deptInfo" },
  {
    $group: {
      _id: "$deptInfo.dname",
      totalSal: { $sum: "$sal" }
    }
  },
  { $project: { _id: 0, dname: "$_id", totalSal: 1 } }
])
```

### Find employees in SALES who earn more than 1500

```javascript
db.emp.aggregate([
  {
    $lookup: {
      from: "dept",
      localField: "deptno",
      foreignField: "deptno",
      as: "deptInfo"
    }
  },
  { $unwind: "$deptInfo" },
  { $match: { "deptInfo.dname": "SALES", sal: { $gt: 1500 } } },
  { $project: { _id: 0, ename: 1, sal: 1, dname: "$deptInfo.dname" } }
])
```

---

## 19. Self Join

### What is a self join?

A **self join** means joining a collection with itself. It is useful when documents in the same collection are related to each other. In the `emp` collection, an employee's `mgr` field can refer to another employee's `empno`.

### Find each employee's manager

```javascript
db.emp.aggregate([
  {
    $lookup: {
      from: "emp",
      localField: "mgr",
      foreignField: "empno",
      as: "manager"
    }
  },
  { $unwind: "$manager" },
  {
    $project: {
      _id: 0,
      employee: "$ename",
      manager: "$manager.ename",
      employeeSalary: "$sal",
      managerSalary: "$manager.sal"
    }
  }
])
```

Here the current employee's `mgr` matches the manager document's `empno`.

### Find employees who earn more than their managers

```javascript
db.emp.aggregate([
  {
    $lookup: {
      from: "emp",
      localField: "mgr",
      foreignField: "empno",
      as: "manager"
    }
  },
  { $unwind: "$manager" },
  { $match: { $expr: { $gt: ["$sal", "$manager.sal"] } } },
  {
    $project: {
      _id: 0,
      ename: 1,
      sal: 1,
      managerName: "$manager.ename",
      managerSalary: "$manager.sal"
    }
  }
])
```

`$expr` is used because the comparison is between two fields, not a field and a fixed number.

### Find employees whose manager's job is MANAGER

```javascript
db.emp.aggregate([
  {
    $lookup: {
      from: "emp",
      localField: "mgr",
      foreignField: "empno",
      as: "manager"
    }
  },
  { $unwind: "$manager" },
  { $match: { "manager.job": "MANAGER" } },
  {
    $project: {
      _id: 0,
      ename: 1,
      job: 1,
      managerName: "$manager.ename",
      managerJob: "$manager.job"
    }
  }
])
```

### Find employees who report directly to KING

```javascript
db.emp.aggregate([
  {
    $lookup: {
      from: "emp",
      localField: "mgr",
      foreignField: "empno",
      as: "manager"
    }
  },
  { $unwind: "$manager" },
  { $match: { "manager.ename": "KING" } },
  { $project: { _id: 0, ename: 1, managerName: "$manager.ename" } }
])
```

### Compare employee and manager departments

```javascript
db.emp.aggregate([
  {
    $lookup: {
      from: "emp",
      localField: "mgr",
      foreignField: "empno",
      as: "manager"
    }
  },
  { $unwind: "$manager" },
  { $match: { $expr: { $ne: ["$deptno", "$manager.deptno"] } } },
  {
    $project: {
      _id: 0,
      ename: 1,
      deptno: 1,
      managerName: "$manager.ename",
      managerDeptno: "$manager.deptno"
    }
  }
])
```

Use `$eq` instead of `$ne` to find employees in the same department as their manager.

### Display employee, manager, and manager's manager

```javascript
db.emp.aggregate([
  {
    $lookup: {
      from: "emp",
      localField: "mgr",
      foreignField: "empno",
      as: "manager"
    }
  },
  { $unwind: "$manager" },
  {
    $lookup: {
      from: "emp",
      localField: "manager.mgr",
      foreignField: "empno",
      as: "managerOfManager"
    }
  },
  { $unwind: "$managerOfManager" },
  {
    $project: {
      _id: 0,
      employee: "$ename",
      manager: "$manager.ename",
      managerOfManager: "$managerOfManager.ename"
    }
  }
])
```

A regular `$unwind` will omit records that do not have a manager or a manager's manager. If those records should remain, use `preserveNullAndEmptyArrays: true`.

### Keep employees as an array under each manager

If you want an array of employees rather than one output row per employee, do not unwind the lookup array:

```javascript
db.emp.aggregate([
  {
    $lookup: {
      from: "emp",
      localField: "empno",
      foreignField: "mgr",
      as: "directReports"
    }
  },
  { $project: { _id: 0, managerName: "$ename", directReports: "$directReports.ename" } }
])
```

---

## 20. `$lookup` with a Pipeline and Variables

A pipeline-based `$lookup` allows more complex conditions than simple equality between `localField` and `foreignField`.

### Important keywords

- `let`: defines variables using values from the current input document.
- `$$variable`: accesses a variable defined in `let`.
- `$expr`: lets a `$match` stage compare fields and expressions.
- `pipeline`: runs stages against the documents from the joined collection.
- `as`: stores the matching results in an array.

### Find employees with the same salary as SCOTT, excluding SCOTT

```javascript
db.emp.aggregate([
  { $match: { ename: "SCOTT" } },
  {
    $lookup: {
      from: "emp",
      let: { referenceSalary: "$sal", referenceId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$sal", "$$referenceSalary"] },
                { $ne: ["$_id", "$$referenceId"] }
              ]
            }
          }
        }
      ],
      as: "employeesWithSameSalary"
    }
  }
])
```

The outer `$match` selects SCOTT. The lookup pipeline searches for other employees with the same salary, while excluding the original document by `_id`.

### Find employees who joined in the same year as SMITH

```javascript
db.emp.aggregate([
  { $match: { ename: "SMITH" } },
  {
    $lookup: {
      from: "emp",
      let: { referenceYear: { $year: "$hiredate" }, referenceId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: [{ $year: "$hiredate" }, "$$referenceYear"] },
                { $ne: ["$_id", "$$referenceId"] }
              ]
            }
          }
        }
      ],
      as: "employeesJoinedSameYear"
    }
  }
])
```

### Find employees with the same job as ALLEN but in a different department

```javascript
db.emp.aggregate([
  { $match: { ename: "ALLEN" } },
  {
    $lookup: {
      from: "emp",
      let: {
        referenceJob: "$job",
        referenceDept: "$deptno",
        referenceId: "$_id"
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$job", "$$referenceJob"] },
                { $ne: ["$deptno", "$$referenceDept"] },
                { $ne: ["$_id", "$$referenceId"] }
              ]
            }
          }
        }
      ],
      as: "sameJobDifferentDepartment"
    }
  }
])
```

**Read the variable names carefully.** If the question says ALLEN or SMITH, the outer `$match` must select that employee. The variable names and aliases should also describe the same reference employee; mixing names can make a query confusing or incorrect.

---

## 21. SQL Concepts Compared with MongoDB

These are conceptual comparisons to help translate SQL practice into MongoDB. They are not always exact one-to-one replacements.

| SQL concept | MongoDB equivalent / idea |
|---|---|
| Table | Collection |
| Row | Document |
| Column | Field |
| `WHERE` | `find()` filter or `$match` |
| `SELECT name, salary` | Projection in `find()` or `$project` |
| `ORDER BY` | `sort()` or `$sort` |
| `LIMIT` | `limit()` or `$limit` |
| `GROUP BY` | `$group` |
| `HAVING` | `$match` after `$group` |
| `JOIN` | `$lookup` |
| Subquery / correlated query | Sometimes a pipeline-based `$lookup`; the best approach depends on the task |
| `COUNT(*)` | `countDocuments()` or `$sum: 1` inside `$group` |
| `AVG(salary)` | `$avg` |
| `SUM(salary)` | `$sum` |
| `MIN(salary)` / `MAX(salary)` | `$min` / `$max` |

### Example: SQL-style WHERE and GROUP BY

Question: Find the average salary in each department, considering only employees earning more than 1000.

```javascript
db.emp.aggregate([
  { $match: { sal: { $gt: 1000 } } },
  { $group: { _id: "$deptno", avgSal: { $avg: "$sal" } } },
  { $project: { _id: 0, deptno: "$_id", avgSal: 1 } }
])
```

The `$match` first filters individual employees; then `$group` calculates the average for each department.

### Example: HAVING

Question: Find departments whose average salary exceeds 2500.

```javascript
db.emp.aggregate([
  { $group: { _id: "$deptno", avgSal: { $avg: "$sal" } } },
  { $match: { avgSal: { $gt: 2500 } } },
  { $project: { _id: 0, deptno: "$_id", avgSal: 1 } }
])
```

The `$match` after `$group` filters the grouped results, so it is similar to `HAVING`.

---

## 22. Practice Questions from the Learning Files

The dated files cover basic queries, projections, operators, dates, aggregation, `$lookup`, self joins, and pipeline-based lookup. Use these questions as an interview practice checklist.

### Basic queries and operators

1. Display employees whose salary is greater than 2500.
2. Display employees whose salary is less than 1250.
3. Display employees whose salary is between 2000 and 3000, inclusive.
4. Display employees whose job is CLERK or ANALYST.
5. Display employees who are not in departments 10 or 20.
6. Display employees who earn more than 2000 and work in department 20.
7. Display employees who work in department 20 or earn more than 3000, excluding clerks.
8. Display employees whose commission is greater than their salary using `$expr`.
9. Display employees whose names start with `S`.
10. Display employees whose names contain exactly five characters.

### Updates and deletes

1. Increase salary by 100 for every employee in department 20.
2. Set a city field for one employee.
3. Remove a field from one document.
4. Rename a field.
5. Delete one employee using a filter.
6. Explain the difference between `deleteMany({})` and `drop()`.

### Aggregation questions

1. Find the average salary of each department, excluding department 10.
2. Find the total salary paid to employees whose job is MANAGER.
3. Count employees in each department who earn more than 2000.
4. Find the average salary for each job for employees hired before 1 January 1982.
5. Find the average salary of each department, excluding clerks.
6. Find the total salary for each department for employees hired before 1 January 1982.
7. Count employees in each job whose salary is between 1000 and 3000.
8. Find departments whose minimum salary is greater than 1000.
9. Find job roles whose average salary is greater than 2000.
10. Find departments whose total salary exceeds 5000, considering only employees earning more than 1000.
11. Find jobs whose total salary exceeds 4000, considering only departments 10 and 20.
12. Find departments with more than two non-clerk employees.
13. Find employees whose salary is greater than the average salary of their department.
14. Find the highest-paid employee in each department.
15. Find the total salary by department name rather than department number.

### `$lookup` and self-join questions

1. Display employee names with their department names.
2. Find all employees in the RESEARCH department.
3. Find employees working in Dallas who earn more than 2000.
4. Display all employees even if a department match is missing.
5. Display each employee with their manager's name and salary.
6. Find employees whose salary is greater than their manager's salary.
7. Find employees whose manager's job is MANAGER.
8. Find employees who report directly to KING.
9. Find employees who work in a different department from their manager.
10. Display employee name, manager name, and manager's manager name.
11. Find employees who have the same salary as SCOTT, excluding SCOTT.
12. Find employees who joined in the same year as SMITH.
13. Find employees with the same job as ALLEN but in a different department.

### General employee aggregation example

The learning files also include a separate `employees` collection with fields such as `name`, `dept`, `salary`, and `age`. The following are useful practice patterns for that collection:

```javascript
// Highest salary
db.employees.find().sort({ salary: -1 }).limit(1)

// Second document by salary order (not necessarily second distinct salary)
db.employees.find().sort({ salary: -1 }).skip(1).limit(1)

// Lowest salary
db.employees.find().sort({ salary: 1 }).limit(1)

// Sort salary descending, then age ascending
db.employees.find().sort({ salary: -1, age: 1 })

// Group by department, count employees and calculate total/average salary
db.employees.aggregate([
  {
    $group: {
      _id: "$dept",
      employeeCount: { $sum: 1 },
      totalSalary: { $sum: "$salary" },
      averageSalary: { $avg: "$salary" }
    }
  },
  { $sort: { totalSalary: -1 } }
])

// Find unique departments
db.employees.distinct("dept")

// Names starting with a vowel
db.employees.find({ name: { $regex: /^[AEIOU]/i } })

// Names containing exactly five characters
db.employees.find({ name: { $regex: /^.{5}$/ } })
```

**Vega City practice:** The learning files also contain a Vega City collection exercise. The important skills are filtering documents by category and using projection to display only requested fields. Use the actual collection and field names in your file, because the query depends on how that dataset was created.

---

## 23. Common Errors and Their Fixes

### 1. Putting `$not` at the top level

Incorrect:

```javascript
db.emp.find({ $not: { sal: { $lt: 2000 } } })
```

Correct field-level form:

```javascript
db.emp.find({ sal: { $not: { $lt: 2000 } } })
```

Or use the simpler equivalent:

```javascript
db.emp.find({ sal: { $gte: 2000 } })
```

### 2. Putting a projection condition in the filter's second object

Incorrect idea:

```javascript
db.emp.find({ sal: { $gt: 2000 } }, { deptno: { $eq: 20 } })
```

The second object is projection, not another filter. Correct:

```javascript
db.emp.find({ sal: { $gt: 2000 }, deptno: 20 })
```

### 3. Incorrect `$or` structure

Correct:

```javascript
db.emp.find({
  $or: [
    { deptno: 20 },
    { sal: { $gt: 3000 } }
  ],
  job: { $ne: "CLERK" }
})
```

The array contains complete query objects. Other conditions can be placed beside `$or` when they should apply to every result.

### 4. Using impossible conditions on one field

Incorrect:

```javascript
db.emp.find({ sal: { $lt: 1000, $gt: 3000 } })
```

A number cannot normally be both below 1000 and above 3000. For “below 1000 OR above 3000,” use:

```javascript
db.emp.find({
  $or: [
    { sal: { $lt: 1000 } },
    { sal: { $gt: 3000 } }
  ]
})
```

### 5. Forgetting quotes around string values

Use:

```javascript
db.emp.find({ job: "CLERK" })
```

The quotes indicate that `CLERK` is a string.

### 6. Forgetting `_id` in projection

MongoDB includes `_id` by default. To hide it:

```javascript
db.emp.find({}, { ename: 1, sal: 1, _id: 0 })
```

### 7. Confusing `$group` with `$project`

- `$group` groups documents and calculates values.
- `$project` selects or reshapes fields.

A group key appears in `_id` by default. Use `$project` if you want to rename it.

### 8. Using a field name as a literal instead of a field path

Inside aggregation expressions, `"$sal"` means the value of the `sal` field. `"sal"` is just the literal string `sal`.

```javascript
{ $group: { _id: "$deptno", totalSal: { $sum: "$sal" } } }
```

### 9. Confusing `$$variable` with `$field`

- `$sal` refers to a field in the current document.
- `$$referenceSalary` refers to a variable defined inside `$lookup.let`.

### 10. `$lookup` returns an array

`$lookup` places matches into an array. Use `$unwind` when you want one output document per joined match. Do not unwind if you want to keep the matching documents grouped in an array.

### 11. `$unwind` removes documents with empty arrays

By default, empty or missing lookup arrays are dropped. Use `preserveNullAndEmptyArrays: true` when those original documents must remain.

### 12. `updateOne()` or `deleteOne()` reports zero matches

Check:
- Is the collection name correct?
- Does the filter match the exact value?
- Is the string capitalization correct?
- Is the field name spelled correctly?
- Are the value types the same (for example, number `20` versus string `"20"`)?

### 13. Trying to change `_id`

MongoDB's `_id` is immutable. Use a different design or insert a new document with a new `_id` if a record must be recreated; do not attempt to update or unset `_id`.

### 14. `findOne()` does not show every field you expected

Check whether you supplied a projection or options. To see the full document:

```javascript
db.employees.findOne({ id: 1 })
```

For the highest salary, use an explicit sort:

```javascript
db.employees.find().sort({ salary: -1 }).limit(1)
```

### 15. Date query misses records on the last day

Use a start-inclusive, next-period-exclusive range:

```javascript
{
  hiredate: {
    $gte: new Date("1982-01-01T00:00:00Z"),
    $lt: new Date("1983-01-01T00:00:00Z")
  }
}
```

Make sure the time zone and stored data type are correct.

---

## 24. Interview Quick Revision

### Core definitions

- **MongoDB:** A document-oriented NoSQL database that stores BSON documents in collections.
- **Database:** A container for collections.
- **Collection:** A group of documents.
- **Document:** One record made of field-value pairs.
- **Field:** A named value inside a document.
- **BSON:** Binary format used by MongoDB to store document data.
- **`_id`:** Unique identifier field for each document in a collection.
- **Cursor:** An object used to iterate through query results.
- **Projection:** Controls which fields are returned.
- **Query operator:** Filters documents using conditions such as `$gt`, `$in`, or `$eq`.
- **Logical operator:** Combines or reverses query conditions, such as `$and`, `$or`, `$nor`, and field-level `$not`.
- **Update operator:** Modifies field values, for example `$set`, `$inc`, and `$unset`.
- **Aggregation:** Processes documents through stages to calculate or transform results.
- **Pipeline:** An ordered list of aggregation stages.
- **`$match`:** Filters documents in an aggregation pipeline.
- **`$group`:** Groups documents and calculates values.
- **`$project`:** Selects or reshapes output fields.
- **`$lookup`:** Joins matching documents from another collection into an array.
- **Self join:** Joins a collection with itself.
- **`$unwind`:** Expands an array into separate output documents.
- **`$expr`:** Allows expression-based comparisons, including comparing one field with another.
- **`$regex`:** Matches string values against a pattern.

### Methods and stages you should know

| Task | Method / stage |
|---|---|
| Insert one document | `insertOne()` |
| Insert multiple documents | `insertMany()` |
| Read matching documents | `find()` |
| Read one document | `findOne()` |
| Select fields | Projection / `$project` |
| Sort results | `sort()` / `$sort` |
| Limit results | `limit()` / `$limit` |
| Skip results | `skip()` / `$skip` |
| Update one / many | `updateOne()` / `updateMany()` |
| Delete one / many | `deleteOne()` / `deleteMany()` |
| Filter pipeline documents | `$match` |
| Group and calculate | `$group` |
| Join another collection | `$lookup` |
| Expand array elements | `$unwind` |
| Add calculated field | `$addFields` |
| Extract date parts | `$year`, `$month`, `$dayOfMonth` |

### Common interview differences

**`find()` vs `aggregate()`**
- `find()` retrieves matching documents.
- `aggregate()` processes documents through stages for filtering, grouping, calculations, joins, and transformations.

**`updateOne()` vs `updateMany()`**
- `updateOne()` updates one matching document.
- `updateMany()` updates all matching documents.

**`deleteMany({})` vs `drop()`**
- `deleteMany({})` removes documents but keeps the collection.
- `drop()` removes the collection.

**`$match` before vs after `$group`**
- Before `$group`: filters input documents.
- After `$group`: filters calculated groups, like SQL `HAVING`.

**`$lookup` vs self join**
- `$lookup` joins data from a collection.
- A self join is a use of `$lookup` where `from` is the same collection as the current one.

**`$set` vs `$inc`**
- `$set` assigns a specific value.
- `$inc` adds or subtracts an amount from a numeric value.

### A simple aggregation pattern to remember

```javascript
db.emp.aggregate([
  { $match: { sal: { $gt: 1000 } } },
  {
    $group: {
      _id: "$deptno",
      totalEmployees: { $sum: 1 },
      totalSal: { $sum: "$sal" },
      avgSal: { $avg: "$sal" }
    }
  },
  { $match: { avgSal: { $gt: 2000 } } },
  { $sort: { avgSal: -1 } },
  { $project: { _id: 0, deptno: "$_id", totalEmployees: 1, totalSal: 1, avgSal: 1 } }
])
```

Read it in order:

1. Filter employees whose salary is above 1000.
2. Group them by department and calculate count, total salary, and average salary.
3. Keep departments whose average salary is above 2000.
4. Sort by average salary from highest to lowest.
5. Display clean output fields.

---


