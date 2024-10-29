import { createProject, getProjects } from "../controllers/ProjectController";

import express from "express";
const router = express.Router();

router.route('/getprojects').get(getProjects)
router.route('/createproject').post(createProject)

export default router