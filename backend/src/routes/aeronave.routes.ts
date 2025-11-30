import { Router } from "express";
import { AeronaveController } from "../controllers/aeronave.controller";

const router = Router();

router.post("/", AeronaveController.criar);
router.get("/", AeronaveController.listar);
router.get("/:id", AeronaveController.buscarPorId);
router.put("/:id", AeronaveController.editar);
router.delete("/:id", AeronaveController.deletar);

export default router;
