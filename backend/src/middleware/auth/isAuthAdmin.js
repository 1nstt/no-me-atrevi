import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config.js';

/**
 * Middleware para verificar si el usuario está autenticado
 * Requiere un token en las cookies
 * El usuario debe tener rol admin
 * Si el token es válido, se decodifica y se pasan los datos al controlador en el request
 */

export const isAuthAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ ok: false, message: "No se ha proporcionado un token, inicia sesion"});

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(400).json({message: err.message});
    if(decoded.role !== "admin") return res.status(403).json({ok: false, message: "No tienes permisos para acceder a este recurso"});
    next();
  });
};