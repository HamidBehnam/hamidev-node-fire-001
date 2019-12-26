import {Application} from "express";
import * as usersController from './controllers/users.controller';
import * as commonMiddleware from '../common/middlewares/common.middleware';
import * as usersMiddleware from '../users/middlewares/users.middleware';

export const usersRoutesConfig = (app: Application) => {
    app.post('/users', [
        usersController.createUser
    ]);

    app.get('/users', [
        // commonMiddleware.authValidation,
        // commonMiddleware.isAuthenticated,
        usersController.listUsers
    ]);

    app.post('/login', [
        usersMiddleware.signInValidation,
        usersController.signIn
    ]);

    app.post('/logout', [
        commonMiddleware.authValidation,
        commonMiddleware.isAuthenticated,
        usersController.signOut
    ]);

    app.post('/access', [
        commonMiddleware.authValidation,
        commonMiddleware.isAuthenticated,
        usersMiddleware.accessValidation,
        commonMiddleware.isAuthorized(['admin']),
        usersController.access
    ]);
};
