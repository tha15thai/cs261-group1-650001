const express = require('express');
const path = require('path');
const session = require('express-session');
const sql = require('mssql');
const axios = require('axios');
require('dotenv').config();
const dbConfig = require('./dbConfig');
const formSubmission = require('./formSubmission');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express.static(path.join(__dirname, '../Frontend/public')));
app.use('/Frontend', express.static(path.join(__dirname, '../Frontend')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to the database
sql.connect(dbConfig).then(pool => {
    console.log('Connected to the database.');

    // Route to fetch user information by username
    app.get('/api/user/:username', async (req, res) => {
        const { username } = req.params;
        try {
            const result = await pool.request()
                .input('username', sql.VarChar, username)
                .query('SELECT displayname_en, email FROM users WHERE username = @username');

            if (result.recordset.length > 0) {
                res.json({ success: true, data: result.recordset[0] });
            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ success: false, message: 'Database error' });
        }
    });

    // Route to retrieve all requests
    app.get('/api/requests', async (req, res) => {
        try {
            const result = await pool.request().query('SELECT * FROM Requests');
            res.json({ success: true, data: result.recordset });
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ success: false, message: 'Failed to retrieve requests.' });
        }
    });

}).catch(error => {
    console.error('Database connection failed:', error);
});

// Register form submission routes
app.use('/api', formSubmission);

async function verifyAndStoreUser(username, password) {
    try {
        const response = await axios.post(
            'https://restapi.tu.ac.th/api/v1/auth/Ad/verify2',
            {
                UserName: String(username),
                PassWord: String(password)
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Application-Key': process.env.APPLICATION_KEY
                }
            }
        );

        const { status, type, username: responseUsername, displayname_en, email } = response.data;

        if (status) {
            let pool = await sql.connect(dbConfig);

            const result = await pool.request()
                .input('username', sql.VarChar, String(responseUsername))
                .query('SELECT * FROM users WHERE username = @username');

            if (result.recordset.length === 0) {
                await pool.request()
                    .input('username', sql.VarChar, String(responseUsername))
                    .input('type', sql.VarChar, String(type))
                    .input('displayname_en', sql.VarChar, String(displayname_en))
                    .input('email', sql.VarChar, String(email))
                    .query('INSERT INTO users (username, type, displayname_en, email) VALUES (@username, @type, @displayname_en, @email)');
            }

            return { success: true, message: 'Login successful', user: { username: responseUsername, displayname_en, type } };
        } else {
            return { success: false, message: 'Invalid credentials' };
        }
    } catch (error) {
        console.error('Error connecting to authentication service:', error);
        return { success: false, message: `Error: ${error.message}` };
    }
}

// Login route that uses the verifyAndStoreUser function
app.post('/api/login', async (req, res) => {
    let { username, password } = req.body;

    username = String(username);
    password = String(password);

    const result = await verifyAndStoreUser(username, password);

    if (result.success) {
        req.session.username = result.user.username;
        res.json(result);
    } else {
        res.status(401).json(result);
    }
});

// Route to fetch user information from the session
app.get('/api/user', async (req, res) => {
    if (!req.session.username) {
        return res.status(401).json({ success: false, message: 'User not logged in' });
    }

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('username', sql.VarChar, req.session.username)
            .query('SELECT displayname_en, email FROM users WHERE username = @username');

        if (result.recordset.length > 0) {
            res.json({ success: true, data: result.recordset[0] });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, message: 'Database error' });
    }
});

app.get('/api/request/:requestId', async (req, res) => {
    try {
        const { requestId } = req.params;
        const pool = await sql.connect(dbConfig);

        const result = await pool.request()
            .input('requestId', sql.Int, requestId)
            .query('SELECT * FROM Requests WHERE request_id = @requestId');

        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/request/files/:requestId', async (req, res) => {
    try {
        const { requestId } = req.params;
        const pool = await sql.connect(dbConfig);

        const result = await pool.request()
            .input('requestId', sql.Int, requestId)
            .query('SELECT file_name, file_path FROM FileUploads WHERE request_id = @requestId');

        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).json({ message: 'No files found for this request' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update request status to "cancel"
app.patch('/api/updateStatus/cancel/:requestId', async (req, res) => {
    try {
        const { requestId } = req.params;
        const pool = await sql.connect(dbConfig);
        
        await pool.request()
            .input('requestId', sql.Int, requestId)
            .input('status', sql.NVarChar, 'cancel')
            .query('UPDATE Requests SET status = @status WHERE request_id = @requestId');
        
        res.json({ success: true, message: 'Request status updated to cancel.' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, message: 'Failed to update status to cancel.' });
    }
});

// Update request status to "pending"
app.patch('/api/updateStatus/pending/:requestId', async (req, res) => {
    try {
        const { requestId } = req.params;
        const pool = await sql.connect(dbConfig);

        await pool.request()
            .input('requestId', sql.Int, requestId)
            .input('status', sql.NVarChar, 'pending')
            .query('UPDATE Requests SET status = @status WHERE request_id = @requestId');
        
        res.json({ success: true, message: 'Request status updated to pending.' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, message: 'Failed to update status to pending.' });
    }
});

app.patch('/api/requests/:request_id/approve', async (req, res) => {
    const requestId = req.params.request_id;

    try {
        let pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('status', sql.NVarChar, 'approved')
            .input('request_id', sql.Int, requestId)
            .query(`
                UPDATE Requests
                SET status = @status
                WHERE request_id = @request_id
            `);

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ success: true, message: 'Request approved successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Request not found' });
        }
    } catch (error) {
        console.error("Error updating request status:", error);
        res.status(500).json({ success: false, message: 'Failed to approve request' });
    }
});

app.patch('/api/requests/:request_id/disapprove', async (req, res) => {
    const requestId = req.params.request_id;
    const { disapproval_reason } = req.body;

    try {
        let pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('status', sql.NVarChar, 'disapproved')
            .input('disapproval_reason', sql.NVarChar, disapproval_reason)
            .input('request_id', sql.Int, requestId)
            .query(`
                UPDATE Requests
                SET status = @status, disapproval_reason = @disapproval_reason
                WHERE request_id = @request_id
            `);

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ success: true, message: 'Request disapproved successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Request not found' });
        }
    } catch (error) {
        console.error("Error updating request status:", error);
        res.status(500).json({ success: false, message: 'Failed to disapprove request' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});