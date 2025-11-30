import { Router } from "express";
import { RelatorioController } from "../controllers/relatorio.controller";

const router = Router();

router.post("/", RelatorioController.criar);
router.get("/", RelatorioController.listar);
router.get("/:id", RelatorioController.buscarPorId);
router.delete("/:id", RelatorioController.deletar);

export default router;
