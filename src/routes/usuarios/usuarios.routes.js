import { Router } from "express";
import usuariosController from "../../controllers/usuarios.controller.js";
import usuariosMiddleware from "../../middlewares/usuarios.middleware.js";

const usuariosRouter = Router();

usuariosRouter.get('/usuarios', 
    usuariosController.searchAllUsers
);

usuariosRouter.post('/usuarios', 
    usuariosMiddleware.validateUserData,
    usuariosController.addNewUser
);

usuariosRouter.put('/usuarios/:id', 
    usuariosController.changeUsers
);

usuariosRouter.delete('/usuarios/:id', 
    usuariosController.deleteUsers
);

export default usuariosRouter;