const { Pool } = require('pg');
const process = require('process');

// const pool = new Pool();
const pool = new Pool({
  user: 'T904812',
  password: '',
  host: 'localhost',
  database: 'bootcampx'
});

// Querying The Database
pool.query(`
SELECT id, name, cohort_id
FROM students
LIMIT 5;
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_id} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));



// Querying The Database
pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
LIMIT 5;
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));



//Query Parameters

// const [nodeVer, file, cohort, MaxNumResult] = process.argv;

// pool.query(`
// SELECT students.id as student_id, students.name as name, cohorts.name as ${cohort}
// FROM students
// JOIN cohorts ON cohorts.id = cohort_id
// WHERE cohortsname = '%${cohort}%'
// LIMIT ${MaxNumResult});
// `)
// .then(res => {
//   res.rows.forEach(user => {
//     console.log(`${user.name} has an id of ${user.student_id} and was in the ${cohort} cohort`);
//   })
// })
// .catch(err => console.error('query error', err.stack));

// compass answer
pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
LIMIT ${process.argv[3] || 5};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack));