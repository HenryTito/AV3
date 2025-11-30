import prisma from "../prisma";

export class PecaService {
  static async criar(data: any) {
    return prisma.peca.create({ data });
  }

  static async listar() {
    return prisma.peca.findMany();
  }

  static async buscarPorId(id: number) {
    return prisma.peca.findUnique({ where: { id } });
  }

  static async editar(id: number, data: any) {
    return prisma.peca.update({
      where: { id },
      data,
    });
  }

  static async deletar(id: number) {
    return prisma.peca.delete({ where: { id } });
  }
}
