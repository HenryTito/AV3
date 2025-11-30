import prisma from "../prisma";

export class EtapaService {
  // Criar etapa
  static async criar(data: any) {
    const etapa = {
      ...data,
      prazo: new Date(data.prazo),
      aeronaveId: Number(data.aeronaveId),
    };
    return prisma.etapa.create({ data: etapa });
  }

  // Listar todas as etapas (com funcionários associados)
  static async listar() {
    return prisma.etapa.findMany({
      include: { funcionarios: true },
    });
  }

  // Buscar etapa por ID
  static async buscarPorId(id: number) {
    return prisma.etapa.findUnique({
      where: { id },
      include: { funcionarios: true },
    });
  }

  // Editar etapa
  static async editar(id: number, data: any) {
    const etapa = {
      ...data,
      prazo: data.prazo ? new Date(data.prazo) : undefined,
      aeronaveId: data.aeronaveId ? Number(data.aeronaveId) : undefined,
    };
    return prisma.etapa.update({
      where: { id },
      data: etapa,
      include: { funcionarios: true },
    });
  }

  // Deletar etapa
  static async deletar(id: number) {
    return prisma.etapa.delete({ where: { id } });
  }

  // Associar funcionário à etapa
  static async associarFuncionario(etapaId: number, funcionarioId: number) {
    return prisma.etapa.update({
      where: { id: etapaId },
      data: {
        funcionarios: {
          connect: { id: funcionarioId },
        },
      },
      include: { funcionarios: true },
    });
  }

  // Desassociar funcionário da etapa
  static async desassociarFuncionario(etapaId: number, funcionarioId: number) {
    return prisma.etapa.update({
      where: { id: etapaId },
      data: {
        funcionarios: {
          disconnect: { id: funcionarioId },
        },
      },
      include: { funcionarios: true },
    });
  }

  // Iniciar etapa
  static async iniciar(id: number) {
    return prisma.etapa.update({
      where: { id },
      data: { status: "ANDAMENTO" },
      include: { funcionarios: true },
    });
  }

  // Finalizar etapa
  static async finalizar(id: number) {
    return prisma.etapa.update({
      where: { id },
      data: { status: "CONCLUIDA" },
      include: { funcionarios: true },
    });
  }
}
