import express from "express";
import {isAuthenticated, isAuthorized} from "../middlewares/auth.middleware.js";
import {
  deleteAuctionItem,
  deletePaymentProof,
  fetchAllUsers,
  getAllPaymentProofs,
  getPaymentProofDetail,
  monthlyRevenue,
  updateProofStatus,
} from "../controllers/superAdmin.controller.js";

const router = express.Router();

router
  .route("/auctionitem/delete/:id")
  .delete(isAuthenticated, isAuthorized("Super Admin"), deleteAuctionItem);

router
  .route("/paymentproofs/getall")
  .get(isAuthenticated, isAuthorized("Super Admin"), getAllPaymentProofs);

router
  .route("/paymentproof/:id")
  .get(isAuthenticated, isAuthorized("Super Admin"), getPaymentProofDetail);

router
  .route("/paymentproof/status/update/:id")
  .put(isAuthenticated, isAuthorized("Super Admin"), updateProofStatus);

router
  .route("/paymentproof/delete/:id")
  .delete(isAuthenticated, isAuthorized("Super Admin"), deletePaymentProof);

router
  .route("/users/getall")
  .get(isAuthenticated, isAuthorized("Super Admin"), fetchAllUsers);

router
  .route("/monthlyincome")
  .get(isAuthenticated, isAuthorized("Super Admin"), monthlyRevenue);

export default router;
