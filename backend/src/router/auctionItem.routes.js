import {
  addNewAuctionItem,
  getAllItems,
  getAuctionDetails,
  getMyAuctionItems,
  removeFromAuction,
  republishItem,
} from "../controllers/auctionItem.controller.js";
import {isAuthenticated, isAuthorized} from "../middlewares/auth.middleware.js";
import express from "express";
import {trackCommissionStatus} from "../middlewares/trackCommissionStatus.middleware.js";

const router = express.Router();

router
  .route("/create")
  .post(
    isAuthenticated,
    isAuthorized("Auctioneer"),
    trackCommissionStatus,
    addNewAuctionItem
  );

router.route("/allitems").get(getAllItems);

router.route("/auction/:id").get(isAuthenticated, getAuctionDetails);

router
  .route("/myitems")
  .get(isAuthenticated, isAuthorized("Auctioneer"), getMyAuctionItems);

router
  .route("/delete/:id")
  .delete(isAuthenticated, isAuthorized("Auctioneer"), removeFromAuction);

router
  .route("/item/republish/:id")
  .put(isAuthenticated, isAuthorized("Auctioneer"), republishItem);

export default router;
