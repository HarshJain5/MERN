// 1. Find avg sal of each dept except deptno 10?
db.emp.aggregate([
    { $match: {
        deptno: {$ne:10}
    },
    },
    {
      $group: {
        _id: "$deptno",
        avgSal: {$avg: "$sal"}
      },  
    },
    {
        $project: {
            _id: 0,
            deptno: '$_id',
            avgSal: 1,
        }
    }
])

//2. Find the total salary paid to employee working as manager?
db.emp.aggregate([
    { $match: {job: {$eq: 'manager'}}},
    { $group: {
        _id: '$job',
        totalSal: {$sum: '$sal'},
    }
    },
    { $project: {
        _id:0,
        job: '$_id',
        totalSal: 1,
    }}
])

//3. find the number of employees in each dept who earn more than 2000?
db.emp.aggregate([
    {$match: {sal: {$gt: 2000}}},
    {$group: {_id: '$deptno', totalEmp: {$count: {}}}},
    {$project: {_id: 0, deptno: '$_id',totalEmp: 1}}
])

//4. calculate avg sal for each job role, considering employees hired before january 1, 1982?
db.emp.aggregate([
    {$match: {hiredate: {$lt: new Date('1982-01-01')}}},
    {$group: {_id: '$job',avgSal: {$avg: '$sal'}}},
    {$project: {_id: 0, job: '$_id', avgSal:1}}
])


//5. find the avg sal for each department, excluding employees where job is clerk?
db.emp.aggregate([
    {$match: {job: {$ne: 'clerk'}}},
    {$group: {_id: '$deptno', avgSal: {$avg: '$sal'}}},
    {$project: {_id:0, deptno: '$_id', avgSal: 1}}
])

//6. calculate the total sal for each dept for employees hired before january 1, 1982?
db.emp.aggregate([
    {$match: {hiredate: {$lt: new Date('1982-01-01')}}},
    {$group: {_id: '$deptno', totalSal: {$sum: '$sal'}}},
    {$project: {_id:0, deptno: '$_id', totalSal:1}}
])

//7. count the employees in each job role whose sal is between 1000 and 3000
db.emp.aggregate([
    {$match: {sal: {$gt:1000, $lt: 3000}}},
    {$group: {_id: '$job', totalEmp: {$count: {}}}},
    {$project: {_id:0, job: '$_id', totalEmp:1}}
])

//? Part:- 2
// 1. Find departments whose minimum employee salary is greater than 1000?
db.emp.aggregate([
    {$group: {_id: '$deptno',minSal: {$min: '$sal'}}},
    {$match: {minSal: {$gt: 1000}}},
    {$project: {_id: 0, deptno: '$_id', minSal: 1}}
])

// 2. Find job roles whose avg sal is greater than 2000?
db.emp.aggregate([
    {$group: {_id: '$job',avgSal: {$avg: '$sal'}}},
    {$match: {avgSal: {$gt: 2000}}},
    {$project: {_id: 0, job: '$_id'}}
])

//3. Display departments whose avg emlployee salry exceeds 2000?
db.emp.aggregate([
    {$group: {_id: '$deptno', avgSal: {$avg: '$sal'}}},
    {$match: {avgSal: {$gt: 2000}}},
    {$project: {_id: 0, deptno: '$_id'}}
])
// -> to check
db.emp.aggregate([
    {$group: {_id: '$deptno', avgSal: {$avg: '$sal'}}},
    {$project: {_id: 0, deptno: '$_id', avgSal:1}}
])

//4. Find Departments whose total salary exceeds 5000, considering employees earning more than 1000
db.emp.aggregate([
    {$match: {sal: {$gt: 1000}}},
    {$group: {_id: '$deptno', totalSal: {$sum: '$sal'}}},
    {$match: {totalSal: {$gt: 5000}}},
    {$project: {_id: 0, deptno: '$_id'}}
])
// -> To check
db.emp.aggregate([
    {$match: {sal: {$gt: 1000}}},
    {$group: {_id: '$deptno', totalSal: {$sum: '$sal'}}},
    {$match: {totalSal: {$gt: 5000}}},
    {$project: {_id: 0, deptno: '$_id', totalSal: 1}}
])

//5. Find job roles whose average sal exceeds 2000, considering employees hired in after january 1, 1981?
db.emp.aggregate([
    {$match: {hiredate: {$gt: new Date('1981-01-01')}}},
    {$group: {_id: '$job',avgSal: {$avg: '$sal'}}},
    {$match: {avgSal: {$gt: 2000}}},
    {$project: {_id: 0, job: '$_id'}}
])
// -> To check
db.emp.aggregate([
    {$match: {hiredate: {$gt: new Date('1981-01-01')}}},
    {$group: {_id: '$job',avgSal: {$avg: '$sal'}}},
    {$project: {_id: 0, job: '$_id', avgSal:1}}
])

