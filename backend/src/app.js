import {config} from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import {connectDB} from "./database/dbConnection.js";
import {errorMiddleware} from "./middlewares/error.middleware.js";
import userRouter from "./router/user.routes.js";
import auctionItemRouter from "./router/auctionItem.routes.js";
import bidRouter from "./router/bid.routes.js";
import commissionRouter from "./router/commission.routes.js";
import superAdminRouter from "./router/superAdmin.routes.js";
import {endedAuctionCron} from "./automation/endedAuctionCron.automation.js";
import {verifyCommissionCron} from "./automation/verifyCommissionCron.automation.js";

const app = express();
config({
  path: "./.env",
  // path: "./config/config.env",
});

app.use(
  cors({
    // origin: [process.env. http://localhost:5173],
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"], //only these methods are allowed
    credentials: true, //to make fronted and backend connection easier
  })
);

app.use(cookieParser()); // if we do not used cookie parser then cookie will generate but we can not access that .
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auctionitem", auctionItemRouter);
app.use("/api/v1/bid", bidRouter);
app.use("/api/v1/commission", commissionRouter);
app.use("/api/v1/superadmin", superAdminRouter);

endedAuctionCron();
verifyCommissionCron();
connectDB();
app.use(errorMiddleware);

export default app;
