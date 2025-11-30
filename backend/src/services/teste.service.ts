import prisma from "../prisma";

export class TesteService {
  // Criar teste
  static async criar(data: any) {
    // validação de campos obrigatórios
    if (!data.tipo) throw new Error("Informe o tipo do teste");
    if (!data.resultado) throw new Error("Informe o resultado do teste");
    if (!data.aeronaveId) throw new Error("Informe o ID da aeronave");

    return prisma.teste.create({
      data: {
        tipo: data.tipo,
        resultado: data.resultado,
        aeronaveId: Number(data.aeronaveId),
      },
    });
  }

  // Listar todos os testes
  static async listar() {
    return prisma.teste.findMany({
      include: { aeronave: true }, // opcional: incluir dados da aeronave
    });
  }

  // Buscar teste por ID
  static async buscarPorId(id: number) {
    return prisma.teste.findUnique({
      where: { id },
      include: { aeronave: true }, // opcional
    });
  }

  // Editar teste
  static async editar(id: number, data: any) {
    if (data.aeronaveId) data.aeronaveId = Number(data.aeronaveId);
    return prisma.teste.update({
      where: { id },
      data,
      include: { aeronave: true },
    });
  }

  // Deletar teste
  static async deletar(id: number) {
    return prisma.teste.delete({ where: { id } });
  }
}
