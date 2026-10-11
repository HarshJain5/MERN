# MongoDB Complete Notes

> Class-wise MongoDB notes in one file. We'll keep adding each new class topic to this same `README.md`.

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
13. [Quick Revision](#13-quick-revision)

---

## 1. Introduction to MongoDB

MongoDB is a **NoSQL, document-oriented database**. It stores data as BSON documents, which are similar to JSON objects.

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

- `show dbs`: displays databases containing data.
- `use college`: switches to the `college` database; it is persisted when data is first stored.
- `db`: shows the current database.
- `show collections`: lists collections in the current database.

---

## 2. Database and Collections

### Create a collection

```javascript
db.createCollection("students")
```

### Create a capped collection

A capped collection has a fixed maximum size and maintains insertion order. When full, older documents may be overwritten by newer ones.

```javascript
db.createCollection("logs", {
  capped: true,
  size: 100000
})
```

- `capped: true` enables capped collection behavior.
- `size` is measured in bytes, not number of documents.

### Drop a collection

```javascript
db.students.drop()
```

> Caution: `drop()` removes the collection and its documents.

---

## 3. Insert Operations

### `insertOne()`

Inserts one document.

```javascript
db.students.insertOne({
  name: "Rahul",
  age: 22,
  city: "Indore"
})
```

### `insertMany()`

Inserts multiple documents.

```javascript
db.students.insertMany([
  { name: "Aman", age: 21, city: "Bhopal" },
  { name: "Priya", age: 22, city: "Indore" },
  { name: "Neha", age: 20, city: "Dewas" }
])
```

**Important points:**
- MongoDB automatically generates `_id` if it is not supplied.
- `_id` uniquely identifies a document within a collection.
- Duplicate `_id` values in the same collection are rejected.
- Strings use quotes; numbers do not.
- Use `:` between a field and its value.

---

## 4. Read Operations

### `find()`

Returns documents matching the filter. An empty filter matches all documents.

```javascript
db.students.find()
db.students.find({})
db.students.find({ city: "Indore" })
db.students.find({ age: 22 })
```

### `findOne()`

Returns one matching document, or `null` if none matches.

```javascript
db.students.findOne()
db.students.findOne({ city: "Indore" })
```

### String comparison

String comparisons are case-sensitive by default in ordinary exact-match queries. For example, `"Indore"` and `"indore"` are different values.

### `find()` cursor

`find()` returns a cursor. The shell displays results in batches, so a large result set may not appear all at once.

---

## 5. Projection

Projection controls which fields appear in the returned documents.

### Include selected fields

```javascript
db.students.find(
  {},
  { name: 1, city: 1 }
)
```

This includes `name`, `city`, and `_id` by default.

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
- `1` means include; `0` means exclude.
- Inclusion and exclusion generally cannot be mixed in one projection, except `_id` may be excluded while other fields are included.
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

### `$eq` — equal to

```javascript
db.emp.find({ sal: { $eq: 2000 } })
```

Equivalent short form:

```javascript
db.emp.find({ sal: 2000 })
```

### `$ne` — not equal to

```javascript
db.emp.find({ job: { $ne: "CLERK" } })
```

Note: `$ne` can also match documents where `job` is missing.

### `$gt` — greater than

```javascript
db.emp.find({ sal: { $gt: 3000 } })
```

### `$gte` — greater than or equal to

```javascript
db.emp.find({ sal: { $gte: 3000 } })
```

### `$lt` — less than

```javascript
db.emp.find({ sal: { $lt: 1000 } })
```

### `$lte` — less than or equal to

```javascript
db.emp.find({ sal: { $lte: 1000 } })
```

### `$in` — matches any value in a list

```javascript
db.emp.find({ job: { $in: ["CLERK", "MANAGER"] } })
```

### `$nin` — matches none of the values in a list

```javascript
db.emp.find({ job: { $nin: ["CLERK", "MANAGER"] } })
```

Note: `$nin` may also match documents where `job` is missing.

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

This condition cannot be true for a normal numeric salary:

```javascript
{ sal: { $lt: 1000, $gt: 3000 } }
```

It asks the same salary to be below 1000 and above 3000 simultaneously.

---

## 7. Logical Operators

### `$and` — all conditions must match

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

### `$or` — at least one condition must match

```javascript
db.emp.find({
  $or: [
    { deptno: 20 },
    { sal: { $gt: 3000 } }
  ]
})
```

### `$nor` — none of the conditions may match

```javascript
db.emp.find({
  $nor: [
    { deptno: 10 },
    { job: "CLERK" }
  ]
})
```

### `$not` — negates a field condition

```javascript
db.emp.find({
  sal: { $not: { $gt: 3000 } }
})
```

This can also match documents where `sal` is missing.

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

**Remember:** `$or` takes an array of condition objects. Conditions placed alongside `$or` in the outer object must also match.

---

## 8. Update Operations

### `updateOne()`

Updates the first matching document.

```javascript
db.students.updateOne(
  { name: "Rahul" },
  { $set: { city: "Bangalore" } }
)
```

### `updateMany()`

Updates all matching documents.

```javascript
db.students.updateMany(
  { city: "Indore" },
  { $set: { city: "Indore City" } }
)
```

### `$set` — set or create a field

```javascript
db.students.updateOne(
  { name: "Aman" },
  { $set: { age: 23 } }
)
```

### `$inc` — increment a numeric value

```javascript
db.emp.updateOne(
  { ename: "SMITH" },
  { $inc: { sal: 500 } }
)
```

### `$unset` — remove a field

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

Deletes the first matching document.

```javascript
db.students.deleteOne({ name: "Rahul" })
```

### `deleteMany()`

Deletes all matching documents.

```javascript
db.students.deleteMany({ city: "Dewas" })
```

### Delete every document but keep the collection

```javascript
db.students.deleteMany({})
```

> **Caution:** `{}` matches all documents. Confirm your filter before deleting data.

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

The second object is interpreted as a projection, not as an additional filter.

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

The outer query must be one object. Put additional conditions as properties of that object.

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

## 13. Quick Revision

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
