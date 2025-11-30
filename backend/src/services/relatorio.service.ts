import prisma from "../prisma";

export class RelatorioService {
  static async criar(data: any) {
    if (!data.aeronaveId) throw new Error("Informe o ID da aeronave");

    return prisma.relatorio.create({
      data: { aeronaveId: data.aeronaveId },
    });
  }

  static async listar() {
    const relatorios = await prisma.relatorio.findMany({
      include: { aeronave: true },
    });

    const relatoriosComDetalhes = await Promise.all(
      relatorios.map(async (rel) => {
        const [pecas, etapas, testes] = await Promise.all([
          prisma.peca.findMany({
            where: { aeronaveId: rel.aeronaveId }
          }),

          prisma.etapa.findMany({
            where: { aeronaveId: rel.aeronaveId },
            include: {
              funcionarios: true, // 🟢 Inclui funcionários da etapa
            },
          }),

          prisma.teste.findMany({
            where: { aeronaveId: rel.aeronaveId }
          }),
        ]);

        return {
          ...rel,
          aeronave: {
            ...rel.aeronave,
            pecas,
            etapas,
            testes,
          },
        };
      })
    );

    return relatoriosComDetalhes;
  }

  static async buscarPorId(id: number) {
    const relatorio = await prisma.relatorio.findUnique({
      where: { id },
      include: { aeronave: true },
    });

    if (!relatorio) return null;

    const [pecas, etapas, testes] = await Promise.all([
      prisma.peca.findMany({
        where: { aeronaveId: relatorio.aeronaveId }
      }),

      prisma.etapa.findMany({
        where: { aeronaveId: relatorio.aeronaveId },
        include: {
          funcionarios: true, // 🟢 Inclui funcionários
        },
      }),

      prisma.teste.findMany({
        where: { aeronaveId: relatorio.aeronaveId }
      }),
    ]);

    return {
      ...relatorio,
      aeronave: {
        ...relatorio.aeronave,
        pecas,
        etapas,
        testes,
      },
    };
  }

  static async deletar(id: number) {
    return prisma.relatorio.delete({ where: { id } });
  }
}
