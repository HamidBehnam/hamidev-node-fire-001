import {Request, Response} from "firebase-functions";
import * as fightsModel from "../models/fights.model";

export const addFight = async (request: Request, response: Response) => {
    try {

        const fight = await fightsModel.addFight(request.body);
        response.status(201).send(fight);
    } catch (error) {

        response.status(500).send(error);
    }
};

export const getFights = async (request: Request, response: Response) => {
    try {

        const fights = await fightsModel.getFights();
        response.status(200).send(fights);
    } catch (error) {

        response.status(500).send(error);
    }
};

export const getFight = async (request: Request, response: Response) => {
    try {

        const fight = await fightsModel.getFight(request.params.id);

        if (fight) {

            response.status(200).send(fight);
        } else {

            response.status(404).send('The fight does not exists');
        }
    } catch (error) {

        response.status(500).send(error);
    }
};

export const patchFight = async (request: Request, response: Response) => {
    try {

        const updatedFight = await fightsModel.patchFight(request.params.id, request.body);
        response.status(200).send(updatedFight);
    } catch (error) {

        response.status(500).send(error);
    }
};

export const putFight = async (request: Request, response: Response) => {
    try {

        const updatedFight = await fightsModel.putFight(request.params.id, request.body);
        response.status(200).send(updatedFight);
    } catch (error) {

        response.status(500).send(error);
    }
};

export const deleteFight = async (request: Request, response: Response) => {
    try {

        const deletedFight = await fightsModel.deleteFight(request.params.id);

        if (deletedFight) {

            response.status(201).send('Fight was successfully deleted.');
        } else {

            response.status(404).send('The requested document does not exist.');
        }
    } catch (error) {

        response.status(500).send(error);
    }
};
