import {Application} from "express";
import * as usersController from './controllers/users.controller';
import * as commonMiddleware from '../common/middlewares/common.middleware';
import {usersSchemas} from "./services/schemas.service";
import {commonSchemas} from "../common/services/schemas.service";
import {ValidationDataSource} from "../common/services/constants.service";

export const usersRoutesConfig = (app: Application) => {
    app.post('/users', [
        usersController.createUser
    ]);

    app.get('/users', [
        // commonMiddleware.validator(commonSchemas.auth),
        // commonMiddleware.isAuthenticated,
        usersController.listUsers
    ]);

    app.post('/login', [
        commonMiddleware.validator(usersSchemas.login),
        usersController.signIn
    ]);

    app.post('/logout', [
        commonMiddleware.validator(commonSchemas.auth, ValidationDataSource.Headers),
        commonMiddleware.isAuthenticated,
        usersController.signOut
    ]);

    app.post('/access', [
        commonMiddleware.validator(commonSchemas.auth, ValidationDataSource.Headers),
        commonMiddleware.isAuthenticated,
        commonMiddleware.validator(usersSchemas.access),
        commonMiddleware.isAuthorized(['admin']),
        usersController.access
    ]);
};
