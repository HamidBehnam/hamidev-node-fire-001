import {Application} from "express";
import * as fightsController from "./controllers/fights.conroller";
import * as fightsMiddleware from "./middlewares/fights.middleware";
import * as commonMiddleware from "../common/middlewares/common.middleware";


export const fightsRoutesConfig = (app: Application) => {
    app.post('/fights', [
        fightsMiddleware.fullValidation,
        fightsController.addFight
    ]);

    app.get('/fights', [
        fightsController.getFights
    ]);

    app.get('/fights/:id', [
        commonMiddleware.checkIfAuthenticated,
        fightsController.getFight
    ]);

    app.patch('/fights/:id', [
        fightsMiddleware.partialValidation,
        fightsController.patchFight
    ]);

    app.put('/fights/:id', [
        fightsMiddleware.fullValidation,
        fightsController.putFight
    ]);

    app.delete('/fights/:id', [
        fightsController.deleteFight
    ]);
};
