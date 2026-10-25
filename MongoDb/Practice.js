
// use companyDB

// db.employees.insertMany([
//   { id: 1, name: "Rahul", dept: "IT", salary: 50000, age: 25 },
//   { id: 2, name: "Sneha", dept: "HR", salary: 35000, age: 28 },
//   { id: 3, name: "Amit", dept: "IT", salary: 60000, age: 30 },
//   { id: 4, name: "Priya", dept: "Finance", salary: 45000, age: 27 },
//   { id: 5, name: "Kiran", dept: "HR", salary: 40000, age: 24 },
//   { id: 6, name: "John", dept: "IT", salary: 55000, age: 29 }
// ])

// 1. Find the employee with the highest salary.
// db.employees.find().sort({salary: -1}).limit(1)

// 2. Find the employee with the second-highest salary.
// db.employees.find().sort({salary: -1}).skip(1).limit(1)

// 3. Find the employee with the lowest salary.

// 4. Find all employees belonging to the IT department.
// db.employees.find({dept:{$eq: 'IT'}})

// Group employees by department.

// Count the number of employees in each department.

// Find the total salary paid by each department.

// Find the average salary of each department.

// Find employees earning more than the average salary.

// Find the highest-paid employee in each department.

// Find the youngest employee in each department.

// Sort employees by salary (descending), then by age (ascending).
// db.employees.find().sort({salary: -1,age: 1})

// Remove duplicate employees based on id.

// Find employees whose names start with a vowel.

// Find employees whose names contain exactly 5 characters.
// db.employees.find({name:{$regex:"^.{5}$"}})

// Find all departments without duplicates. 
// db.employees.find({name: { $regex: "^[AEIOU]" }})



// db.emp.aggregate([
//     {$match: {$and: [{sal:{$gt:2000}},{deptno: {$in:[10,20]}}]}},
//     {$project: {_id:0,ename:1,sal:1,deptno:1}}
// ])

// db.emp.aggregate([
//     {$match:  {sal:{$gt:2000},deptno: {$in:[10,20]}}},
//     {$project: {_id:0,ename:1,sal:1,deptno:1}}
// ])