import { Router } from "express";
import { PecaController } from "../controllers/peca.controller";

const router = Router();

router.post("/", PecaController.criar);
router.get("/", PecaController.listar);
router.get("/:id", PecaController.buscarPorId);
router.put("/:id", PecaController.editar);
router.delete("/:id", PecaController.deletar);

export default router;
