import { Router } from "express";
import viagensController from "../../controllers/viagens.controller.js";
import viagensMiddleware from "../../middlewares/viagens.middleware.js";

const viagensRouter = Router();

viagensRouter.get('/viagens', 
    viagensController.searchAllTrips
);

viagensRouter.get('/viagens/:id', 
    viagensController.searchForTripsById
);

viagensRouter.post('/viagens',
    viagensMiddleware.validateTravelData, 
    viagensController.addNewTrip
);

viagensRouter.put('/viagens/:id', 
    viagensMiddleware.validateTravelData,
    viagensController.changeTrips
);

viagensRouter.delete('/viagens/:id', 
    viagensController.deleteTrips
);

export default viagensRouter;