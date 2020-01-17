import {Application} from "express";
import * as fightsController from "./controllers/fights.conroller";
import {fightsSchemas} from "./services/schemas.service";
import * as commonMiddleware from "../common/middlewares/common.middleware";
import {commonSchemas} from "../common/services/schemas.service";
import {ValidationDataSource} from "../common/services/constants.service";


export const fightsRoutesConfig = (app: Application) => {
    app.post('/fights', [
        commonMiddleware.validator(commonSchemas.auth, ValidationDataSource.Headers),
        commonMiddleware.isAuthenticated,
        commonMiddleware.validator(fightsSchemas.fight.full),
        fightsController.addFight
    ]);

    app.get('/fights', [
        commonMiddleware.validator(commonSchemas.auth, ValidationDataSource.Headers),
        commonMiddleware.isAuthenticated,
        fightsController.getFights
    ]);

    app.get('/fights/:id', [
        commonMiddleware.validator(commonSchemas.auth, ValidationDataSource.Headers),
        commonMiddleware.isAuthenticated,
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

    app.post('/fights/:id/permissions', [
        commonMiddleware.validator(commonSchemas.auth, ValidationDataSource.Headers),
        commonMiddleware.isAuthenticated,
        commonMiddleware.validator(fightsSchemas.permission),
        fightsController.addPermission
    ]);

    app.post('/fights/:id/locations', [
        commonMiddleware.validator(fightsSchemas.location.full),
        fightsController.addLocation
    ]);

    app.get('/fights/:id/locations', [
        fightsController.getLocations
    ]);

    app.get('/fights/:fightId/locations/:locationId', [
        fightsController.getLocation
    ]);

    app.patch('/fights/:fightId/locations/:locationId', [
        commonMiddleware.validator(fightsSchemas.location.partial),
        fightsController.patchLocation
    ]);

    app.delete('/fights/:fightId/locations/:locationId', [
        fightsController.deleteLocation
    ]);
};
