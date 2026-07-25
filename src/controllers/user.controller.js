import userService from "../services/users.service.js";

const getUsers = async(req, res) => {
    const users = await userService.getAllUsers();
    // console.log(users);

    res.status(200).json({
        success: true,
        data: users,
    });
}

export default {
    getUsers,
}