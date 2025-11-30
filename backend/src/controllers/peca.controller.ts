import { Request, Response } from "express";
import { PecaService } from "../services/peca.service";

export class PecaController {
  static async criar(req: Request, res: Response) {
    try {
      const created = await PecaService.criar(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message || "Erro ao criar peça" });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const list = await PecaService.listar();
      res.json(list);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar peças" });
    }
  }

  static async buscarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const peca = await PecaService.buscarPorId(id);
      if (!peca) return res.status(404).json({ error: "Peça não encontrada" });
      res.json(peca);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar peça" });
    }
  }

  static async editar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const updated = await PecaService.editar(id, req.body);
      res.json(updated);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao editar peça" });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await PecaService.deletar(id);
      res.status(204).send();
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao deletar peça" });
    }
  }
}
