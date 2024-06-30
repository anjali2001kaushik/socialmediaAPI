// auth-service/routes/auth.js
import express from 'express';

import { login, signUp } from '../controller/auth-controller.js';
export const AuthRouter = new express.Router();

AuthRouter.post('/login', login);

AuthRouter.post('/signup', signUp);
