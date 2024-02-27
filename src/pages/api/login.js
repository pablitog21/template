// En el archivo pages/api/login.js
import { connectToDatabase } from '../../services/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Validar que se proporcionen el email y la contraseña
    if (!email || !password) {
      return res.status(400).json({ error: 'Se requieren email y contraseña' });
    }

    try {
      const db = await connectToDatabase();
      const collection = db.collection('sso_user');

      // Buscar el usuario en la base de datos por email
      const user = await collection.findOne({ email });

      // Verificar si el usuario existe y la contraseña es correcta
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Comparar la contraseña proporcionada con la contraseña almacenada desencriptada
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // En este punto, el inicio de sesión ha tenido éxito
      // Aquí podrías generar un token de sesión, establecer cookies, etc.
      return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error('Error al realizar inicio de sesión:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
}
