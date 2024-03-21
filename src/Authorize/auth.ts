import { FORBIDDEN, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from "http-status";
import JWT, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv"
dotenv.config();

export const validateAccessToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
});