//? Self Join
// joining the same collection 
//1. Display employee name and his manager details?
db.emp.aggregate([
    {$lookup: {from: 'emp', localField: 'mgr', foreignField: 'empno', as: 'manager_details'}},
    {$unwind: '$manager_details'},
    {$project: {_id: 0, ename: 1, manager_name: '$manager_details.ename', mgr: 1, empno: '$manager_details.empno'}}
])

//reversing it
db.emp.aggregate([
    {$lookup: {from: 'emp', localField: 'empno', foreignField: 'mgr', as: 'employees' }},
    {$unwind: '$employees'},
    {$project: { _id: 0, manager_name: '$ename', employee_name: '$employees.ename'}}
])
// if we want array of employees under single manager then dont use unwind ?
db.emp.aggregate([
    {$lookup: {from: 'emp', localField: 'empno', foreignField: 'mgr', as: 'employees' }},
    {$project: { _id: 0, manager_name: '$ename', employee_name: '$employees.ename'}}
])


//? Assingment Queries
//1. Display employees's salary along with their manager's salary?
db.emp.aggregate([
    {$lookup: {from: 'emp', localField: 'mgr', foreignField: 'empno', as: 'manager_details'}},
    {$unwind: '$manager_details'},
    {$project: {_id: 0, ename: 1, sal: 1, mgr_name: '$manager_details.ename', mgr_sal: '$manager_details.sal'}} 
])

//2. Find employees whose manager works as manager?
db.emp.aggregate([
    {$lookup: {from: 'emp', localField: 'mgr', foreignField: 'empno', as: 'manager_details'}},
    {$unwind: '$manager_details'},
    {$match: {'manager_details.job': 'manager'}},
    {$project: {_id: 0, ename: 1, job: 1, mgr_name: '$manager_details.ename', mgr_job: '$manager_details.job'}} 
])

//3. Find employees's whose salary is greater than their managers salary?
db.emp.aggregate([
    {$lookup: {from: 'emp', localField: 'mgr', foreignField: 'empno', as: 'manager_details'}},
    {$unwind: '$manager_details'},
    {$match: {$expr: {$gt: ['$sal','$manager_details.sal']}}},
    {$project: {_id: 0, ename: 1, sal: 1, mgr_name: '$manager_details.ename', mgr_sal: '$manager_details.sal'}} 
])

//4. Find employees who work in different department from their manager's department?
db.emp.aggregate([
    {$lookup: {from: 'emp', localField: 'mgr', foreignField: 'empno', as: 'manager_details'}},
    {$unwind: '$manager_details'},
    {$match: {$expr: {$ne: ['$deptno','$manager_details.deptno']}}},
    {$project: {_id: 0, ename: 1, deptno: 1, mgr_name: '$manager_details.ename', mgr_deptno: '$manager_details.deptno'}} 
])

//5. Display employees who directly report to King?
db.emp.aggregate([
    {$lookup: {from: 'emp', localField: 'mgr', foreignField: 'empno', as: 'manager_details'}},
    {$unwind: '$manager_details'},
    {$match: {'manager_details.ename': 'king'}},
    {$project: {_id: 0, ename: 1, mgr_name: '$manager_details.ename'}} 
])

//6. Find employees whose job title is same as their manager's job title?
db.emp.aggregate([
    {$lookup: {from: 'emp', localField: 'mgr', foreignField: 'empno', as: 'manager_details'}},
    {$unwind: '$manager_details'},
    {$match: {$expr: {$eq: ['$job','$manager_details.job' ]}}},
    {$project: {_id: 0, ename: 1, job: 1, mgr_name: '$manager_details.ename', mgr_job: '$manager_details.job'}} 
])

//7. Find employees who earn less than their manager but more than 2000?
db.emp.aggregate([
    {$lookup: {from: 'emp', localField: 'mgr', foreignField: 'empno', as: 'manager_details'}},
    {$unwind: '$manager_details'},
    {$match: {sal:{$gt: 2000}, $expr: {$lt: ['$sal','$manager_details.sal']}}},
    {$project: {_id: 0, ename: 1, sal: 1, mgr_name: '$manager_details.ename', mgr_sal: '$manager_details.sal'}} 
])

