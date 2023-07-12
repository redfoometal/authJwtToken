import 'dotenv/config';
import { User } from '../models/user-model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function loginUser(req, res){
    const { email, pass } = req.body;
    if(!(email && pass)){
        return res.status(400).send('All input is required')
    }

    const oldUser = User.findOne({
        where:{
            email: email
        }
    })

    oldUser.then(async (user) => {
        if(!user){
            return res.status(400).send('User does not exist')
        }

        const isMatch = await bcrypt.compare(pass, user.password);
        if(!isMatch){
            return res.status(400).send('Wrong password')
        }
        
        const accessToken = jwt.sign(
            { 
                user_id: user.id, 
                user_email: user.email,
                user_login: user.login
            },
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: process.env.ACCESS_TOKEN_TIME,
            }
        )

        const refreshToken = jwt.sign(
            {
                user_id: user.id, 
                user_email: user.email,
                user_login: user.login
            },
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
    }).catch(err => {
        console.error(err);
    })
}