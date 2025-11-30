import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const senhaHash = await bcrypt.hash("admin123", 10);

  await prisma.funcionario.upsert({
    where: { usuario: "admin" },
    update: {},
    create: {
      nome: "Administrador Inicial",
      usuario: "admin",
      senha: senhaHash,
      telefone: "000000000",
      endereco: "Sede",
      nivelPermissao: "ADMINISTRADOR",
    },
  });

  console.log("Usuário inicial criado com sucesso!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
