//? Finding hiredate without using new Date
//? $year
// 1. who hired after year 1980
db.emp.aggregate([
    {
        $addFields: {year: {$year: '$hiredate'}}
    },
    {
        $match: {year: {$gt: 1980}}
    }
])

//? $month
// 1. who joined in month of december?
db.emp.aggregate([
    {
        $addFields: {month: {$month: '$hiredate'}}
    },
    {
        $match: {month: 12}
    }
])

//? $dayOfMonth
// 1. who hired on 17th of every month?
db.emp.aggregate([
    {
        $addFields: {day: {$dayOfMonth: '$hiredate'}}
    },
    {
        $match: {day: 17}
    }
])


db.emp.find()
db.emp.find({},{ename: 1, sal: 1})
db.emp.find({},{_id: 0,ename: 1, sal: 1, job: 1})

db.emp.find({$expr:{$gt:["$comm","$sal"]}},{ename:1,comm:1,sal:1})

db.emp.find({$expr:{$gt:["$empno","$mgr"]}},{ename:1,mgr:1,empno:1})

db.emp.find({ename:{$regex:/s/}},{ename:1,sal:1})