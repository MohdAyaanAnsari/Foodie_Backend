import authServices from "../services/auth.service.js";

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

export default {
  signup,
  login,
  verifyOtp,
};