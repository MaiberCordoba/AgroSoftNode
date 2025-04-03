export default async function verifyAdmin(req,res,next){
    try{
        const user = req.user;
        if(!user.admin){
            return res.status(401).json({msg:"You are not allowed to perform this action"});
        }
        next()
    }
    catch(error){
        console.error(error);
        res.status(500).json({msg:"Internal server error"});
    }
}