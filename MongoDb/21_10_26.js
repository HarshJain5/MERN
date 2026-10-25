//? $lookup
// lookup is used to merge data or retrieve data from multiple tables simultaneously.
// Syntax: 
db.cn.aggregate([
    {
        $lookup: {
            from: 'target cn',
            localField: 'common field',
            foreignField: 'common field',
            as: 'dept_info' // aliasing name
        }
    },
])

db.emp.aggregate([
    {
        $lookup: {
            from: 'dept',
            localField: 'deptno',
            foreignField: 'deptno',
            as: 'dept_info' // aliasing name
        }
    },
    {
        $project: {
            _id: 0, 
            ename: 1,
            dname: '$dept_info.dname'
            // "dept_info.dname": 1
        }
    },
])


db.dept.aggregate([
    {
        $lookup: {
            from: 'emp',
            localField: 'deptno',
            foreignField: 'deptno',
            as: 'emp_info' // aliasing name
        }
    },
    {
        $unwind: '$emp_info'
    },
    {
        $group: {
            _id: '$dname',
        }
    },
    {
        $project: {
            _id: 0, 
            dname: 1,
            ename: '$emp_info.ename'
        }
    },
    {
        $limit: 1
    }
])


db.emp.aggregate([
    {
        $lookup: {
            from: 'dept',
            localField: 'deptno',
            foreignField: 'deptno',
            as: 'dept_info' // aliasing name
        }
    },
    {
        $unwind: '$dept_info'
    },
    {
        $project: {
            ename: 1,
            dname: '$dept_info.dname'
            // "dept_info.dname": 1
        }
    },
])


//? Queries
//1. display departmnet name of all salesman?
db.emp.aggregate([
    {$match: {job: 'salesman'}},
    {$lookup: {
        from: 'dept',
        localField: 'deptno',
        foreignField: 'deptno',
        as: 'dept_info'
    }
    },
    {
        $unwind: '$dept_info'
    },
    {
        $project: {
            _id: 0,
            ename: 1,
            job: 1,
            dname: '$dept_info.dname'
        }
    }
])

//2. find enmae working in dallas
db.emp.aggregate([
    {$lookup: {
        from: 'dept',
        localField: 'deptno',
        foreignField: 'deptno',
        as: 'dept_info'
    }
    },
    {
        $unwind: '$dept_info'
    },
    {$match: {'dept_info.loc': 'dallas'}},
    {
        $project: {
            _id: 0,
            ename: 1,
            loc: '$dept_info.loc'
        }
    }
])

db.dept.aggregate([
    {$match: {loc: 'dallas'}},
    {$lookup: {
        from: 'emp',
        localField: 'deptno',
        foreignField: 'deptno',
        as: 'emp_info'
    }
    },
    {
        $unwind: '$emp_info'
    },
    {
        $project: {
            _id: 0,
            dname: 1,
            loc: 1,
            ename: '$emp_info.ename'
        }
    }
])


//? Assignment Queries
//1. Display employee whose department name starts with the letter s?
db.emp.aggregate([
    {$lookup: {
        from: 'dept',
        localField: 'deptno',
        foreignField: 'deptno',
        as: 'dept_info'
    }},
    {
        $unwind: '$dept_info'
    },
    {
        $match: {'dept_info.dname': {$regex: /^s/}}
    },
    {
        $project: {
            _id: 0,
            ename: 1,
            dname: '$dept_info.dname'
        }
    }
])

//2. Display the average salary of employee in each department?
db.emp.aggregate([
    {$lookup: {from: 'dept', localField: 'deptno', foreignField: 'deptno', as: 'deptInfo'}},
    {$unwind: '$deptInfo'},
    {$group: {_id: '$deptInfo.dname', avgSal: {$avg: '$sal'}}},
    {$project: {_id: 0, dname: '$_id', avgSal: 1}}
])

//3. Display employees earning more than 2000 along with their department name?
db.emp.aggregate([
    {$match: {sal: {$gt: 2000}}},
    {$lookup: {from: 'dept', localField: 'deptno', foreignField: 'deptno', as: 'deptInfo'}},
    {$unwind: '$deptInfo'},
    {$project: {_id: 0, ename: 1, sal: 1, dname: '$deptInfo.dname'}}
])

