import {Application} from "express";
import * as fightsController from "./controllers/fights.conroller";

export const fightsRoutesConfig = (app: Application) => {
    app.post('/fights', [
        fightsController.create
    ]);

    app.get('/fights', [
        fightsController.getFights
    ]);

    app.get('/fights/:id', [
        fightsController.getFight
    ]);

    app.patch('/fights/:id', [
        fightsController.patchFight
    ]);

    app.put('/fights/:id', [
        fightsController.putFight
    ]);

    app.delete('/fights/:id', [
        fightsController.deleteFight
    ]);
};