//8. Find employees who work in the same department as manager department?
db.emp.aggregate([
    {$lookup: {from: 'emp', localField: 'mgr', foreignField: 'empno', as: 'manager_details'}},
    {$unwind: '$manager_details'},
    {$match: {$expr: {$eq: ['$deptno','$manager_details.deptno']}}},
    {$project: {_id: 0, ename: 1, deptno: 1, mgr_name: '$manager_details.ename', mgr_deptno: '$manager_details.deptno'}} 
])


// Dispalay employees name, manager name and manager's manager name
db.emp.aggregate([
    {$lookup: {from: 'emp', localField: 'mgr', foreignField: 'empno', as: 'manager_details'}},
    {$unwind: '$manager_details'},
    {$lookup: {from: 'emp', localField: 'manager_details.mgr', foreignField: 'empno', as: 'managers_manager_details'}},
    {$unwind: '$managers_manager_details'},
    {$project: {_id: 0, ename: 1, manager_name: '$manager_details.ename',managers_manager_name:'$managers_manager_details.ename', mgr: 1, mgr_empno: '$manager_details.empno', mgr_mgrno: '$manager_details.empno'}}
])

db.emp.aggregate([
    {$lookup: {from: 'emp', localField: 'mgr', foreignField: 'empno', as: 'manager_details'}},
    {$unwind: '$manager_details'},
    {$lookup: {from: 'emp', localField: 'manager_details.mgr', foreignField: 'empno', as: 'managers_manager_details'}},
    {$unwind: '$managers_manager_details'},
    {$project: {_id: 0, employee: '$ename',empno:1, emp_mgr: '$mgr', manager_name: '$manager_details.ename', mgr_empno: '$manager_details.empno', mgr_mgrno: '$manager_details.mgr', managers_manager_name:'$managers_manager_details.ename', mgr_mgr_empno: '$managers_manager_details.empno'}}
])


//Display employees working in dallas whose manager working in new york?
db.emp.aggregate([
    {$lookup: {from: 'dept', localField: 'deptno', foreignField: 'deptno', as: 'deptInfo'}},
    {$unwind: '$deptInfo'},
    {$lookup: {from: 'emp', localField: 'mgr', foreignField: 'empno', as: 'manager_details'}},
    {$unwind: '$manager_details'},
    {$lookup: {from: 'dept', localField: 'manager_details.deptno', foreignField: 'deptno', as: 'manager_deptInfo'}},
    {$unwind: '$manager_deptInfo'},
    {$match: {'deptInfo.loc': 'dallas', 'manager_deptInfo.loc': 'new york'}},
    {$project: {_id: 0, ename: 1, sal: 1, loc: '$deptInfo.loc', mgr_name: '$manager_details.ename', mgr_loc: "$manager_deptInfo.loc"}}
])

// DIsplay employees whose manager's manager belongs to the same department as the employees's manager?
db.emp.aggregate([
    {$lookup: {from: 'emp', localField: 'mgr', foreignField: 'empno', as: 'manager_details'}},
    {$unwind: '$manager_details'},
    {$lookup: {from: 'emp', localField: 'manager_details.mgr', foreignField: 'empno', as: 'managers_manager_details'}},
    {$unwind: '$managers_manager_details'},
    {$match: }
    {$project: {_id: 0, employee: '$ename',empno:1, emp_mgr: '$mgr', manager_name: '$manager_details.ename', mgr_empno: '$manager_details.empno', mgr_mgrno: '$manager_details.mgr', managers_manager_name:'$managers_manager_details.ename', mgr_mgr_empno: '$managers_manager_details.empno'}}
])

// Display employees's whose manager's manager has the same salary as the employee?

// Display employees whose salary is greater than their manager's salary and manager's salary is less than their manager's salary?

// Find employees who joined before their manager but earn more than their manager?
