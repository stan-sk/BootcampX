const { Pool } = require('pg');
const process = require('process');

// const pool = new Pool();
const pool = new Pool({
  user: 'T904812',
  password: '',
  host: 'localhost',
  database: 'bootcampx'
});

// Name of Teachers That Assisted

// const [nodeVer, file, cohort] = process.argv;

// pool.query(`
// SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
// FROM teachers
// JOIN assistance_requests ON teacher_id = teachers.id
// JOIN students ON student_id = students.id
// JOIN cohorts ON cohort_id = cohorts.id
// WHERE cohorts.name = '${cohort}'
// ORDER BY teacher;
// `)
// .then(res => {
//   res.rows.forEach(user => {
//     console.log(`${cohort} : ${user.teacher}`);
//   })
// })
// .catch(err => console.error('query error', err.stack));

// compass answer
// pool.query(`
// SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
// FROM teachers
// JOIN assistance_requests ON teacher_id = teachers.id
// JOIN students ON student_id = students.id
// JOIN cohorts ON cohort_id = cohorts.id
// WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
// ORDER BY teacher;
// `)
// .then(res => {
//   res.rows.forEach(row => {
//     console.log(`${row.cohort}: ${row.teacher}`);
//   })
// });




// SQL injection

const cohortName = process.argv[2] || 'JUL02';
const values = [`${cohortName}`];

const queryString = (`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teacher;
`)

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
});