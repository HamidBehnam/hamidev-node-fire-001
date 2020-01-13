import {Application} from "express";
import * as fightsController from "./controllers/fights.conroller";
import {fightsSchemas} from "./services/schemas.service";
import * as commonMiddleware from "../common/middlewares/common.middleware";
import {commonSchemas} from "../common/services/schemas.service";
import {ValidationDataSource} from "../common/services/constants.service";


export const fightsRoutesConfig = (app: Application) => {
    app.post('/fights', [
        commonMiddleware.validator(fightsSchemas.fight.full),
        fightsController.addFight
    ]);

    app.post('/fights/:id/locations', [

    ]);

    app.get('/fights', [
        commonMiddleware.validator(commonSchemas.auth, ValidationDataSource.Headers),
        fightsController.getFights
    ]);

    app.get('/fights/:id', [
        // commonMiddleware.validator(commonSchemas.auth),
        // commonMiddleware.isAuthenticated,
        fightsController.getFight
    ]);

    app.patch('/fights/:id', [
        commonMiddleware.validator(fightsSchemas.fight.partial),
        fightsController.patchFight
    ]);

    app.put('/fights/:id', [
        commonMiddleware.validator(fightsSchemas.fight.full),
        fightsController.putFight
    ]);

    app.delete('/fights/:id', [
        fightsController.deleteFight
    ]);
};
