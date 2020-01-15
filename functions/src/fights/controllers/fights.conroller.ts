import {Request, Response} from "firebase-functions";
import * as fightsModel from "../models/fights.model";

export const addFight = async (request: Request, response: Response) => {
    try {

        const fightData = {
            ...request.body,
            createdBy: response.locals.user.uid
        };

        const fight = await fightsModel.addFight(fightData);
        response.status(201).send(fight);
    } catch (error) {

        response.status(500).send(error);
    }
};

export const getFights = async (request: Request, response: Response) => {
    try {

        const fights = await fightsModel.getFights(response.locals.user.uid);
        response.status(200).send(fights);
    } catch (error) {

        response.status(500).send(error);
    }
};

export const getFight = async (request: Request, response: Response) => {
    try {

        const fight = await fightsModel.getFight(response.locals.user.uid, request.params.id);
        response.status(200).send(fight);
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
        response.status(201).send(`${deletedFight} Fight was successfully deleted.`);
    } catch (error) {

        response.status(500).send(error);
    }
};

export const addLocation = async (request: Request, response: Response) => {
    try {

        const location = await fightsModel.addLocation(request.params.id, request.body);
        response.status(201).send(location);
    } catch (error) {

        response.status(500).send(error);
    }
};

export const getLocations = async (request: Request, response: Response) => {
    try {

        const locations = await fightsModel.getLocations(request.params.id);
        response.status(200).send(locations);
    } catch (error) {

        response.status(500).send(error);
    }
};

export const getLocation = async (request: Request, response: Response) => {
    try {

        const location = await fightsModel.getLocation(request.params.fightId, request.params.locationId);
        response.status(200).send(location);
    } catch (error) {

        response.status(500).send(error)
    }
};

export const patchLocation = async (request: Request, response: Response) => {

    try {

        const updatedLocation = await fightsModel.patchLocation(request.params.fightId, request.params.locationId, request.body);
        response.status(200).send(updatedLocation);
    } catch (error) {

        response.status(500).send(error);
    }
};

export const deleteLocation = async (request: Request, response: Response) => {

    try {

        const deletedLocation = await fightsModel.deleteLocation(request.params.fightId, request.params.locationId);
        response.status(201).send(deletedLocation);
    } catch (error) {

        response.status(500).send(error);
    }
};
