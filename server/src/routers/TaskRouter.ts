import { createTask,getTasks,updateTask } from "../controllers/TaskController";

import express from "express";
const router = express.Router();

router.route("/getTask").get(getTasks);
router.route("/createTask").post(createTask);
router.route("/updateTask").put(updateTask);

export default router;
