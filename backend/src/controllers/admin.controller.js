import {ADMIN, MAX_AGE_TOKEN} from '../config.js';
import {createAccessToken} from '../libs/jwt.js';
import bcrypt from 'bcryptjs';
import Card from '../models/card.model.js';
// Importar las funciones del middleware
import { containsOffensiveWords, getOffensiveWords } from '../middleware/validations/cards/wordFilter.js';


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

export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });
    return res.status(200).json({message: "Sesión cerrada exitosamente"});
};

export const adminContextAuth = (req, res) => {
    return res.status(200).json({
        message: "Usuario autenticado"
    });
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

// Función para analizar todas las tarjetas (ACTUALIZADA)
export const analyze = async (req, res) => {
    try {
        // Obtener todas las tarjetas activas
        const allCards = await Card.find({ active: true });
        
        let analyzedCards = 0;
        let cardsWithOffensiveContent = 0;
        const updatedCards = [];

        // Analizar cada tarjeta usando las funciones del middleware
        for (const card of allCards) {
            const hasOffensiveContent = 
                containsOffensiveWords(card.message) || 
                containsOffensiveWords(card.to);
            
            if (hasOffensiveContent) {
                // Incrementar el contador de reportes
                const updatedCard = await Card.findByIdAndUpdate(
                    card._id,
                    { $inc: { reportsCounter: 1 } },
                    { new: true }
                );
                
                // Obtener las palabras específicas encontradas
                const offensiveWordsInMessage = getOffensiveWords(card.message);
                const offensiveWordsInTo = getOffensiveWords(card.to);
                
                updatedCards.push({
                    id: card._id,
                    to: card.to,
                    message: card.message,
                    newReportsCount: updatedCard.reportsCounter,
                    detectedWords: {
                        inMessage: offensiveWordsInMessage,
                        inTo: offensiveWordsInTo
                    }
                });
                
                cardsWithOffensiveContent++;
            }
            
            analyzedCards++;
        }

        return res.status(200).json({
            message: "Análisis completado exitosamente",
            summary: {
                totalAnalizado: analyzedCards,
                cardsconlenguajeOfensivo: cardsWithOffensiveContent,
                cardsActualizadas: updatedCards.length
            },
            updatedCards
        });

    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({message: "Server error"});
    }
};

export const softDeleteCard = async (req, res) => {
    try {
        const {id} = req.params;
        const cardId = id;

        console.log('Card ID:', cardId);

        //Verificar si la tarjeta existe
        const card = await Card.findById(cardId);

        if (!card) return res.status(404).json({message: "Tarjeta no encontrada"});

        //Marcar la tarjeta como inactiva
        const updatedCard = await Card.findByIdAndUpdate(
            cardId,
            { active: false },
            { new: true }
        );

        return res.status(200).json({message: "Tarjeta eliminada exitosamente", updatedCard});
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({message: "Server error"});
    }
};