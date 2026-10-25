// ? Pipeline  {Same as Subquery is sql}


// Display employees whose salary is same as scott?
db.emp.aggregate([
    {$match: {ename: 'scott'}},
    {$lookup: { from: 'emp', 
        let: {scottSal: '$sal' ,scottId: '$_id'}, 
        pipeline: [{
            $match: {
                $expr: {$and: [{$eq: ['$$scottSal', '$sal']}, {$ne: ['$$scottId', '$_id']}]}}}], as: "same_as_scott_sal"}}
])

db.emp.aggregate([
    {$match: {ename: 'smith'}},
    {$lookup: { from: 'emp', 
        let: {smithHiredyear: '$year' ,scottId: '$_id'}, 
        pipeline: [{
            $match: {
                $expr: {$and: [{$eq: ['$$scottSal', '$sal']}, {$ne: ['$$scottId', '$_id']}]}}}], as: "same_as_scott_sal"}}
])

// Display employees who joined in the same year as smith?
 db.emp.aggregate([
    {$match: {ename: 'adams'}},
    {$lookup: {from: 'emp', let: {year: {$year: "$hiredate"}, smith_Id: '$_id'}, pipeline: [{ $match: {$expr: {$and: [{$eq: ['$$year',{$year: '$hiredate'}]},{$ne: ['$$smith_Id', '$_id']}]}}}], as: 'same_as_smith_year'}},
 ])

// Display employee who have the same job as allen but in a different department? 
db.emp.aggregate([
    {$match: {ename: 'smith'}},
    {$lookup: { from: 'emp', 
        let: {allenJob: '$job' ,allenId: '$_id', allenDept: '$deptno' }, 
        pipeline: [{
            $match: {
                $expr: {$and: [{$eq: ['$$allenJob', '$job']}, {$ne: ['$$allenId', '$_id']}, {$ne: ['$$allenDept', '$deptno']}]}}}], as: "same_as_scott_job"}}
])

// Display employees who work in the same departmnet as blake but have a different job ?
db.emp.aggregate([
    {$match: {ename: 'smith'}},
    {$lookup: { from: 'emp', 
        let: {allenJob: '$job' ,allenId: '$_id', allenDept: '$deptno' }, 
        pipeline: [{
            $match: {
                $expr: {$and: [{$ne: ['$$allenJob', '$job']}, {$ne: ['$$allenId', '$_id']}, {$eq: ['$$allenDept', '$deptno']}]}}}], as: "same_as_scott_job"}}
])
