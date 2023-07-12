import 'dotenv/config';
import { User } from '../models/user-model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function createUser(req, res) {
    try {
        const { name, login, email, pass } = req.body;
        
        // Validate user input
        if(!(name && login && email && pass)){
           return res.status(400).send('All input is required')
        }

        // Validate if user exit in database
        const oldUser = await User.findOne({
            where:{
                email: email
            }
        });
        if(oldUser){
           return res.status(400).send('User already exists')
        }

        // Encrypt user password
        const encryptedPassword = await bcrypt.hash(pass, 10);

        // Save user in database
        const user = await User.create({
            name: name,
            login: login,
            email: email,
            password: encryptedPassword
        })

        const accessToken = jwt.sign(
            { user_id: user.id, email, login},
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: process.env.ACCESS_TOKEN_TIME,
            }
        )
        const refreshToken = jwt.sign(
            { user_id: user.id, email, login},
            process.env.REFRESH_TOKEN_KEY,
            {
                expiresIn: process.env.REFRESH_TOKEN_TIME,
            }
        )
        res.status(201).json({
            id: user.id,
            login: user.login,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (error) {
        console.error(error);
    }
}