import { Router } from "express";
import funcionariosRouter from "./funcionarios/funcionarios.routes.js";

const router = Router();

router.use('/api', funcionariosRouter);

export default router;