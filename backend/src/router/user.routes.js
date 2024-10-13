import {Router} from "express";
import {
  fetchLeaderboard,
  getProfile,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import {isAuthenticated} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);

//secured routes
router.route("/me").get(isAuthenticated, getProfile);
router.route("/logout").get(isAuthenticated, logout);
router.route("/leaderboard").get(fetchLeaderboard);

export default router;
