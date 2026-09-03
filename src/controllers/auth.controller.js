import authServices from "../services/auth.service.js";
import generateToken from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    const user = await authServices.signUp(req.body);

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your OTP.",
      data: user,
    });
  } catch (error) {
    // MySQL Duplicate Entry
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Already registered",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};


const login = async (req, res) => {
  try {
    const user = await authServices.login(req.body);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully. Please verify your OTP.",
      data: user,
    });

  } catch (error) {

    if (error.message === "Email not registered") {
      return res.status(404).json({
        success: false,
        message: "Email not registered",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const verifyOtp = async (req, res) => {
    try {
        const user = await authServices.verifyOtp(req.body);

        // Generate JWT
        const token = generateToken(user);

        // Save JWT in database
        await authServices.saveToken(user.id, token);

        // Set JWT in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            data: user,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


const me = async (req, res) => {
    try {
        const user = await authServices.me(req.user.id);

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};


const logout = async (req, res) => {
    try {
        // console.log("Logout user:", req.user);

        await authServices.removeToken(req.user.id);

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Logout failed",
        });
    }
};

export default {
  signup,
  login,
  logout,
  verifyOtp,
  me,
};