import prisma from "../lib/prisma.js";
import { hashPassword } from "../utils/bcrypt.js";

async function seedOwner() {
  try {
    const hashedPassword = await hashPassword("123456");

    await prisma.user.update({
      where: {
        email: "owner@gmail.com",
      },
      data: {
        password: hashedPassword,
      },
    });

    console.log(" Owner password berhasil di-hash");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedOwner();