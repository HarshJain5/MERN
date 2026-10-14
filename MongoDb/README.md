# MongoDB Complete Notes

> Simple, beginner-friendly MongoDB notes. We will keep adding every new class topic to this same `README.md`.

**Learning tip:** Read the short explanation first, then run the example in `mongosh`. Replace sample values with values from your own collection when practising.

## Table of Contents

1. [Introduction to MongoDB](#1-introduction-to-mongodb)
2. [Database and Collections](#2-database-and-collections)
3. [Insert Operations](#3-insert-operations)
4. [Read Operations](#4-read-operations)
5. [Projection](#5-projection)
6. [Query Operators](#6-query-operators)
7. [Logical Operators](#7-logical-operators)
8. [Update Operations](#8-update-operations)
9. [Delete Operations](#9-delete-operations)
10. [Vega City Practice](#10-vega-city-practice)
11. [EMP Collection Practice](#11-emp-collection-practice)
12. [Common Mistakes](#12-common-mistakes)
13. [Element Operators](#13-element-operators)
14. [Evaluation Operators](#14-evaluation-operators)
15. [Date Query Practice](#15-date-query-practice)
16. [Quick Revision](#16-quick-revision)
17. [Update Operations and Update Operators](#17-update-operations-and-update-operators)

---

## 1. Introduction to MongoDB

**MongoDB is a NoSQL database** used to store and manage data. It stores data as **documents** that look similar to JSON objects. MongoDB stores these documents internally in a format called **BSON**.

### SQL vs NoSQL — Main Difference

**SQL (Structured Query Language)** is the language used to create, read, update, and delete data in relational databases. In everyday conversation, “SQL database” usually refers to a relational database that organizes data into tables.

**NoSQL (commonly expanded as Not Only SQL)** refers to database systems that use data models beyond the traditional relational-table model. MongoDB is a **document-oriented NoSQL database** that stores data as BSON documents inside collections. NoSQL does not mean that data has no structure or that relationships and transactions are impossible.

| Basis | SQL / Relational Database | NoSQL Database (MongoDB example) |
|---|---|---|
| Database model | Relational Database Management System (RDBMS) | Non-relational models, such as document, key-value, wide-column, or graph; MongoDB uses the document model |
| Data storage | Data is organized into tables made of rows and columns | MongoDB stores documents inside collections |
| Basic data unit | Row (record) and column | Document and field |
| Schema / structure | Usually follows a predefined table structure with columns and data types | Often has a flexible schema; documents in the same collection may have different fields, and validation rules can enforce structure |
| Relationships | Commonly modelled with primary keys and foreign keys; tables can be combined using joins | Often modelled using embedded documents or references; MongoDB also supports join-like operations with `$lookup` in aggregation |
| Query style | Uses SQL statements such as `SELECT`, `INSERT`, `UPDATE`, and `DELETE` | Uses methods and query documents such as `find()`, `insertOne()`, `updateOne()`, and `deleteOne()` |
| Changing structure | A change to the table structure may require a schema alteration | Flexible documents can make evolving data structures easier, though consistency still needs to be designed |
| Transactions / ACID | Relational databases commonly support ACID transactions | Support varies by database; MongoDB supports atomic single-document operations and multi-document ACID transactions |
| Scaling | Often associated with vertical scaling, but many relational databases also support horizontal scaling | Often associated with horizontal scaling; MongoDB supports sharding |
| Common use cases | Structured data, strong relationships, reporting, and applications needing relational queries | Document-shaped or evolving data, and applications that benefit from flexible document structures |
| Examples | MySQL, Oracle Database, PostgreSQL, SQL Server | MongoDB, CouchDB, Neo4j, and other systems depending on the NoSQL model |

**Remember:** SQL is also the name of a query language, while “NoSQL” describes a broad family of database systems. Neither approach is always better. Choose based on the application's data, relationships, consistency needs, query patterns, and scaling requirements.

### Vertical Scaling vs Horizontal Scaling

- **Vertical scaling (scale up):** Increase the resources of one server, such as CPU, RAM, or storage, or replace it with a more powerful server.
- **Horizontal scaling (scale out):** Add more servers or machines and distribute the workload or data across them.

**Easy example:** Upgrading one server from 8 GB RAM to 32 GB RAM is vertical scaling. Adding more servers to share the workload is horizontal scaling.

### ACID Properties

**ACID** describes four properties that help make database transactions reliable.

| Property | Definition in English | Simple explanation |
|---|---|---|
| **Atomicity** | A transaction is completed entirely or not completed at all. | If a transaction has several steps and one required step fails, the transaction is rolled back instead of leaving a partial result. |
| **Consistency** | A transaction takes the database from one valid state to another valid state. | Rules and constraints must remain satisfied before and after the transaction. |
| **Isolation** | Concurrent transactions should not interfere with each other in an invalid way. | Multiple transactions may run at the same time, but the database controls how their changes interact. |
| **Durability** | Once a transaction is committed, its changes are persisted. | After a successful commit, the changes should remain saved even if the system restarts, subject to the database's durability guarantees. |

**Important:** It is not accurate to say that all SQL databases support ACID while no NoSQL databases do. ACID support depends on the database and operation. MongoDB provides atomicity for single-document writes and supports ACID transactions across multiple documents when required.

### SQL vs MongoDB terminology

| SQL / Relational Database | MongoDB |
|---|---|
| Database | Database |
| Table | Collection |
| Row / Record | Document |
| Column | Field |
| `SELECT * FROM students` | `db.students.find()` |
| `INSERT INTO students ...` | `db.students.insertOne()` / `insertMany()` |
| `UPDATE students ...` | `db.students.updateOne()` / `updateMany()` |
| `DELETE FROM students ...` | `db.students.deleteOne()` / `deleteMany()` |

### Same data represented in SQL and MongoDB

Suppose we store a student's name, age, and city.

**In a SQL table:**

| id | name | age | city |
|---:|---|---:|---|
| 1 | Rahul | 22 | Indore |

**In MongoDB, the equivalent document can look like this:**

```javascript
{
  _id: 1,
  name: "Rahul",
  age: 22,
  city: "Indore"
}
```

The SQL example represents one record in a table; the MongoDB example represents one document in a collection. The field names and values are similar, but the storage model and query syntax differ.

### Example document

```javascript
{
  name: "Rahul",
  age: 22,
  city: "Indore"
}
```

### Basic shell commands

```javascript
show dbs
use college
db
show collections
```

- `show dbs`: shows databases that currently contain data.
- `use college`: switches to the `college` database. MongoDB creates it when you first save data in it.
- `db`: shows the name of the database you are currently using.
- `show collections`: lists the collections inside the current database.

---

## 2. Database and Collections

### Create a collection

```javascript
db.createCollection("students")
```

### Create a capped collection

A **capped collection** has a fixed maximum storage size and keeps documents in insertion order. When it becomes full, MongoDB can replace older documents with newer ones. It can be useful for keeping recent log records.

```javascript
db.createCollection("logs", {
  capped: true,
  size: 100000
})
```

- `capped: true` tells MongoDB to create a capped collection.
- `size` is measured in bytes (storage size), not the number of documents.

### Drop a collection

```javascript
db.students.drop()
```

> Caution: `drop()` removes the collection and its documents.

---

## 3. Insert Operations

### `insertOne()`

Adds one document to a collection.

```javascript
db.students.insertOne({
  name: "Rahul",
  age: 22,
  city: "Indore"
})
```

### `insertMany()`

Adds several documents to a collection in one operation.

```javascript
db.students.insertMany([
  { name: "Aman", age: 21, city: "Bhopal" },
  { name: "Priya", age: 22, city: "Indore" },
  { name: "Neha", age: 20, city: "Dewas" }
])
```

**Important points:**
- If you do not provide `_id`, MongoDB creates one automatically.
- `_id` is the unique identifier for a document in that collection.
- Two documents in the same collection cannot have the same `_id`.
- Write text values inside quotes, such as `"Rahul"`. Write numeric values without quotes, such as `22`.
- Use a colon (`:`) between a field name and its value.

---

## 4. Read Operations

### `find()`

`find()` searches the collection and returns all documents that match your condition. If you do not give a condition, it returns all documents.

```javascript
db.students.find()
db.students.find({})
db.students.find({ city: "Indore" })
db.students.find({ age: 22 })
```

### `findOne()`

`findOne()` returns just one document that matches your condition. If no document matches, it returns `null`.

```javascript
db.students.findOne()
db.students.findOne({ city: "Indore" })
```

### String comparison

By default, MongoDB treats uppercase and lowercase letters as different in an exact string search. So `"Indore"` and `"indore"` may not match each other.

### `find()` cursor

`find()` gives MongoDB a cursor to the matching results. In simple terms, the results can be shown in batches instead of all at once when there are many documents.

---

## 5. Projection

Projection means selecting which fields should be shown in the result.

### Include selected fields

```javascript
db.students.find(
  {},
  { name: 1, city: 1 }
)
```

The result shows `name`, `city`, and `_id`. MongoDB includes `_id` automatically unless you hide it.

### Include fields and hide `_id`

```javascript
db.students.find(
  {},
  { name: 1, city: 1, _id: 0 }
)
```

### Exclude a field

```javascript
db.students.find(
  {},
  { age: 0 }
)
```

**Rules:**
- Use `1` to show a field and `0` to hide a field.
- Usually, do not mix fields marked `1` and `0` in one projection. The exception is `_id`: you can show other fields and set `_id: 0` to hide it.
- First argument of `find()` is the **filter**; second argument is the **projection**.

Example:

```javascript
db.students.find(
  { city: "Indore" },
  { name: 1, age: 1, _id: 0 }
)
```

---

## 6. Query Operators

Examples below use an `emp` collection with fields such as `sal` and `job`.

### `$eq` — equal to (the value must be exactly the same)

```javascript
db.emp.find({ sal: { $eq: 2000 } })
```

Equivalent short form:

```javascript
db.emp.find({ sal: 2000 })
```

### `$ne` — not equal to (the value must be different)

```javascript
db.emp.find({ job: { $ne: "CLERK" } })
```

Note: Note: `$ne` can also return documents that do not have a `job` field.

### `$gt` — greater than (more than the given value)

```javascript
db.emp.find({ sal: { $gt: 3000 } })
```

### `$gte` — greater than or equal to (the given value or higher)

```javascript
db.emp.find({ sal: { $gte: 3000 } })
```

### `$lt` — less than (below the given value)

```javascript
db.emp.find({ sal: { $lt: 1000 } })
```

### `$lte` — less than or equal to (the given value or lower)

```javascript
db.emp.find({ sal: { $lte: 1000 } })
```

### `$in` — matches any value in a list (one of the listed values is enough)

```javascript
db.emp.find({ job: { $in: ["CLERK", "MANAGER"] } })
```

### `$nin` — matches none of the values in a list (the field value is not in the list)

```javascript
db.emp.find({ job: { $nin: ["CLERK", "MANAGER"] } })
```

Note: Note: `$nin` can also return documents that do not have a `job` field.

### Salary range examples

Salary **below 1000 OR above 3000**:

```javascript
db.emp.find({
  $or: [
    { sal: { $lt: 1000 } },
    { sal: { $gt: 3000 } }
  ]
})
```

Salary **between 1000 and 3000 inclusive**:

```javascript
db.emp.find({
  sal: { $gte: 1000, $lte: 3000 }
})
```

Salary **strictly between 1000 and 3000**:

```javascript
db.emp.find({
  sal: { $gt: 1000, $lt: 3000 }
})
```

This condition cannot match a normal numeric salary:

```javascript
{ sal: { $lt: 1000, $gt: 3000 } }
```

It asks for one salary to be less than 1000 and greater than 3000 at the same time, which is impossible.

---

## 7. Logical Operators

### `$and` — all conditions must match (every condition must be true)

```javascript
db.emp.find({
  $and: [
    { deptno: 20 },
    { sal: { $gt: 2000 } }
  ]
})
```

For different fields, the implicit-AND form is shorter:

```javascript
db.emp.find({
  deptno: 20,
  sal: { $gt: 2000 }
})
```

### `$or` — at least one condition must match (any one condition can be true)

```javascript
db.emp.find({
  $or: [
    { deptno: 20 },
    { sal: { $gt: 3000 } }
  ]
})
```

### `$nor` — none of the conditions may match (all listed conditions must be false)

```javascript
db.emp.find({
  $nor: [
    { deptno: 10 },
    { job: "CLERK" }
  ]
})
```

### `$not` — reverses a field condition (matches when that condition is not true)

```javascript
db.emp.find({
  sal: { $not: { $gt: 3000 } }
})
```

This query can also return documents that do not have a `sal` field.

### Combine `$or` with another condition

Find employees who work in department 20 **or** earn more than 3000, while excluding clerks:

```javascript
db.emp.find({
  $or: [
    { deptno: 20 },
    { sal: { $gt: 3000 } }
  ],
  job: { $ne: "CLERK" }
})
```

**Remember:** `$or` takes an array (`[ ]`) of conditions. Any one of those conditions can match, but any extra condition outside `$or` must also match.

---

## 8. Update Operations

### `updateOne()`

Changes the first document that matches the filter.

```javascript
db.students.updateOne(
  { name: "Rahul" },
  { $set: { city: "Bangalore" } }
)
```

### `updateMany()`

Changes every document that matches the filter.

```javascript
db.students.updateMany(
  { city: "Indore" },
  { $set: { city: "Indore City" } }
)
```

### `$set` — add a field or change its value

```javascript
db.students.updateOne(
  { name: "Aman" },
  { $set: { age: 23 } }
)
```

### `$inc` — increase or decrease a number by a given amount

```javascript
db.emp.updateOne(
  { ename: "SMITH" },
  { $inc: { sal: 500 } }
)
```

### `$unset` — remove a field from a document

```javascript
db.students.updateOne(
  { name: "Neha" },
  { $unset: { city: "" } }
)
```

> Check the filter before using `updateMany()` because it changes every matching document.

---

## 9. Delete Operations

### `deleteOne()`

Removes the first document that matches the filter.

```javascript
db.students.deleteOne({ name: "Rahul" })
```

### `deleteMany()`

Removes every document that matches the filter.

```javascript
db.students.deleteMany({ city: "Dewas" })
```

### Delete every document but keep the collection

```javascript
db.students.deleteMany({})
```

> **Caution:** An empty filter `{}` matches every document. Double-check your condition before deleting data.

---

## 10. Vega City Class Assignment

These examples are templates. Use the actual collection and field names from your class dataset.

```javascript
use vega_city
show collections
db.shops.find()
```

### Find shops by category

```javascript
db.shops.find({ category: "Food" })
```

### Show only selected fields

```javascript
db.shops.find(
  { category: "Food" },
  { name: 1, category: 1, _id: 0 }
)
```

If your collection is not named `shops`, replace `shops` with the collection name used in class.

---

## 11. EMP Collection Practice

The following examples assume an `emp` collection with fields such as `ename`, `job`, `sal`, and `deptno`. String capitalization must match the stored data.

### Find employees earning below 1000

```javascript
db.emp.find({ sal: { $lt: 1000 } })
```

### Find employees earning above 3000

```javascript
db.emp.find({ sal: { $gt: 3000 } })
```

### Find employees earning below 1000 or above 3000

```javascript
db.emp.find({
  $or: [
    { sal: { $lt: 1000 } },
    { sal: { $gt: 3000 } }
  ]
})
```

### Department 20 or salary above 3000

```javascript
db.emp.find({
  $or: [
    { deptno: 20 },
    { sal: { $gt: 3000 } }
  ]
})
```

### Same condition, but exclude clerks

```javascript
db.emp.find({
  $or: [
    { deptno: 20 },
    { sal: { $gt: 3000 } }
  ],
  job: { $ne: "CLERK" }
})
```

### Find employees whose job is not clerk

```javascript
db.emp.find({ job: { $ne: "CLERK" } })
```

### Find employees who are clerks or managers

```javascript
db.emp.find({
  job: { $in: ["CLERK", "MANAGER"] }
})
```

---

## 12. Common Mistakes

### Mistake 1: Using the projection as a filter

Incorrect:

```javascript
db.emp.find(
  { sal: { $gt: 3000 } },
  { job: { $ne: "CLERK" } }
)
```

MongoDB reads the second object as a projection (which fields to show), not as another search condition.

Correct:

```javascript
db.emp.find({
  sal: { $gt: 3000 },
  job: { $ne: "CLERK" }
})
```

### Mistake 2: Incorrect `$or` structure

Incorrect:

```javascript
db.emp.find({
  $or: [
    { deptno: 20 },
    { sal: { $gt: 3000 } }
  ],
  { job: { $ne: "CLERK" } }
})
```

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

Keep one main query object. Add any extra condition as another field inside that same object.

### Mistake 3: Forgetting quotes around strings

```javascript
db.emp.find({ job: "CLERK" })
```

### Mistake 4: Confusing `$or` and `$and`

- `$or`: at least one condition must match.
- `$and`: all conditions must match.
- Different field conditions in the same query object are combined with implicit AND.

### Mistake 5: Forgetting `_id` in projection

```javascript
db.students.find({}, { name: 1 })
```

This includes `_id` by default. Hide it explicitly:

```javascript
db.students.find({}, { name: 1, _id: 0 })
```

---

## 13. Element Operators

Element operators help you check a document's fields, such as whether a field exists or what data type it contains.

### `$exists` — check whether a field exists

Use `$exists: true` to find documents that contain a field. Use `$exists: false` to find documents where that field is missing.

```javascript
db.emp.find({ commission: { $exists: true } })
db.emp.find({ commission: { $exists: false } })
```

**Important:** `$exists` checks whether the field is present, not whether its value is non-null. A field with `null` still exists.

### `$type` — check a field's data type

Use `$type` to find documents where a field has a particular BSON data type.

```javascript
db.students.find({ age: { $type: "string" } })
db.students.find({ age: { $type: "int" } })
db.students.find({ skills: { $type: "array" } })
```

Common type names include `string`, `int`, `double`, `bool`, `date`, `object`, and `array`. The value stored in a field determines whether the document matches.

---

## 14. Evaluation Operators

Evaluation operators let MongoDB check values using expressions or match text patterns.

### `$expr` — compare fields or use expressions

`$expr` allows aggregation expressions to be used inside a query filter. It is useful when comparing the values of two fields in the same document.

```javascript
db.products.find({
  $expr: { $gt: ["$sellingPrice", "$costPrice"] }
})
```

This finds products whose `sellingPrice` is greater than their `costPrice`. The `$` before a field name means MongoDB should use that field's value.

### `$regex` — search for a text pattern

`$regex` finds string values that match a regular expression pattern.

```javascript
// Starts with "A"
db.students.find({ name: { $regex: "^A" } })

// Ends with "a"
db.students.find({ name: { $regex: "a$" } })

// Contains "mit" anywhere in the string
db.students.find({ name: { $regex: "mit" } })

// Case-insensitive match
db.students.find({ name: { $regex: "^a", $options: "i" } })
```

Quick pattern guide:

- `^A` means the string starts with `A`.
- `a$` means the string ends with `a`.
- `mit` means the string contains `mit` anywhere.
- `$options: "i"` makes the match case-insensitive.

Regular expressions can be useful, but broad patterns may be slower on large collections. Use a more specific pattern when possible.

---

## 15. Date Query Practice

MongoDB stores dates as Date values. When searching by date, use `new Date(...)` so that MongoDB compares dates rather than ordinary strings.

### Find employees hired during 1982

```javascript
db.emp.find({
  hiredate: {
    $gte: new Date("1982-01-01"),
    $lt: new Date("1983-01-01")
  }
})
```

- `$gte` includes January 1, 1982.
- `$lt` stops before January 1, 1983.
- This range includes every date in 1982, including December 31.

**Note:** This assumes the field is named `hiredate` and is stored as a MongoDB Date. If your class data uses a different field name or stores dates as strings, adjust the query to match the actual data.

---

## 16. Quick Revision

| Method / Operator | Meaning | Example |
|---|---|---|
| `find()` | Find matching documents | `db.emp.find({})` |
| `findOne()` | Return one matching document | `db.emp.findOne({ deptno: 20 })` |
| `insertOne()` | Insert one document | `db.emp.insertOne({ ename: "A" })` |
| `insertMany()` | Insert multiple documents | `db.emp.insertMany([{ ename: "A" }, { ename: "B" }])` |
| `$eq` | Equal to | `{ sal: { $eq: 1000 } }` |
| `$ne` | Not equal to | `{ job: { $ne: "CLERK" } }` |
| `$gt` | Greater than | `{ sal: { $gt: 1000 } }` |
| `$gte` | Greater than or equal to | `{ sal: { $gte: 1000 } }` |
| `$lt` | Less than | `{ sal: { $lt: 3000 } }` |
| `$lte` | Less than or equal to | `{ sal: { $lte: 3000 } }` |
| `$in` | Match any listed value | `{ job: { $in: ["CLERK", "MANAGER"] } }` |
| `$nin` | Match none of the listed values | `{ job: { $nin: ["CLERK", "MANAGER"] } }` |
| `$and` | All conditions match | `{ $and: [{ deptno: 20 }, { sal: { $gt: 1000 } }] }` |
| `$or` | Any condition matches | `{ $or: [{ deptno: 20 }, { sal: { $gt: 3000 } }] }` |
| `$nor` | None of the conditions match | `{ $nor: [{ deptno: 10 }, { job: "CLERK" }] }` |
| `$not` | Negate a field condition | `{ sal: { $not: { $gt: 3000 } } }` |
| `$exists` | Check whether a field is present | `{ commission: { $exists: true } }` |
| `$type` | Match a field's data type | `{ age: { $type: "int" } }` |
| `$expr` | Compare field values using an expression | `{ $expr: { $gt: ["$sellingPrice", "$costPrice"] } }` |
| `$regex` | Match a text pattern | `{ name: { $regex: "^A" } }` |
| `$set` | Set a field | `{ $set: { sal: 2500 } }` |
| `$inc` | Change numeric value by an amount | `{ $inc: { sal: 500 } }` |
| `$unset` | Remove a field | `{ $unset: { city: "" } }` |
| `$max` | Set only if the supplied value is greater | `{ $max: { sal: 1000 } }` |
| `$min` | Set only if the supplied value is smaller | `{ $min: { sal: 500 } }` |
| `$mul` | Multiply a numeric value | `{ $mul: { sal: 2 } }` |
| `$rename` | Rename a field | `{ $rename: { sal: "salary" } }` |
| `updateOne()` | Update first match | `db.emp.updateOne(filter, update)` |
| `updateMany()` | Update all matches | `db.emp.updateMany(filter, update)` |
| `deleteOne()` | Delete first match | `db.emp.deleteOne(filter)` |
| `deleteMany()` | Delete all matches | `db.emp.deleteMany(filter)` |

---

## 17. Update Operations and Update Operators

Update operations are used to modify existing documents in a collection. An update usually has two parts:

- **Filter:** identifies which document or documents should be updated.
- **Update operator:** tells MongoDB what change to make.

**General syntax:**

```javascript
db.collection.updateOne(
  { filterCondition },
  { updateOperator: { field: newValue } }
)
```

Use the actual collection name and field names from your data. The examples below use the `emp` collection and the employee `SMITH`.

### `updateOne()` — update one matching document

**Definition:** `updateOne()` updates the first document that matches the filter. If several documents match, it updates only one of them.

```javascript
db.emp.updateOne(
  { ename: "SMITH" },
  { $set: { sal: 2500 } }
)
```

- `{ ename: "SMITH" }` is the filter that finds the employee.
- `$set` changes the `sal` field to `2500`.
- If no document matches, no document is updated.

**Use it when:** you want to update one matching document.

### `updateMany()` — update all matching documents

**Definition:** `updateMany()` updates every document that matches the filter.

```javascript
db.emp.updateMany(
  { deptno: 20 },
  { $inc: { sal: 100 } }
)
```

This increases the salary by `100` for every employee in department `20`.

- The filter decides which employees are affected.
- The update operator decides what change is made.
- If no documents match, no document is updated.

**Important:** Check the filter carefully before running `updateMany()`, because multiple documents can change.

### Update operator: `$inc` — increase or decrease a numeric value

**Definition:** `$inc` increases or decreases a numeric field by the specified amount.

```javascript
// Increase SMITH's salary by 1000
db.emp.updateOne(
  { ename: "SMITH" },
  { $inc: { sal: 1000 } }
)

// Decrease SMITH's salary by 800
db.emp.updateOne(
  { ename: "SMITH" },
  { $inc: { sal: -800 } }
)
```

- A positive number increases the value.
- A negative number decreases the value.
- `$inc` is for numeric values. If the field does not exist, MongoDB creates it with the specified increment value.

### Update operator: `$max` — keep the greater value

**Definition:** `$max` updates a field only when the specified value is greater than the field's current value.

```javascript
// Set sal to 1000 only if the current salary is less than 1000
db.emp.updateOne(
  { ename: "SMITH" },
  { $max: { sal: 1000 } }
)
```

For example:

- Current salary `800`, supplied value `1000` → salary becomes `1000`.
- Current salary `1500`, supplied value `1000` → no change.
- Current salary `1000`, supplied value `1000` → no change is needed.

**Remember:** `$max` does not add the supplied number. It keeps the greater of the current and supplied values.

### Update operator: `$min` — keep the smaller value

**Definition:** `$min` updates a field only when the specified value is less than the field's current value.

```javascript
// Set sal to 500 only if the current salary is greater than 500
db.emp.updateOne(
  { ename: "SMITH" },
  { $min: { sal: 500 } }
)
```

For example:

- Current salary `800`, supplied value `500` → salary becomes `500`.
- Current salary `300`, supplied value `500` → no change.
- Current salary `500`, supplied value `500` → no change is needed.

**Remember:** `$min` does not subtract the supplied number. It keeps the smaller of the current and supplied values.

### Update operator: `$mul` — multiply a numeric value

**Definition:** `$mul` multiplies a numeric field by the specified number.

```javascript
// Double SMITH's salary
db.emp.updateOne(
  { ename: "SMITH" },
  { $mul: { sal: 2 } }
)
```

If the salary is `800`, multiplying it by `2` makes it `1600`.

- `$mul: { sal: 2 }` doubles the salary.
- `$mul: { sal: 3 }` triples the salary.
- `$mul: { sal: 0.5 }` makes the salary half its current value.

`$inc`, `$max`, `$min`, and `$mul` are numeric update operators. Use them with fields containing suitable numeric values.

### Update operator: `$set` — add a field or replace its value

**Definition:** `$set` assigns the specified value to a field. It can work with different data types, not just numbers.

```javascript
// Set the salary to 800
db.emp.updateOne(
  { ename: "SMITH" },
  { $set: { sal: 800 } }
)

// Change the employee name
db.emp.updateOne(
  { ename: "SMITH" },
  { $set: { ename: "STEVE" } }
)

// Update more than one field in the same operation
db.emp.updateOne(
  { ename: "SMITH" },
  { $set: { ename: "STEVE", sal: 800 } }
)
```

- If the field exists, `$set` changes its value.
- If the field does not exist, `$set` adds it.
- You can set strings, numbers, Boolean values, arrays, objects, and other supported BSON values.

**Note:** In the second and third examples, the filter finds `SMITH` before changing the name. After the name changes, the same filter `{ ename: "SMITH" }` will not find that document.

### Update operator: `$rename` — rename a field

**Definition:** `$rename` changes a field's name without changing the value stored in that field.

```javascript
db.emp.updateOne(
  { ename: "SMITH" },
  { $rename: { ename: "emp_name", sal: "salary" } }
)
```

This renames `ename` to `emp_name` and `sal` to `salary` in the matching document.

- The left side is the existing field name.
- The right side is the new field name, written as a string.
- `$rename` changes field names; it is not used to change the field's value directly.

**Caution:** If a field with the new name already exists, its value can be replaced as part of the rename. Check your document before using it.

### Update operator: `$unset` — remove a field

**Definition:** `$unset` removes a field from a document. The value provided alongside the field name is ignored; an empty string is commonly used.

```javascript
// Remove the name field from documents where age is 23
db.emp.updateOne(
  { age: 23 },
  { $unset: { name: "" } }
)

// Remove the age field from the first matching document
db.emp.updateOne(
  { age: 23 },
  { $unset: { age: "" } }
)
```

- `$unset` removes the specified field completely.
- It does not just set the field to an empty string.
- The filter `{ age: 23 }` chooses the document; `$unset` decides which field to remove.
- If multiple documents should be changed, use `updateMany()` with the appropriate filter.

### Quick comparison of update operators

| Operator | Definition | Example | Result |
|---|---|---|---|
| `$inc` | Adds or subtracts an amount from a number | `{ $inc: { sal: 100 } }` | Adds 100 to `sal` |
| `$max` | Sets the field only if the new value is greater | `{ $max: { sal: 1000 } }` | Keeps the greater value |
| `$min` | Sets the field only if the new value is smaller | `{ $min: { sal: 500 } }` | Keeps the smaller value |
| `$mul` | Multiplies a numeric field | `{ $mul: { sal: 2 } }` | Doubles `sal` |
| `$set` | Adds a field or changes its value | `{ $set: { sal: 800 } }` | Sets `sal` to 800 |
| `$rename` | Changes a field's name | `{ $rename: { sal: "salary" } }` | Renames `sal` to `salary` |
| `$unset` | Removes a field | `{ $unset: { comm: "" } }` | Removes `comm` |

### Common mistakes to avoid

1. **Confusing `$inc` with `$set`:** `$inc` adds or subtracts an amount; `$set` assigns an exact value.
2. **Confusing `$max` with `$inc`:** `$max` compares two values; it does not add them.
3. **Confusing `$min` with subtraction:** `$min` keeps the smaller value; it does not subtract.
4. **Using `$max` when you mean `$min`:** To keep the lower value, use `$min`.
5. **Forgetting the filter:** Without a specific filter, `updateOne()` can update one arbitrary matching document, while `updateMany({})` can affect every document.
6. **Using the old name after `$rename` or `$set`:** Once a field is renamed or its identifying value is changed, a filter using the old field name or value may no longer match.
7. **Expecting `$unset` to set an empty value:** `$unset` removes the field entirely.

### Quick revision: update methods and operators

- `updateOne(filter, update)` — update the first matching document.
- `updateMany(filter, update)` — update all matching documents.
- `$inc` — increase or decrease a numeric value.
- `$max` — update only if the supplied value is greater.
- `$min` — update only if the supplied value is smaller.
- `$mul` — multiply a numeric value.
- `$set` — add a field or change its value.
- `$rename` — rename a field.
- `$unset` — remove a field.
