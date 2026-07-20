import bcrypt from "bcryptjs";
import prisma from "../config/db.js";
import generateToken from "../utils/generateToken.js";
import ApiResponse from "../utils/ApiResponse.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json(
        new ApiResponse(400, "Email and Password are required")
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json(
        new ApiResponse(401, "Invalid email or password")
      );
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json(
        new ApiResponse(401, "Invalid email or password")
      );
    }

    // Generate JWT
    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    // Remove password from response
    const { password: _, ...userData } = user;

    return res.status(200).json(
      new ApiResponse(200, "Login successful", {
        token,
        user: userData,
      })
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json(
      new ApiResponse(500, "Internal Server Error")
    );
  }
};