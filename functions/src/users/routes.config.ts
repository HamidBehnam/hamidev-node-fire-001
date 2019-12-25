import {Application} from "express";
import * as usersController from './controllers/users.controller';
import * as commonMiddleware from '../common/middlewares/common.middleware';
import * as usersMiddleware from '../users/middlewares/users.middleware';

export const usersRoutesConfig = (app: Application) => {
    app.post('/users', [
        usersController.createUser
    ]);

    app.get('/users', [
        commonMiddleware.authValidation,
        commonMiddleware.checkIfAuthenticated,
        usersController.listUsers
    ]);

    app.post('/login', [
        usersMiddleware.loginValidation,
        usersController.signin
    ]);

    app.post('/logout', [
        commonMiddleware.authValidation,
        commonMiddleware.checkIfAuthenticated,
        usersController.signout
    ]);

    app.post('/access', [
        commonMiddleware.authValidation,
        commonMiddleware.checkIfAuthenticated,
        usersMiddleware.accessValidation,
        usersController.access
    ]);
};
