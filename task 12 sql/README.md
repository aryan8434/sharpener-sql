# Task 12 SQL - Student-Course Associations

This task defines Sequelize models for students, identity cards, departments, courses, and the `StudentCourses` join table.

## Associations

- One-to-one: `Student` has one `IdentityCard`
- One-to-many: `Department` has many `Student`
- Many-to-many: `Student` belongs to many `Course` through `StudentCourse`

## Run

```powers
cd "task 12 sql"
node index.js
```

Open `http://localhost:4000/students` to view the seeded student, identity card, department, and courses.
