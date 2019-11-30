import express = require("express");
import functions = require("firebase-functions");
import {Application} from "express";
import {HttpsFunction} from "firebase-functions";
import {fightsRoutesConfig} from "./fights/routes.config";

const app: Application = express();
const main: Application = express();

fightsRoutesConfig(app);
main.use('/api/v1', app);

export const webApi: HttpsFunction = functions.https.onRequest(main);
