import { Router } from "express";
import { TesteController } from "../controllers/teste.controller";

const router = Router();

router.post("/", TesteController.criar);        
router.get("/", TesteController.listar);       
router.get("/:id", TesteController.buscarPorId);
router.put("/:id", TesteController.editar);     
router.delete("/:id", TesteController.deletar); 

export default router;
