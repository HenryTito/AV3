import { Router } from "express";
import { EtapaController } from "../controllers/etapa.controller";

const router = Router();


router.post("/", EtapaController.criar);        
router.get("/", EtapaController.listar);       
router.get("/:id", EtapaController.buscarPorId);
router.put("/:id", EtapaController.editar);     
router.delete("/:id", EtapaController.deletar); 


router.post("/associar", EtapaController.associarFuncionario);
router.post("/desassociar", EtapaController.desassociarFuncionario);


router.post("/iniciar/:id", EtapaController.iniciar);
router.post("/finalizar/:id", EtapaController.finalizar);

export default router;
