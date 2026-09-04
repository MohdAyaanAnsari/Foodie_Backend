import authServices from "../services/auth.service.js";
import generateToken from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    await authServices.signUp(req.body);

    return res.status(201).json({
      success: true,
      message: "OTP has been sent to your email.",
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};

const login = async (req, res) => {
  try {
    await authServices.login(req.body);

    return res.status(200).json({
      success: true,
      message: "OTP has been sent to your email.",
    });
  } catch (error) {
    if (error.message === "Email not registered") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const user = await authServices.verifyOtp(req.body);

    const token = generateToken(user);

    await authServices.saveToken(user.id, token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
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
    await authServices.removeToken(req.user.id);

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Logout failed.",
    });
  }
};

export default {
  signup,
  login,
  verifyOtp,
  me,
  logout,
};