import Card from '../models/card.model.js';

export const getCards = async (req, res) => {
    try {
        const cards = await Card.find({active: true}).sort({ createdAt: -1 });
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ 
            message: "Error al obtener las tarjetas",
            error: error.message 
        });
    }
};

export const getLastestsCards = async (req, res) => {
    try {
        const cards = await Card.find({active: true}).sort({ createdAt: -1 }).limit(150);
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las últimas tarjetas",
            error: error.message
        });
    }
};

export const getCard = async (req, res) => {
    const { id } = req.params;
    try {
        const card = await Card.findById(id);
        if (!card) {
            return res.status(404).json({ message: `Tarjeta con id ${id} no encontrada` });
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ 
            message: `Error al obtener la tarjeta con id ${id}`,
            error: error.message 
        });
    }
};

export const createCard = async (req, res) => {
    const { to, message, timeAgo } = req.body;
    try {
        const newCard = new Card({
            to,
            message,
            timeAgo: timeAgo || 'HOY'
        });
        
        const savedCard = await newCard.save();
        res.status(201).json(savedCard);
    } catch (error) {
        res.status(400).json({ 
            message: "Error al crear la tarjeta",
            error: error.message 
        });
    }
};

export const updateCard = async (req, res) => {
    const { id } = req.params;
    const { to, message, timeAgo } = req.body;
    
    try {
        const updatedCard = await Card.findByIdAndUpdate(
            id, 
            { to, message, timeAgo },
            { new: true, runValidators: true }
        );
        
        if (!updatedCard) {
            return res.status(404).json({ message: `Tarjeta con id ${id} no encontrada` });
        }
        
        res.status(200).json(updatedCard);
    } catch (error) {
        res.status(400).json({ 
            message: `Error al actualizar la tarjeta con id ${id}`,
            error: error.message 
        });
    }
};

export const deleteCard = async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedCard = await Card.findByIdAndDelete(id);
        
        if (!deletedCard) {
            return res.status(404).json({ message: `Tarjeta con id ${id} no encontrada` });
        }
        
        res.status(200).json({ 
            message: `Tarjeta con id ${id} eliminada correctamente`,
            card: deletedCard 
        });
    } catch (error) {
        res.status(400).json({ 
            message: `Error al eliminar la tarjeta con id ${id}`,
            error: error.message 
        });
    }
};


export const getCardsByTo = async (req, res) => {
    const { to } = req.params;
    
    try {
        // Buscar tarjetas que coincidan exactamente con el campo "to"
        const cards = await Card.find({ 
            to: { $regex: new RegExp(to, 'i') } // Búsqueda insensible a mayúsculas/minúsculas
        }).sort({ createdAt: -1 });
        
        if (cards.length === 0) {
            return res.status(404).json({ 
                message: `No se encontraron tarjetas para "${to}"` 
            });
        }
        
        res.status(200).json({
            message: `Se encontraron ${cards.length} tarjeta(s) para "${to}"`,
            count: cards.length,
            cards: cards
        });
    } catch (error) {
        res.status(500).json({ 
            message: `Error al buscar tarjetas para "${to}"`,
            error: error.message 
        });
    }
};