//4. Display employees working in dallas who earn more than 2000?
db.emp.aggregate([
    {$lookup: {from: 'dept', localField: 'deptno', foreignField: 'deptno', as: 'deptInfo'}},
    {$unwind: '$deptInfo'},
    {$match: {sal: {$gt: 2000}, 'deptInfo.loc': 'dallas'}},
    {$project: {_id: 0, ename: 1, sal: 1, loc: '$deptInfo.loc'}}
])

//5. Display employees working in dallas or chicago?
db.emp.aggregate([
    {$lookup: {from: 'dept', localField: 'deptno', foreignField: 'deptno', as: 'deptInfo'}},
    {$unwind: '$deptInfo'},
    {$match: {'deptInfo.loc': {$in: ['new york','chicago']}}},
    {$project: {_id: 0, ename: 1, sal: 1, loc: '$deptInfo.loc'}}
])

//6. Display employees who earn more than their department's average salary?
db.emp.aggregate([
    {$lookup: {from: 'dept', localField: 'deptno', foreignField: 'deptno', as: 'deptInfo'}},
    {$unwind: '$deptInfo'},
    {$group: {_id: '$deptInfo.dname', avgSal: {$avg: '$sal'}, sal: {$push: '$sal'}, ename: {$push: '$ename'}}},
    {$match: {$expr: { $gt: ["$sal", "$avgSal"]}}},
    {$project: {_id: 0, dname: '$_id', avgSal: 1, sal: 1, ename: 1}}
]) 
// it will give you array of ename and array of sal so instead of this use below query
db.emp.aggregate([
    {$lookup: {from: 'dept', localField: 'deptno', foreignField: 'deptno', as: 'deptInfo'}},
    {$unwind: '$deptInfo'},
    {$group: {_id: '$deptInfo.dname', avgSal: {$avg: '$sal'}, employees: {$push: {ename: '$ename', sal: '$sal'}}}},
    {$unwind: '$employees'},
    {$match: { $expr: { $gt: ["$employees.sal", "$avgSal"] }}},
    {$project: {_id: 0, dname: '$_id', avgSal: 1, sal: '$employees.sal', ename: '$employees.ename'}}
])
//pushing all details of employee at a time use $$ROOT
db.emp.aggregate([
    {$lookup: {from: 'dept', localField: 'deptno', foreignField: 'deptno', as: 'deptInfo'}},
    {$unwind: '$deptInfo'},
    {$group: {_id: '$deptInfo.dname', avgSal: {$avg: '$sal'}, employees: {$push: '$$ROOT'}}},
    {$unwind: '$employees'},
    {$match: { $expr: { $gt: ["$employees.sal", "$avgSal"] }}},
    {$project: {_id: 0, dname: '$_id', avgSal: 1, sal: '$employees.sal', ename: '$employees.ename'}}
])
//it will also solve by using self join


db.emp.aggregate([
    {$group: {_id: '$deptno', avgSal: {$avg: '$sal'}}},
    {
        $lookup: {
            from: "emp",
            localField: "_id",
            foreignField: "deptno",
            as: "employees"
        }
    },
    {$unwind: '$employees'},
    {$match: { $expr: { $gt: ["$employees.sal", "$avgSal"] }}},
    {$project: {_id: 0, deptno: '$_id', avgSal: 1, sal: '$employees.sal', ename: '$employees.ename'}}
])

db.emp.aggregate([
    
    
    // Step 3: Self-joined array ki help se average salary nikal lo
    {
        $set: {
            avgSal: { $avg: "$dept_colleagues.sal" }
        }
    },
    // Step 4: Match karo jahan employee ki salary department ki average se zyada ho
    {
        $match: {
            $expr: { $gt: ["$sal", "$avgSal"] }
        }
    },
    // Step 5: Clean projection
    {
        $project: {
            _id: 0,
            ename: 1,
            sal: 1,
            dname: "$dept_info.dname",
            avgSal: 1
        }
    }
])

//7. Display departments with an average salary greater than 2000?
db.emp.aggregate([
    {$lookup: {from: 'dept', localField: 'deptno', foreignField: 'deptno', as: 'deptInfo'}},
    {$unwind: '$deptInfo'},
    {$group: {_id: '$deptInfo.dname', avgSal: {$avg: '$sal'}}},
    {$match: {avgSal: {$gt: 2000}}},
    {$project: {_id: 0, dname: '$_id', avgSal: 1, sal: 1}}
])




