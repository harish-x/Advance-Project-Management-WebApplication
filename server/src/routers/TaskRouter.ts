import {
  createAttachment,
  createComment,
  createTask,
  deleteAttachments,
  deleteComments,
  deleteTask,
  getAttachments,
  getComments,
  getSingleTask,
  getTaskbyUserId,
  getTasks,
  updateTask,
} from "../controllers/TaskController";
import { upload } from "../middlewares/FileUpload";

import express from "express";
import isAuthenticatedUser from "../middlewares/isAuthenticatedUser";
const router = express.Router();

router.route("/gettask").get(getTasks);
router.route("/createTask").post(createTask);
router.route("/:taskId/updateStatus").patch(updateTask);
router.route("/getsingleTask").get(getSingleTask);
router.route("/delete/:taskId").delete(isAuthenticatedUser, deleteTask);
router
  .route("/comment/:taskId")
  .post(isAuthenticatedUser, createComment)
  .get( getComments);

router.route("/comment/:commentId").delete(isAuthenticatedUser, deleteComments);
router
  .route("/attachment/:taskId")
  .post(isAuthenticatedUser, upload.single("file"), createAttachment)
  .get(isAuthenticatedUser, getAttachments);
router
  .route("/attachment/:attachmentId")
  .delete(isAuthenticatedUser, deleteAttachments);

router.route("/gettasks/:userId").get( getTaskbyUserId);

export default router;
