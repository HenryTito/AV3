import prisma from "../prisma";
import bcrypt from "bcryptjs";

export class FuncionarioService {
  static async criar(data: any) {
    // Hash da senha antes de salvar
    const hashedSenha = await bcrypt.hash(data.senha, 10);
    const payload = { ...data, senha: hashedSenha };
    return prisma.funcionario.create({ data: payload });
  }

  static async listar() {
    return prisma.funcionario.findMany({
      select: {
        id: true,
        nome: true,
        telefone: true,
        endereco: true,
        usuario: true,
        nivelPermissao: true,
      },
    });
  }

  static async buscarPorId(id: number) {
    return prisma.funcionario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        telefone: true,
        endereco: true,
        usuario: true,
        nivelPermissao: true,
      },
    });
  }

  static async editar(id: number, data: any) {
    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, 10);
    }
    return prisma.funcionario.update({
      where: { id },
      data,
    });
  }

  static async deletar(id: number) {
    return prisma.funcionario.delete({ where: { id } });
  }

  static async buscarPorUsuario(usuario: string) {
    return prisma.funcionario.findUnique({ where: { usuario } });
  }
}
