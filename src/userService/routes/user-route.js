// user-service/routes/user.js
import express from 'express';
import { 
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    searchUsersByName,
    followUser,

 } from '../controller/user-controller.js';
export const userRouter =express.Router();

userRouter.post('/users',createUser);

userRouter.get('/users',getAllUsers );

userRouter.get('/users/:id', getUserById);

userRouter.patch('/users/:id',updateUser);

userRouter.delete('/users/:id', deleteUser);
userRouter.get('/search', searchUsersByName);
userRouter.post('/follow/:id', followUser);
