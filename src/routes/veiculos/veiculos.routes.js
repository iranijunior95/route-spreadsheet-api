import { Router } from "express";
import veiculosController from "../../controllers/veiculos.controller.js";
import veiculosMiddleware from "../../middlewares/veiculos.middleware.js";

const veiculosRouter = Router();

veiculosRouter.get('/veiculos', 
    veiculosController.searchAllVehicles
);

veiculosRouter.get('/veiculos/:id', 
    veiculosController.searchVehicleById
);

veiculosRouter.post('/veiculos',
    veiculosMiddleware.validateVehicleData, 
    veiculosController.addNewVehicle
);

veiculosRouter.put('/veiculos/:id',
    veiculosMiddleware.validateVehicleData,
    veiculosController.changeVehicle
);

veiculosRouter.delete('/veiculos/:id', 
    veiculosController.deleteVehicle
);

export default veiculosRouter;