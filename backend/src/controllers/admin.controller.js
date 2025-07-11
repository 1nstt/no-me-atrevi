import {ADMIN, MAX_AGE_TOKEN} from '../config.js';
import {createAccessToken} from '../libs/jwt.js';
import bcrypt from 'bcryptjs';
import Card from '../models/card.model.js';


export const login = async (req, res) => {
    try {
        const {password} = req.body;
        
        const isValidPassword = await bcrypt.compare(password, ADMIN);
        
        if (!isValidPassword) {
            return res.status(401).json({message: "Invalid password"});
        }
        
        const token = createAccessToken({role: 'admin'});
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: MAX_AGE_TOKEN
        });

        return res.status(200).json({message: "Login successful"});
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({message: "Server error"});
    }
};


export const reportedCards = async (req, res) => {
    try {
        const reportedCards = await Card.find({reportsCounter: {$gt: 0}}).sort({ reportsCounter: -1 });
        
        return res.status(200).json({
            reportedCards
        });
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({message: "Server error"});
    }
}