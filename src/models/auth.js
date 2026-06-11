const conn = require("../config/DBHelper");
const bcrypt = require("bcrypt");
const { poolPromise, sql } = require('../config/DBHelper');

const getAdminbyEmail = async (email) => {
const pool = await poolPromise;
    const QUERY = "SELECT id, username, password, email, role, created_at FROM admins WHERE email = @email";
    
    const result = await pool.request()
        .input('email', sql.VarChar, email)
        .query(QUERY);
    
    return [result.recordset];
};

const getAdminById = async (id) => {
const pool = await poolPromise;
    const QUERY = "SELECT id, username, password, email, role, created_at FROM admins WHERE id = @id";
    
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query(QUERY);
        
    return [result.recordset];
};

const addAdmin = async (username, password, email, role) => {
const QUERY = "INSERT INTO admins (username, password, email, role, created_at) VALUES (@username, @password, @email, @role, GETDATE())";
    const salt = 10;
    const hashed = await bcrypt.hash(password, salt);
    
    const pool = await poolPromise;
    const result = await pool.request()
        .input('username', sql.VarChar, username)
        .input('password', sql.VarChar, hashed)
        .input('email', sql.VarChar, email)
        .input('role', sql.VarChar, role)
        .query(QUERY);
        
    return [result];
};

const updateAdmin = async (id, updateData) => {
    const pool = await poolPromise;
    const request = pool.request();
    
    let queryParts = [];
    
    for (const key in updateData) {
        queryParts.push(`${key} = @${key}`);
        request.input(key, updateData[key]);
    }

    request.input('id', sql.Int, id); 
    
    const QUERY = `UPDATE admins SET ${queryParts.join(", ")} WHERE id = @id`;
    const result = await request.query(QUERY);
    
    return [result];
};

module.exports = {
    getAdminbyEmail,
    getAdminById, 
    addAdmin,
    updateAdmin,
};