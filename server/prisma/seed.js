import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Employee",
        email: "employee@test.com",
        password: hashedPassword,
        role: "EMPLOYEE",
        employeeId: "EMP001",
      },
      {
        name: "Director",
        email: "director@test.com",
        password: hashedPassword,
        role: "DIRECTOR",
        employeeId: "DIR001",
      },
      {
        name: "Accounts",
        email: "accounts@test.com",
        password: hashedPassword,
        role: "ACCOUNTS",
        employeeId: "ACC001",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Users seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });