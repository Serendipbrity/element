import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => { 
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        // options
        expiresIn: '30d'
    });
    res.cookie('jwt', token, {
        httpOnly: true,
        // if we are in production, set secure to true (s on http)
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        // expires in 30 days
        maxAge: 30 * 24 * 60 * 60 * 1000 
    });
}
 
export default generateToken;