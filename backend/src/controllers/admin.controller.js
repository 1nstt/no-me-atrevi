import {ADMIN, MAX_AGE_TOKEN} from '../config.js';
import {createAccessToken} from '../libs/jwt.js';
import bcrypt from 'bcryptjs';
import Card from '../models/card.model.js';


export const login = async (req, res) => {
    try {
        const {password} = req.body;
        
        const isValidPassword = await bcrypt.compare(password, ADMIN);
        
        if (!isValidPassword) {
            return res.status(401).json({message: "Usuario o contraseña incorrectos"});
        }
        
        const token = createAccessToken({role: 'admin'});
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: MAX_AGE_TOKEN
        });

        return res.status(200).json({message: "Inicio de sesión exitoso"});
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({message: "Server error"});
    }
};


export const reportedCards = async (req, res) => {
    try {
        const reportedCards = await Card.find({reportsCounter: {$gt: 0}, active: true}).sort({ reportsCounter: -1 });
        
        return res.status(200).json({
            reportedCards
        });
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({message: "Server error"});
    }
}


export const acceptReport = async (req, res) => {
    try {
        const {id} = req.params
        const cardId = id;

        console.log('Card ID:', cardId);

        //Verificar si la tarjeta existe
        const card = await Card.findById(cardId);

        if (!card) return res.status(404).json({message: "Tarjeta no encontrada"});

        //Verificar si tiene reportes
        if (card.reportsCounter === 0) return res.status(400).json({message: "La tarjeta no tiene reportes"});
        
        
        const deletedCard = await Card.findByIdAndUpdate(
            cardId, 
            { active: false }, 
            { new: true }
        );
        
        return res.status(200).json({message: "Tarjeta eliminada exitosamente", deletedCard});
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({message: "Server error"});
    }
}

export const declineReport = async (req, res) => {
    try {
        const {id} = req.params;
        const cardId = id;

        console.log('Card ID:', cardId);

        //Verificar si la tarjeta existe
        const card = await Card.findById(cardId);

        if (!card) return res.status(404).json({message: "Tarjeta no encontrada"});

        //Verificar si tiene reportes
        if (card.reportsCounter === 0) return res.status(400).json({message: "La tarjeta no tiene reportes"});
        
        const updateCard = await Card.findByIdAndUpdate(
            cardId,
            {reportsCounter: 0}, 
            { new: true }
        );
        
        return res.status(200).json({message: "Tarjeta actualizada exitosamente", updateCard});
        
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({message: "Server error"});
    }
}