//6. Find Departments with more than 2 employees, considering employees whose job is not clerk?
db.emp.aggregate([
    {$match: {job: {$ne: 'clerk'}}},
    {$group: {_id: '$deptno', totalEmp: {$count: {}}}},
    {$match: {totalEmp: {$gte: 2}}},
    {$project: {_id: 0, deptno: '$_id'}}
])
//  -> To check
db.emp.aggregate([
    {$match: {job: {$ne: 'clerk'}}},
    {$group: {_id: '$deptno', totalEmp: {$count: {}}}},
    {$project: {_id: 0, deptno: '$_id', totalEmp: 1}}
])

//7. Find the jobs whose total sal exceeds 4000 considering employees only on department 10 and 20?
db.emp.aggregate([
    {$match: {deptno: {$in: [10, 20]}}},
    {$group: {_id: '$job', totalSal: {$sum: '$sal'}}},
    {$match: {totalSal: {$gt: 4000}}},
    {$project: {_id: 0, job: '$_id'}}
])
// -> To check
db.emp.aggregate([
    {$match: {deptno: {$in: [10, 20]}}},
    {$group: {_id: '$job', totalSal: {$sum: '$sal'}}},
    {$project: {_id: 0, job: '$_id', totalSal: 1}}
])

//8. Find deparments whose avg sal exceeds 2500, considering only employees earning more than 1000?
db.emp.aggregate([
    {$match: {sal: {$gt: 1000}}},
    {$group: {_id: '$deptno', avgSal: {$avg: '$sal'}}},
    {$match: {avgSal: {$gt: 2500}}},
    {$project: {_id: 0, deptno: '$_id'}}
])

db.emp.aggregate([
    {$match: {sal: {$gt: 1000}}},
    {$group: {_id: '$deptno', avgSal: {$avg: '$sal'}}},
    {$project: {_id: 0, deptno: '$_id',avgSal: 1}}
])




//? lookup
db.emp.aggregate([
    {
        $lookup: {
            from: 'dept',
            localField: 'deptno',
            foreignField: 'deptno',
            as: 'dept_info'
        }
    },
    {
        $unwind: "$dept_info" 
    },
    {
        $project: {
            _id: 0,
            ename: 1,
            sal: 1,
            dname: "$dept_info.dname", 
            loc: "$dept_info.loc"
        }
    }
])

//2. Find all employees who work in the 'RESEARCH' department
db.emp.aggregate([
    {$lookup: {from: 'dept', localField: 'deptno', foreignField: 'deptno', as: 'dept_info'}},
    {$unwind: "$dept_info"},
    {$match: {'dept_info.dname': {$eq: 'research'}}},
    {$project: {_id: 0,ename: 1,sal: 1,dname: "$dept_info.dname",loc: "$dept_info.loc"}}
])

// 3. Display employee name (ename) and department name (dname) for only those employees who belong to a valid department.
db.emp.aggregate([
    {$lookup: {from: 'dept', localField: 'deptno', foreignField: 'deptno', as: 'deptInfo'}},
    {$unwind: '$deptInfo'},
    {$project: {_id: 0, ename: 1, dname: '$deptInfo.dname'}}
])

//4. List all employees, including their name and department name. If a department is missing, show it gracefully as "No Department" instead of disappearing?
db.emp.aggregate([
    {$lookup: {from: 'dept', localField: 'deptno', foreignField: 'deptno', as: 'deptInfo'}},
    {$unwind: {path: '$deptInfo', preserveNullAndEmptyArrays: true}},
    {$project: {_id: 0, ename: 1, dname: {$ifNull: ['$deptInfo.dname','No Department']}}}
])

db.emp.aggregate([
    {$lookup: {from: 'dept', localField: 'deptno', foreignField: 'deptno', as: 'deptInfo'}},
    {$unwind: {path: '$deptInfo', preserveNullAndEmptyArrays: true}},
    {$project: {_id: 0, ename: 1, dname: '$deptInfo.dname'}}
])

db.dept.aggregate([
    {$lookup: {from: 'emp', localField: 'deptno', foreignField: 'deptno', as: 'deptInfo'}},
    {$unwind: {path: '$deptInfo', preserveNullAndEmptyArrays: true}},
    {$project: {_id: 0, dname: 1, ename: {$ifNull: ['$deptInfo.ename','No Employee']}}}
])

//5. Find the total salary expenditure for each department name (dname) instead of department number (deptno)
db.emp.aggregate([
    {$lookup: {from: 'dept', localField: 'deptno', foreignField: 'deptno', as: 'deptInfo'}},
    {$unwind: '$deptInfo'},
    {$group: {_id: '$deptInfo.dname',totalSal: {$sum: '$sal'}}},
    {$project: {_id: 0, ename:1 , dname: '$_id', deptno: 1, totalSal: 1}}
])

//6. Find the names of all employees who work in the 'SALES' department and earn a salary greater than 1500?
db.emp.aggregate([
    {$lookup: {from: 'dept', localField: 'deptno', foreignField: 'deptno', as: 'deptInfo'}},
    {$unwind: '$deptInfo'},
    {$match: {'deptInfo.dname': {$eq: "sales"}, sal: {$gte: 1500}}},
    {$project: {_id: 0, ename:1 ,sal: 1,dname: '$deptInfo.dname'}}
])