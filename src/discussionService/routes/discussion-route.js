import express from 'express';
import { userPost, updatePost, deletePost, getPostByTag, searchPost } from '../controller/discussion-controller.js';

export const discussionRouter = express.Router();

discussionRouter.post('/new-post',  userPost);
discussionRouter.patch('/update-post/:id', updatePost);
discussionRouter.delete('/delete-post/:id',  deletePost);
discussionRouter.get('/get-post/tags/:tag', getPostByTag);
discussionRouter.get('/search-post', searchPost);


