import userService from "../services/users.service.js";

const getUsers = async(req, res) => {
    const users = await userService.getAllUsers();
    // console.log(users);

    res.status(200).json({
        success: true,
        data: users,
    });
}

const createUser = async(req, res) =>{
    try{

        const user = await userService.createUser(req.body);
        
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

export default {
    getUsers,
    createUser
}