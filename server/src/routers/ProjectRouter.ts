import { addTeamsToProject, createProject, getProjects,getNotProjectTeams, getUsersByProject } from "../controllers/ProjectController";

import express from "express";
import isAuthenticatedUser from "../middlewares/isAuthenticatedUser";
const router = express.Router();

router.route('/getprojects').get(isAuthenticatedUser,getProjects)
router.route('/createproject').post(isAuthenticatedUser,createProject);
router .route("/getNotProjectTeams").get(isAuthenticatedUser, getNotProjectTeams);
router.route('/inviteTeam').put(isAuthenticatedUser, addTeamsToProject)
router.route('/getprojectUsers').get(isAuthenticatedUser,getUsersByProject)

export default router