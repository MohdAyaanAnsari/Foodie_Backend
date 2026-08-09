import authSevices from "../services/auth.service.js";


const signup = async(req, res) =>{
    try{
        const user = await authSErvices.signUp(req.body);
        res.status(201).json({
            success:true,
            data:user,
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

const signupget = async(req, res) =>{
    try{
        res.status(200).json({
            success:true,
            message:"Signup page accessed"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default{
    signup,
    signupget
}