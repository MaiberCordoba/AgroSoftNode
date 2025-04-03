const index = async(req,res) => {
    try{
        res.render('index');
    }
    catch(error){
        res.status(500).json({msg:"Internal server error"});
        console.error(error);
    }
};

export default index;