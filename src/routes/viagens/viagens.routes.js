import { Router } from "express";
import viagensController from "../../controllers/viagens.controller.js";
import viagensMiddleware from "../../middlewares/viagens.middleware.js";

const viagensRouter = Router();

viagensRouter.post('/viagens',
    viagensMiddleware.validateTravelData, 
    viagensController.addNewTrip
);

export default viagensRouter;