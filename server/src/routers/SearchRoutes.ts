import express from "express";
const router = express.Router();

import { searchProjects, searchUsers,searchTasks } from "../controllers/SearchController";

router.route("/projects").get(searchProjects);
router.route("/users").get(searchUsers);
router.route("/tasks").get(searchTasks);

export default router