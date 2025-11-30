import { Router, Request, Response } from "express";
import prisma from "../prisma";

const router = Router();

/**
 * 1. Medir LATÊNCIA (ping)
 * Aqui o servidor não faz nada, apenas responde.
 */
router.get("/ping", (req: Request, res: Response) => {
  const inicio = performance.now();

  // Não há processamento — apenas envia a resposta
  const fim = performance.now();

  res.json({
    servidor: "ok",
    tempoServidor: fim - inicio, // geralmente ~0ms
  });
});

/**
 * 2. Medir TEMPO DE PROCESSAMENTO
 * Apenas mede quanto tempo o servidor leva para processar algo interno.
 */
router.get("/medir-processamento", async (req: Request, res: Response) => {
  const inicio = performance.now();

  const aeronaves = await prisma.aeronave.findMany({
    include: {
      pecas: true,
      etapas: true,
      testes: true,
    },
  });

  const fim = performance.now();

  res.json({
    tempoProcessamento: fim - inicio,
    quantidadeRegistros: aeronaves.length,
  });
});

/**
 * 3. Medir TEMPO DE RESPOSTA REAL (latência + processamento)
 * É uma rota similar à que o cliente realmente usa.
 */
router.get("/relatorio-medicao", async (req: Request, res: Response) => {
  const iniProcesso = performance.now();

  const dados = await prisma.relatorio.findMany({
    include: {
      aeronave: {
        include: {
          pecas: true,
          etapas: true,
          testes: true,
        },
      },
    },
  });

  const fimProcesso = performance.now();

  res.json({
    dados,
    tempoProcessamento: fimProcesso - iniProcesso,
  });
});

export default router;
