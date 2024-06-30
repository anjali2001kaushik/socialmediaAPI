import express from 'express';
import { createComment, updateComment, deleteComment, likeComment, replyToComment } from '../controller/comment-controller.js';
const commentRouter = express.Router();
commentRouter.post('/',  createComment);
commentRouter.patch('/:id',  updateComment);
commentRouter.delete('/:id',  deleteComment);
commentRouter.post('/like/:id',  likeComment);
commentRouter.post('/reply',  replyToComment);

export default commentRouter;
