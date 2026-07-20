import { Router } from "express";
import authRoutes from "./auth.routes.js";

const router = Router();

router.use("/auth", authRoutes);

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Expense Voucher API is running...",
  });
});

export default router;