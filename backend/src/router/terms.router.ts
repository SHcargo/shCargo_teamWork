import express from "express";
import { CreateTermsAndCondition } from "../controller/terms/CreateTerms.controller";
import { GetTermsAndCondition } from "../controller/terms/GetTerms.controller";
export const TermsRouter = express.Router();
TermsRouter.post("/", CreateTermsAndCondition);
TermsRouter.get("/", GetTermsAndCondition);
