import { createTask,getTasks,updateTask } from "../controllers/TaskController";

import express from "express";
const router = express.Router();

router.route("/gettask").get(getTasks);
router.route("/createTask").post(createTask);
router.route("/:taskId/updateStatus").patch(updateTask);

export default router;