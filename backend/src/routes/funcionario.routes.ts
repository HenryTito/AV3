import { Router } from "express";
import { FuncionarioController } from "../controllers/funcionario.controller";

const router = Router();


router.post("/", FuncionarioController.criar);
router.get("/", FuncionarioController.listar);
router.get("/:id", FuncionarioController.buscarPorId);
router.put("/:id", FuncionarioController.editar);
router.delete("/:id", FuncionarioController.deletar);

// NOVO: login de funcionário
router.post("/login", FuncionarioController.login);

export default router;
