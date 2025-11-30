import prisma from "../prisma";

export class AeronaveService {
  static async criar(data: any) {
    return prisma.aeronave.create({ data });
  }

  static async listar() {
    return prisma.aeronave.findMany();
  }

  static async buscarPorId(id: number) {
    return prisma.aeronave.findUnique({ where: { id } });
  }

  static async editar(id: number, data: any) {
    return prisma.aeronave.update({
      where: { id },
      data,
    });
  }

  static async deletar(id: number) {
    return prisma.aeronave.delete({
      where: { id },
    });
  }
}
