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

---

## 1. Introduction to MongoDB

**MongoDB is a NoSQL database** used to store and manage data. Instead of storing data in rows and columns like a traditional SQL table, MongoDB stores it in **documents**. These documents look similar to JSON objects. MongoDB stores them internally in a format called BSON.

### SQL vs MongoDB terminology

| SQL | MongoDB |
|---|---|
| Database | Database |
| Table | Collection |
| Row / Record | Document |
| Column | Field |
| `SELECT` | `find()` |
| `INSERT` | `insertOne()` / `insertMany()` |
| `UPDATE` | `updateOne()` / `updateMany()` |
| `DELETE` | `deleteOne()` / `deleteMany()` |

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
| `updateOne()` | Update first match | `db.emp.updateOne(filter, update)` |
| `updateMany()` | Update all matches | `db.emp.updateMany(filter, update)` |
| `deleteOne()` | Delete first match | `db.emp.deleteOne(filter)` |
| `deleteMany()` | Delete all matches | `db.emp.deleteMany(filter)` |

---

## New Topics — Add Below

Add each new class topic here as a new numbered section. If a new major topic is added, also add it to the Table of Contents above.
