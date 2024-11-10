import { addTeamsToProject, createProject, getProjects } from "../controllers/ProjectController";

import express from "express";
import isAuthenticatedUser from "../middlewares/isAuthenticatedUser";
const router = express.Router();

router.route('/getprojects').get(isAuthenticatedUser,getProjects)
router.route('/createproject').post(createProject);
router.route('/inviteTeam').put(isAuthenticatedUser,addTeamsToProject)

export default router