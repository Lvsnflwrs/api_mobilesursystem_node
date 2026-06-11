const { poolPromise, sql } = require('../config/DBHelper');

const getUserFaceData = async () => {
    const pool = await poolPromise;
    const QUERY = `
        SELECT
            user_id,
            admin_id,
            name,
            email,
            phone,
            embeddings,
            role
        FROM users
    `;
    
    const result = await pool.request().query(QUERY);

    return [result.recordset];
}

const insertUsers = async (adminId, name, email, phone, embeddings, role) => {
const pool = await poolPromise;
    const QUERY = "INSERT INTO users (admin_id, name, email, phone, embeddings, role, created_at) VALUES (@admin_id, @name, @email, @phone, @embeddings, @role, GETDATE())";
    
    try {
        const result = await pool.request()
            .input('admin_id', sql.Int, adminId)
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .input('phone', sql.VarChar, phone)
            .input('embeddings', sql.VarChar(sql.MAX), embeddings)
            .input('role', sql.VarChar, role)
            .query(QUERY);

        return result; 
    } catch (error) {
        console.error("DB Insert Error:", error);
        throw error;
    }
};

module.exports = {
    getUserFaceData,
    insertUsers
}