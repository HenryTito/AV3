import { Request, Response } from "express";
import { TesteService } from "../services/teste.service";

export class TesteController {
  static async criar(req: Request, res: Response) {
    try {
      const teste = await TesteService.criar(req.body);
      res.status(201).json(teste);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message || "Erro ao criar teste" });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const testes = await TesteService.listar();
      res.json(testes);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar testes" });
    }
  }

  static async buscarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const teste = await TesteService.buscarPorId(id);
      if (!teste) return res.status(404).json({ error: "Teste não encontrado" });
      res.json(teste);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar teste" });
    }
  }

  static async editar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const teste = await TesteService.editar(id, req.body);
      res.json(teste);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao editar teste" });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await TesteService.deletar(id);
      res.status(204).send();
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao deletar teste" });
    }
  }
}
