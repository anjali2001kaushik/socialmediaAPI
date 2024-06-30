import mongoose from "../../../shared/database/Connection.js";
import { Schema,SchemaTypes } from "mongoose";
import { AppConstants } from "../../../shared/utils/config.js";
const {COMMENT_SCHEMA}=AppConstants.SCHEMAS
const commentSchema = new Schema({
  text: {type: SchemaTypes.String},
  discussion: { type: SchemaTypes.ObjectId, ref: 'Discussion' },
  createdBy: { type: SchemaTypes.ObjectId, ref: 'User' },
  likes: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
  replies: [{ type:SchemaTypes.ObjectId, ref: 'Comment' }],
  createdOn: { type: Date, default: Date.now }

  
});

export const Comment = mongoose.model(COMMENT_SCHEMA, commentSchema);

