import mongoose from "../../../shared/database/Connection.js";
import { Schema,SchemaTypes } from "mongoose";
import { AppConstants } from "../../../shared/utils/config.js";
const {USER_SCHEMA}=AppConstants.SCHEMAS;
const userSchema=new Schema({
    name: { type: SchemaTypes.String, required: true },
    mobileNo: { type: SchemaTypes.String,maxLength:10, required: true, unique: true },
    email: { type: SchemaTypes.String, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, required: true, unique: true },
    password: { type: SchemaTypes.String, required: true },
    followers: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
    following: [{ type: SchemaTypes.ObjectId, ref: 'User' }]
});
export const userModel=mongoose.model(USER_SCHEMA,userSchema)