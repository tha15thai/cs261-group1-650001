const express = require('express');
const multer = require('multer');
const sql = require('mssql');
const dbConfig = require('./dbConfig');
const router = express.Router();
const cors = require('cors');
const path = require('path');

const app = express();
router.use(express.json());
app.use(cors());
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const sanitizedBaseName = path.basename(file.originalname, ext)
            .substring(0, 10)
            .replace(/[^a-zA-Z0-9]/g, '_');
        const uniqueName = `${sanitizedBaseName}_${timestamp}_${Math.round(Math.random() * 1E6)}${ext}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    }),
    limits: { fileSize: 100 * 1024 }
}).array('files', 5);

router.post('/submit-form', upload, async (req, res) => {
    try {
        const { 
            subject, details, firstName, lastName, studentID, year, major, studentTel, 
            parentTel, advisor, address, district, city, province, reason, semester, 
            academicYear, courseCode, courseName, section, debtConfirmation, 
            debtAmount, title, signature, applicationDate 
        } = req.body;

        const initialStatus = "waiting";
        const isDebtConfirmed = debtConfirmation === 'true';
        const parsedDebtAmount = isDebtConfirmed && debtAmount ? parseFloat(debtAmount) : null;
        const parsedApplicationDate = new Date(applicationDate);

        let pool = await sql.connect(dbConfig);

        const insertRequest = await pool.request()
            .input('subject', sql.NVarChar, subject)
            .input('details', sql.NVarChar, details)
            .input('firstName', sql.NVarChar, firstName)
            .input('lastName', sql.NVarChar, lastName)
            .input('studentID', sql.NVarChar, studentID)
            .input('year', sql.NVarChar, year)
            .input('major', sql.NVarChar, major)
            .input('studentTel', sql.NVarChar, studentTel)
            .input('parentTel', sql.NVarChar, parentTel)
            .input('advisor', sql.NVarChar, advisor)
            .input('address', sql.NVarChar, address)
            .input('district', sql.NVarChar, district)
            .input('city', sql.NVarChar, city)
            .input('province', sql.NVarChar, province)
            .input('reason', sql.NVarChar, reason)
            .input('semester', sql.NVarChar, semester)
            .input('academicYear', sql.NVarChar, academicYear)
            .input('courseCode', sql.NVarChar, courseCode)
            .input('courseName', sql.NVarChar, courseName)
            .input('section', sql.NVarChar, section)
            .input('debtConfirmation', sql.Bit, isDebtConfirmed)
            .input('debtAmount', sql.Decimal(10, 2), parsedDebtAmount)
            .input('title', sql.NVarChar, title)
            .input('signature', sql.NVarChar, signature)
            .input('applicationDate', sql.Date, parsedApplicationDate)
            .input('status', sql.NVarChar, initialStatus) // Set initial status as "waiting"
            .query(`
                INSERT INTO Requests 
                (subject, details, firstName, lastName, studentID, year, major, studentTel, 
                parentTel, advisor, address, district, city, province, reason, semester, 
                academicYear, courseCode, courseName, section, debtConfirmation, debtAmount, 
                title, signature, applicationDate, status) 
                OUTPUT INSERTED.request_id
                VALUES 
                (@subject, @details, @firstName, @lastName, @studentID, @year, @major, 
                @studentTel, @parentTel, @advisor, @address, @district, @city, @province, 
                @reason, @semester, @academicYear, @courseCode, @courseName, @section, 
                @debtConfirmation, @debtAmount, @title, @signature, @applicationDate, @status)
            `);

        const requestId = insertRequest.recordset[0].request_id;

        const files = req.files;
        if (files && files.length > 0) {
            for (const file of files) {
                await pool.request()
                    .input('requestId', sql.Int, requestId)
                    .input('fileName', sql.NVarChar, file.filename)
                    .input('filePath', sql.NVarChar, file.path)
                    .query(`
                        INSERT INTO FileUploads (request_id, file_name, file_path) 
                        VALUES (@requestId, @fileName, @filePath)
                    `);
            }
        }

        res.json({ success: true, requestId });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, message: 'Failed to submit form due to a server error.' });
    }
});

// Route to retrieve only pending requests
router.get("/requests", async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query(`
            SELECT request_id, subject, details, firstName, lastName, studentID, year, major, studentTel, 
            parentTel, advisor, address, district, city, province, reason, status, created_at, updated_at, 
            semester, academicYear, courseCode, courseName, section, debtConfirmation, debtAmount, title
            FROM Requests
            WHERE status = 'pending'  -- Filter for only "waiting" status
            ORDER BY created_at DESC
        `);
        
        res.json(result.recordset);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).send("Database error");
    }
});

module.exports = router;