// src/pages/api/register.js

import { connectToDatabase } from '../../services/db';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { nombre, apellido, telefono, email, password } = req.body;

    if (!nombre || !apellido || !telefono || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const pool = await connectToDatabase();
        const client = await pool.connect();

        // Inserta el nuevo usuario en la base de datos
        const query = `
            INSERT INTO users (nombre, apellido, telefono, email, password)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, nombre, apellido, email;
        `;
        const values = [nombre, apellido, telefono, email, password];
        const result = await client.query(query, values);

        client.release();

        const newUser = result.rows[0];

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
