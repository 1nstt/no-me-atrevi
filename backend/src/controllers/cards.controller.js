//importar mongodb

import e from "express";

export const getCards = async (req, res) => {
    res.status(200).json({
        message:"obteniendo las tarjetas"
    });
}

export const getCard = async (req, res) => {
    const {id} = req.params;
    res.status(200).json({
        message: `obteniendo la tarjeta con id ${id}`
    });
}

export const createCard = async (req, res) => {
    res.status(201).json({
        message: "creando una tarjeta"
    });
}

export const updateCard = async (req, res) => {
    const {id} = req.params;
    res.status(200).json({
        message: `actualizando la tarjeta con id ${id}`
    });
}

export const deleteCard = async (req, res) => {
    const {id} = req.params;
    res.status(200).json({
        message: `eliminando la tarjeta con id ${id}`
    });
}
