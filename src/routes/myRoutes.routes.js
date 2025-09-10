import { Router } from "express";
import funcionariosRouter from "./funcionarios/funcionarios.routes.js";
import veiculosRouter from "./veiculos/veiculos.routes.js";

const router = Router();

router.use('/api', funcionariosRouter);
router.use('/api', veiculosRouter);

export default router;