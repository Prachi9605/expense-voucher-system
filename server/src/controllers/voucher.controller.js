import prisma from "../config/db.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createVoucher = async (req, res) => {
  try {
    const {
      voucherDate,
      expenseDate,
      expenseTitle,
      expenseDescription,
      amount,
      departmentId,
      categoryId,
    } = req.body;

    const voucher = await prisma.voucher.create({
      data: {
        voucherNumber: `VCH-${Date.now()}`,
        voucherDate: new Date(voucherDate),
        expenseDate: new Date(expenseDate),
        expenseTitle,
        expenseDescription,
        amount: Number(amount),

        employeeId: req.user.id,
        departmentId: Number(departmentId),
        categoryId: Number(categoryId),
      },
    });

    return res.status(201).json(
      new ApiResponse(201, "Voucher created successfully", voucher)
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json(
      new ApiResponse(500, "Internal Server Error")
    );
  }
};