const mysql = require("mysql2/promise");

const connection = mysql.createConnection({
  host: "localhost",
  password: "123456",
  user: "root",
  database: "database4",
});

const studentNames = [
  "Siva",
  "Rajesh",
  "Ashok",
  "Sai",
  "Haritha",
  "Ram",
  "Krishna",
  "Anu",
  "Ammu",
  "Adi",
];

async function initializeDatabase() {
  const db = await connection;
  await db.execute(`
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE
    )
  `);
  await db.execute(`
    CREATE TABLE IF NOT EXISTS attendance (
      student_id INT NOT NULL,
      attendance_date DATE NOT NULL,
      status ENUM('Present', 'Absent') NOT NULL,
      PRIMARY KEY (student_id, attendance_date),
      CONSTRAINT fk_attendance_student
        FOREIGN KEY (student_id) REFERENCES students(id)
        ON DELETE CASCADE
    )
  `);
  const [columns] = await db.execute("SHOW COLUMNS FROM students");
  const availableColumns = new Set(columns.map((column) => column.Field));
  const seedColumns = ["name"];
  if (availableColumns.has("email")) seedColumns.push("email");
  if (availableColumns.has("createdAt")) seedColumns.push("createdAt");
  if (availableColumns.has("updatedAt")) seedColumns.push("updatedAt");

  const [existingStudents] = await db.query(
    "SELECT name FROM students WHERE name IN (?)",
    [studentNames]
  );
  const existingNames = new Set(existingStudents.map((student) => student.name));
  const timestamp = new Date();

  for (const name of studentNames) {
    if (existingNames.has(name)) continue;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, ".");
    const values = {
      name,
      email: `attendance-${slug}@example.com`,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    const placeholders = seedColumns.map(() => "?").join(", ");
    const fields = seedColumns.map((column) => `\`${column}\``).join(", ");
    await db.execute(
      `INSERT INTO students (${fields}) VALUES (${placeholders})`,
      seedColumns.map((column) => values[column])
    );
  }
  console.log("Attendance database initialized.");
}

module.exports = { connection, initializeDatabase, studentNames };
