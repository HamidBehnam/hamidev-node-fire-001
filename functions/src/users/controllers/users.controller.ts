import {Request, Response} from "firebase-functions";
import * as usersModel from '../models/users.model';

export const createUser = async (request: Request, response: Response) => {
    try {

        const user = await usersModel.createUser(request.body);
        response.status(201).send(user);
    } catch (error) {

        response.status(500).send(error);
    }
};

export const listUsers = async (request: Request, response: Response) => {
    try {

        const users = await usersModel.listUsers();
        response.status(200).send(users);
    } catch (error) {

        response.status(500).send(error);
    }
};
