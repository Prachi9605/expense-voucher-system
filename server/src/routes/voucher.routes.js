import { Router } from "express";
import { createVoucher } from "../controllers/voucher.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", verifyToken, createVoucher);

export default router;