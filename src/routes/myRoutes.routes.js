import { Router } from "express";
import funcionariosRouter from "./funcionarios/funcionarios.routes.js";
import veiculosRouter from "./veiculos/veiculos.routes.js";
import viagensRouter from "./viagens/viagens.routes.js";
import usuariosRouter from "./usuarios/usuarios.routes.js";

const router = Router();

router.use('/api', funcionariosRouter);
router.use('/api', veiculosRouter);
router.use('/api', viagensRouter);
router.use('/api', usuariosRouter);

export default router;