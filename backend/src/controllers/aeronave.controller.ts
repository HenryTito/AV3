import { Request, Response } from "express";
import { AeronaveService } from "../services/aeronave.service";

export class AeronaveController {
  static async criar(req: Request, res: Response) {
  try {
    const payload = req.body;

    const created = await AeronaveService.criar(payload);
    res.status(201).json(created);

  } catch (err: any) {
    console.error(err);

    if (err.code === "P2002") {
      return res.status(400).json({
        error: "Já existe uma aeronave com esse código."
      });
    }

    return res.status(500).json({
      error: err.message || "Erro ao criar aeronave"
    });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const list = await AeronaveService.listar();
      res.json(list);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message || "Erro ao listar" });
    }
  }

  static async buscarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const item = await AeronaveService.buscarPorId(id);
      if (!item) return res.status(404).json({ error: "Aeronave não encontrada" });
      res.json(item);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message || "Erro" });
    }
  }

  static async editar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const updated = await AeronaveService.editar(id, data);
      res.json(updated);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message || "Erro ao editar" });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await AeronaveService.deletar(id);
      res.status(204).send();
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message || "Erro ao deletar" });
    }
  }
}
