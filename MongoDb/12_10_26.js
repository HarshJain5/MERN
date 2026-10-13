//?3. Element operators
// Element operators are used to access and manipulate elements in data structures like arrays, lists, or objects. 
// They allow you to retrieve, modify, or remove specific elements based on their index or key. 
// Common element operators include:
// 1. $type: This operator is used to determine the type of an element in a data structure. 
// It can be used to check if an element is a string, number, object, array, etc.
//example: Query: { field: { $type: "string" } } // This query checks if the 'field' is of type string.
// 
// 2. $exists: This operator checks if a specific element exists in a data structure. 
// It returns true if the element is present and false otherwise.
// example: Query: { field: { $exists: true } } // This query checks if the 'field' exists in the document.


//? 4. Evaluation operators
// Evaluation operators are used to evaluate expressions and perform calculations or comparisons. 
// They allow you to manipulate data and derive new values based on existing elements.  
// Common evaluation operators include:
// 1. $expr: This operator allows you to evaluate expressions using aggregation expressions.
// It can be used to perform calculations, comparisons, or logical operations on elements in a data structure.
// example: Query: { $expr: { $gt: ["$field1", "$field2"] } } // This query checks if 'field1' is greater than 'field2'.
// 2. $regex: This operator is used to perform regular expression matching on string elements.
// It can be used to search for patterns within string values and filter documents based on those patterns.
// example: Query: { field: { $regex: "^pattern" } } // This query checks if the 'field' starts with the specified pattern.
// example: Query: { field: { $regex: ".*pattern$/" } }to match ending with characters
// example: Query: { field: { $regex: /pattern/ } } // This query checks if the 'field' contains the specified pattern. Not recommmended
// example: Query: { field: { $regex: /.*pattern.*/ } } check whetehr in string this specific char present or not


//? 





















