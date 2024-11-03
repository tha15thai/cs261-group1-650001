const sql = require('mssql');

const config = {
    server: 'localhost',
    database: 'RequestSystemDB',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
        trustServerCertificate: true
    }
};

async function connectDB() {
    try {
        await sql.connect(config);
        console.log('Connected to SQL Server');
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

module.exports = { connectDB, sql };
