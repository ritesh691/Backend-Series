import { Router } from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateCurrentUser,
  updateUserAvatar,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controller.js";

import { upload } from "../middelwares/multer.middleware.js";
import { verifyJwt } from "../middelwares/auth.middleware.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/channel/:username").get(getUserChannelProfile);

//secure routes
router.route("/logout").post(verifyJwt, logOutUser);
router.route("/current-user").get(verifyJwt, getCurrentUser);
router.route("/watch-history").get(verifyJwt, getWatchHistory);
router.route("/change-password").post(verifyJwt, changeCurrentPassword);
router.route("/update-account").patch(verifyJwt, updateCurrentUser);
router
  .route("/avatar")
  .patch(verifyJwt, upload.single("avatar"), updateUserAvatar);
router.route("/cover-image").patch(verifyJwt, upload.single("coverImage"), updateCurrentUser);

export default router;
