import {Application} from "express";
import * as fightsController from "./controllers/fights.conroller";
import * as fightsValidator from "./middlewares/fights.validator";

export const fightsRoutesConfig = (app: Application) => {
    app.post('/fights', [
        fightsValidator.fullValidation,
        fightsController.addFight
    ]);

    app.get('/fights', [
        fightsController.getFights
    ]);

    app.get('/fights/:id', [
        fightsController.getFight
    ]);

    app.patch('/fights/:id', [
        fightsValidator.partialValidation,
        fightsController.patchFight
    ]);

    app.put('/fights/:id', [
        fightsValidator.fullValidation,
        fightsController.putFight
    ]);

    app.delete('/fights/:id', [
        fightsController.deleteFight
    ]);
};
