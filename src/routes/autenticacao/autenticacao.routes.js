import { Router } from "express";
import autenticacaoController from "../../controllers/autenticacao.controller.js";
import autenticacaoMiddleware from "../../middlewares/autenticacao.middleware.js";

const autenticacaoRouter = Router();

autenticacaoRouter.post('/autenticacao/login',
    autenticacaoMiddleware.validateLoginData,
    autenticacaoController.login
);

export default autenticacaoRouter;