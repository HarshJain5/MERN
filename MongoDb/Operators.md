OPERATORS....
1. QUERY Operator
	Queries
	1. db.emp.find({ename:{$eq:'allen'}})
    2. db.emp.find({sal:{$lt:3000}})
    3. db.emp.find({ename:{$ne:'king'}})
    4. db.emp.find({sal:{$in:[3000,800]}})

    Assignment Queries
    1. db.emp.find({sal:{$gt:2500}})
    2. db.emp.find({sal:{$lt:1250}})
    3. db.emp.find({sal:{$gte:3000}})
    4. db.emp.find({sal:{$lte:1500}})
    5. db.emp.find({job:{$eq:'manager'}})
    6. db.emp.find({job:{$ne:'salesman'}})
    7. db.emp.find({deptno:{$in:[10, 20, 30]}})
    8. db.emp.find({deptno:{$nin:[10, 20]}})
    9. db.emp.find({job:{$in:['clerk','analyst']}})
    10. db.emp.find({sal:{$gt:2000}},{deptno:{$eq:20}})
    11. db.emp.find({sal:{$lte:5000,$gte:3000}})
    12. db.emp.find({sal:{$gte:2999, $lte:5001}})

2. LOGICAL Operator
    Queries
    1. db.emp.find({$and: [{sal: {$gt:2000}},{deptno: {$eq: 20}}]})
    2. db.emp.find({$or: [{sal: {$gt:2000}},{deptno: {$eq: 20}}]})
    3. db.emp.find({$nor: [{sal: {$gt:2000}},{deptno: {$eq: 20}}]})
    4. db.emp.find({$not: {sal: {$lt: 2000}}})

    Assignment Queries (Query or Logical Operator mixed)
    1. db.emp.find({$and: [{sal: {$gt: 2000}}, {deptno: {$in: [10, 20]}}]})
    2. db.emp.find({$and: [{sal: {$gt: 2000}}, {job: {$in: ['clerk', 'salesman']}}]})
    3. db.emp.find({$and: [{deptno: {$eq: 20}}, {sal: {$ne: 3000}}]})
    4. db.emp.find({sal: {$gte: 2000, $lte: 3000}})
    5. db.emp.find({$and: [{deptno: {$in: [10, 20, 30]}}, {job: {$ne: 'manager'}}]})
    6. db.emp.find({$and: [{sal: {$gt: 2000}}, {deptno: {$in: [10, 20]}}]})
    7. db.emp.find({sal: {$lt: 1000, $gt: 3000}})
    8. db.emp.find({$and: [{deptno: {$nin: [10, 20]}}, {sal: {$gt: 1000}}]})
    9. db.emp.find({$and: [{sal: {$gt: 2000}}, {job: {$in: ['Manager', 'clerk']}}]})
    10. db.emp.find({$or: [{deptno: {$eq: 20}},{sal: {$gt: 3000}}],job: {$ne: 'clerk'}})
    11. db.emp.find({$and: [{sal: {$gte: 1250, $lte: 3000}},{deptno: {$ne: 10}}]}) 
    12. db.emp.find({$or: [{job:'salesman',deptno:30},{job:'analyst',deptno:20}]})
    13. db.emp.find({sal: {$gte: 1500, $lte: 3000}})

