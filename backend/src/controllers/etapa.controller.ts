import { Request, Response } from "express";
import { EtapaService } from "../services/etapa.service";

export class EtapaController {
  static async criar(req: Request, res: Response) {
    try {
      const etapa = await EtapaService.criar(req.body);
      res.status(201).json(etapa);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message || "Erro ao criar etapa" });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const etapas = await EtapaService.listar();
      res.json(etapas);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar etapas" });
    }
  }

  static async buscarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const etapa = await EtapaService.buscarPorId(id);
      if (!etapa) return res.status(404).json({ error: "Etapa não encontrada" });
      res.json(etapa);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar etapa" });
    }
  }

  static async editar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const etapa = await EtapaService.editar(id, req.body);
      res.json(etapa);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao editar etapa" });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await EtapaService.deletar(id);
      res.status(204).send();
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao deletar etapa" });
    }
  }

  static async associarFuncionario(req: Request, res: Response) {
    try {
      const { etapaId, funcionarioId } = req.body;
      if (!etapaId || !funcionarioId) {
        return res.status(400).json({ error: "Informe etapaId e funcionarioId" });
      }
      const etapa = await EtapaService.associarFuncionario(
        Number(etapaId),
        Number(funcionarioId)
      );
      res.json({ etapaId, funcionarioId, etapa });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao associar funcionário" });
    }
  }

  static async desassociarFuncionario(req: Request, res: Response) {
    try {
      const { etapaId, funcionarioId } = req.body;
      if (!etapaId || !funcionarioId) {
        return res.status(400).json({ error: "Informe etapaId e funcionarioId" });
      }
      const etapa = await EtapaService.desassociarFuncionario(
        Number(etapaId),
        Number(funcionarioId)
      );
      res.json({ etapaId, funcionarioId, etapa });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao desassociar funcionário" });
    }
  }

  static async iniciar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const etapa = await EtapaService.iniciar(id);
      res.json(etapa);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao iniciar etapa" });
    }
  }

  static async finalizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const etapa = await EtapaService.finalizar(id);
      res.json(etapa);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao finalizar etapa" });
    }
  }
}
