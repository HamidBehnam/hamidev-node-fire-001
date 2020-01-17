import {Application} from "express";
import * as usersController from './controllers/users.controller';
import * as commonMiddleware from '../common/middlewares/common.middleware';
import {usersSchemas} from "./services/schemas.service";
import {commonSchemas} from "../common/services/schemas.service";
import {ValidationDataSource} from "../common/services/constants.service";

export const usersRoutesConfig = (app: Application) => {
    //TODO: while the app is in development process, it's ok to have an endpoint to create the users through the
    // NodeJs server like this, to be able to implement and test the authentication/authorization features,
    // but eventually it makes sense to do all the authentication related works such as sign up, sign in,
    // sign out, sending verification emails, changing passwords, signing in through providers (google, twitter, ...),
    // in the front ent.
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
        commonMiddleware.resourceLevelAuthorization(['admin']),
        usersController.access
    ]);
};
