import { Router } from "express";
import authRoutes from "./auth.routes.js";
import voucherRoutes from "./voucher.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/vouchers", voucherRoutes);

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Expense Voucher API is running...",
  });
});

export default router;