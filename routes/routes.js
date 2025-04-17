import express from 'express';
const routes = express.Router();
import { homeController } from '../controllers/homeController.js';


routes.get("/", homeController)

export default routes;