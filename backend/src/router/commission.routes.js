import express from "express";
import {proofOfCommission} from "../controllers/commission.controller.js";
import {isAuthenticated, isAuthorized} from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/proof")
  .post(isAuthenticated, isAuthorized("Auctioneer"), proofOfCommission);

export default router;
