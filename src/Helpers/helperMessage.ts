import express from "express";
import { FORBIDDEN, OK, INTERNAL_SERVER_ERROR, UNAUTHORIZED,CREATED } from "http-status";
import { validateAccessToken } from "../Authorize/auth";
import { Request, Response, NextFunction } from 'express';
// import {
//   getAdminMessage,
//   getProtectedMessage,
//   getPublicMessage,
// } from "";

export const messagesRouter = express.Router();

messagesRouter.get("/public", (req:Request, res:Response, nes: NextFunction) => {
  

  res.status(200).json(CREATED);
});

messagesRouter.get("/protected", validateAccessToken, (req, res) => {
  // const message = getProtectedMessage();

  res.status(403).json(FORBIDDEN);
});

messagesRouter.get("/admin", validateAccessToken, (req, res) => {
  // const message = getAdminMessage();

  res.status(200).json(OK);
});