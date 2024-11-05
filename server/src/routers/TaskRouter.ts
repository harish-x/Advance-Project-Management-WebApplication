import {
  createAttachment,
  createComment,
  createTask,
  getComments,
  getSingleTask,
  getTasks,
  updateTask,
} from "../controllers/TaskController";

import express from "express";
import isAuthenticatedUser from "../middlewares/isAuthenticatedUser";
const router = express.Router();

router.route("/gettask").get(getTasks);
router.route("/createTask").post(createTask);
router.route("/:taskId/updateStatus").patch(updateTask);
router.route("/getsingleTask").get(getSingleTask);
router
  .route("/comment/:taskId")
  .post(isAuthenticatedUser, createComment)
  .get(getComments);
router.route("/attachment/:taskId").post(createAttachment);

export default router;
