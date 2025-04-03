import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyJWT = async(req,res,next) => {
    try{
        const token = req.headers['authorization']?.split(" ")[1];
        if(!token){
            return res.status(401).json({msg:"Token not provided"})
        }
        const verified = jwt.verify(token,process.env.SECRET_KEY);
        if(!verified){
            return res.status(401).json({msg:"Invalid token"});
        };
        req.user = verified;
        next();
    }
    catch(error){
        switch(error.message){
            case 'invalid signature': {
                return res.status(401).json({msg:"Invalid token"});
            }
            case 'jwt expired': {
                return res.status(401).json({msg:"Token expired"});
            }
            case 'jwt malformed': {
                return res.status(401).json({msg:"Token malformed"});
            }
            case 'invalid token': {
                return res.status(401).json({msg:"Invalid token"});
            }
            default: {
                res.status(500).json({msg:"Error authenticating"});
                console.error(error);
            }
        }
    }
};

export default verifyJWT;