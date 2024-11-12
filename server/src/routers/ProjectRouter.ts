import { addTeamsToProject, createProject, getProjects,getNotProjectTeams, getUsersByProject, getProject, deleteProject, updateProject } from "../controllers/ProjectController";

import express from "express";
import isAuthenticatedUser from "../middlewares/isAuthenticatedUser";
const router = express.Router();

router.route('/getprojects').get(isAuthenticatedUser, getProjects);
router.route('/createproject').post(isAuthenticatedUser,createProject);
router .route("/getNotProjectTeams").get(isAuthenticatedUser, getNotProjectTeams);
router.route('/inviteTeam').put(isAuthenticatedUser, addTeamsToProject)
router.route('/getprojectUsers').get(isAuthenticatedUser, getUsersByProject);
router.route('/getproject').get(isAuthenticatedUser, getProject);
router.route("/delete/:projectId").delete(isAuthenticatedUser, deleteProject);
router.route("/update/:projectId").put(isAuthenticatedUser, updateProject);

export default router