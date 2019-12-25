import {Application} from "express";
import * as usersController from './controllers/users.controller';
import * as commonMiddleware from '../common/middlewares/common.middleware';
import * as usersMiddleware from '../users/middlewares/users.middleware';

export const usersRoutesConfig = (app: Application) => {
    app.post('/users', [
        usersController.createUser
    ]);

    app.get('/users', [
        commonMiddleware.checkIfAuthenticated,
        usersController.listUsers
    ]);

    app.post('/login', [
        usersMiddleware.loginValidation,
        usersController.signin
    ]);
};
