import { Request, Response } from "express";
import { FuncionarioService } from "../services/funcionario.service";
import bcrypt from "bcryptjs";

export class FuncionarioController {
  
static async criar(req: Request, res: Response) {
  try {
    const payload = req.body;
    if (!payload.senha) return res.status(400).json({ error: "Senha obrigatória" });

    // Apenas chama o Service, que já faz o hash
    const created = await FuncionarioService.criar(payload);

    // Não retorna a senha
    const { senha, ...rest } = created;
    res.status(201).json(rest);
  } catch (err: any) {
    console.error(err);
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Usuário já existe." });
    }
    res.status(500).json({ error: err.message || "Erro ao criar funcionário" });
  }
}

  static async listar(req: Request, res: Response) {
    try {
      const list = await FuncionarioService.listar();
      res.json(list);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar funcionários" });
    }
  }

  static async buscarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const funcionario = await FuncionarioService.buscarPorId(id);
      if (!funcionario) return res.status(404).json({ error: "Funcionário não encontrado" });
      res.json(funcionario);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar funcionário" });
    }
  }

  static async editar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const updated = await FuncionarioService.editar(id, data);
      const { senha, ...rest } = updated;
      res.json(rest);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao editar funcionário" });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await FuncionarioService.deletar(id);
      res.status(204).send();
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro ao deletar funcionário" });
    }
  }

  static async login(req: Request, res: Response) {
    const { usuario, senha } = req.body;
    if (!usuario || !senha) return res.status(400).json({ error: "Usuário e senha obrigatórios" });

    try {
      const funcionario = await FuncionarioService.buscarPorUsuario(usuario);
      if (!funcionario) return res.status(404).json({ error: "Usuário não encontrado" });

      const senhaValida = await bcrypt.compare(senha, funcionario.senha);
      if (!senhaValida) return res.status(401).json({ error: "Senha incorreta" });

      res.json({
        id: funcionario.id,
        nome: funcionario.nome,
        cargo: funcionario.nivelPermissao,
        usuario: funcionario.usuario,
      });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Erro no login" });
    }
  }
}
