const express = require("express");
const path = require("path");
const { connection, initializeDatabase, studentNames } = require("./db/db");
const app = express();

app.use(express.json());

function isValidDate(date) {
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return false;
  }
  const parsedDate = new Date(`${date}T00:00:00.000Z`);
  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === date
  );
}

function requireDate(req, res, next) {
  const date =
    req.method === "POST" ? req.body && req.body.date : req.query.date;
  if (!isValidDate(date)) {
    return res
      .status(400)
      .json({ error: "Provide a valid date in YYYY-MM-DD format." });
  }
  req.attendanceDate = date;
  next();
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/students", requireDate, async (req, res, next) => {
  try {
    const db = await connection;
    const [students] = await db.query(
      `SELECT students.id, students.name, attendance.status
       FROM students
       LEFT JOIN attendance
         ON attendance.student_id = students.id
        AND attendance.attendance_date = ?
       WHERE students.name IN (?)
       ORDER BY students.id`,
      [req.attendanceDate, studentNames],
    );
    res.json({ date: req.attendanceDate, students });
  } catch (error) {
    next(error);
  }
});

app.get("/api/attendance/report", requireDate, async (req, res, next) => {
  try {
    const db = await connection;
    const [students] = await db.query(
      `SELECT students.id, students.name, attendance.status
       FROM students
       LEFT JOIN attendance
         ON attendance.student_id = students.id
        AND attendance.attendance_date = ?
       WHERE students.name IN (?)
       ORDER BY students.id`,
      [req.attendanceDate, studentNames],
    );
    res.json({ date: req.attendanceDate, students });
  } catch (error) {
    next(error);
  }
});

app.post("/api/attendance", requireDate, async (req, res, next) => {
  try {
    const db = await connection;
    const { attendance } = req.body;
    if (!Array.isArray(attendance)) {
      return res
        .status(400)
        .json({ error: "Attendance must be a list of student statuses." });
    }

    const [students] = await db.query(
      "SELECT id FROM students WHERE name IN (?)",
      [studentNames],
    );
    const err =
      attendance.length !== students.length ||
      new Set(attendance.map((a) => a && a.studentId)).size !==
        attendance.length ||
      attendance.some(
        (a) =>
          !a ||
          !students.some((s) => s.id === a.studentId) ||
          !["Present", "Absent"].includes(a.status),
      );
    if (err)
      return res
        .status(400)
        .json({ error: "Choose Present or Absent once for every student." });

    await db.beginTransaction();
    for (const entry of attendance) {
      await db.execute(
        `INSERT INTO attendance (student_id, attendance_date, status)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE status = VALUES(status)`,
        [entry.studentId, req.attendanceDate, entry.status],
      );
    }
    await db.commit();
    res.json({ date: req.attendanceDate, message: "Attendance saved." });
  } catch (error) {
    try {
      const db = await connection;
      await db.rollback();
    } catch (rollbackError) {
      error.rollbackError = rollbackError;
    }
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error("Attendance request failed:", error);
  if (res.headersSent) return next(error);
  res
    .status(500)
    .json({ error: "The attendance request failed. Check the server logs." });
});

async function start() {
  try {
    await initializeDatabase();
    app.listen(3000, () => {
      console.log("Attendance app listening at http://localhost:3000");
    });
  } catch (error) {
    console.error("Could not initialize the attendance database:", error);
  }
}

start();
