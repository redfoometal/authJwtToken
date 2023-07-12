import 'dotenv/config';
import jwt from 'jsonwebtoken';

export function verifyToken (req, res, next){
    const token = req.body.token || req.quary.token || req.headers['x-access-token'];
    console.log(token)
    if(!token){
        return res.status(400).send("A token is required for authentication")
    }
    
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        req.user = decoded;
    } catch (error) {
        return res.status(401).send("Invalid Token");
    }

    return next();
}