import { Request, Response } from "express";
import { RelatorioService } from "../services/relatorio.service";

export class RelatorioController {
  static async criar(req: Request, res: Response) {
    try {
      const relatorio = await RelatorioService.criar(req.body);
      res.status(201).json(relatorio);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const relatorios = await RelatorioService.listar();
      res.json(relatorios);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async buscarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const relatorio = await RelatorioService.buscarPorId(id);
      if (!relatorio) return res.status(404).json({ error: "Relatório não encontrado" });
      res.json(relatorio);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await RelatorioService.deletar(id);
      res.json({ message: "Relatório deletado com sucesso" });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
