//? Projection
// Projection is used to select specific fields from the documents in a collection.
// By default, MongoDB returns all fields of a document.
// To specify which fields to include or exclude, we use projection.

// Syntax:
// db.collection.find({query}, {projection})

// Example:
// db.emp.find({deptno:20 }, {ename: 1, sal: 1})  // it will return only ename and sal fields.
// db.emp.find({}, {ename: 1, sal: 1, _id: 0})  // it will return only ename and sal fields and exclude _id field.
// db.emp.find({}, {ename: 1, sal: 1, _id: 0})  // it will return only ename and sal fields and exclude _id field.  