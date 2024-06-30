import mongoose from "../../../shared/database/Connection.js";
import { Schema,SchemaTypes } from "mongoose";
import { AppConstants } from "../../../shared/utils/config.js";
const {DISCUSSION_SCHEMA}=AppConstants.SCHEMAS
const discussionSchema = new Schema({
  text:{ type: SchemaTypes.String },
  image: { type: SchemaTypes.String },
  hashtags: [{type: SchemaTypes.String}],
  createdBy: { type: SchemaTypes.ObjectId, ref: 'User' },
  createdOn: { type: SchemaTypes.Date, default: Date.now }
});

export const Discussion = mongoose.model(DISCUSSION_SCHEMA, discussionSchema);

