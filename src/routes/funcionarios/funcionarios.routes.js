import { Router } from "express";
import funcionariosMiddleware from "../../middlewares/funcionarios.middleware.js";
import funcionariosController from "../../controllers/funcionarios.controller.js";

const funcionariosRouter = Router();

funcionariosRouter.get('/funcionarios', 
    funcionariosController.searchForAllEmployees
);

funcionariosRouter.get('/funcionarios/:id', 
    funcionariosController.searchEmployeeByID
);

funcionariosRouter.post('/funcionarios', 
    funcionariosMiddleware.validateEmployeeData, 
    funcionariosController.addNewEmployee
);

funcionariosRouter.put('/funcionarios/:id', 
    funcionariosMiddleware.validateEmployeeData,
    funcionariosController.changeEmployee
);

funcionariosRouter.delete('/funcionarios/:id', 
    funcionariosController.deleteEmployee
);

export default funcionariosRouter;