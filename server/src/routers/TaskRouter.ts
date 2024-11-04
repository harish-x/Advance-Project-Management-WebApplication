import { createTask,getSingleTask,getTasks,updateTask } from "../controllers/TaskController";

import express from "express";
const router = express.Router();

router.route("/gettask").get(getTasks);
router.route("/createTask").post(createTask);
router.route("/:taskId/updateStatus").patch(updateTask);
router.route("/getsingleTask").get(getSingleTask);

export default router;
