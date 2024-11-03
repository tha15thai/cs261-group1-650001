const express = require('express');
const bodyParser = require('body-parser');
const { connectDB, sql } = require('./db');

const app = express();
app.use(bodyParser.json());

connectDB();

app.post('/submitRequest', async (req, res) => {
    const { user_id, details } = req.body;
    try {
        await sql.query`INSERT INTO Requests (user_id, details) VALUES (${user_id}, ${details})`;
        res.status(200).send({ message: 'Request submitted successfully!' });
    } catch (err) {
        res.status(500).send({ error: 'Submission failed' });
    }
});

app.get('/getRequests', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Requests WHERE status = 'pending'`;
        res.send(result.recordset);
    } catch (err) {
        res.status(500).send({ error: 'Failed to fetch requests' });
    }
});

app.post('/updateRequestStatus', async (req, res) => {
    const { request_id, status } = req.body;
    try {
        await sql.query`UPDATE Requests SET status = ${status} WHERE request_id = ${request_id}`;
        res.status(200).send({ message: `Request ${status} successfully` });
    } catch (err) {
        res.status(500).send({ error: 'Failed to update status' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});