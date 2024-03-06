import { Document } from 'mongodb';
import { Schema, model, models } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  clerkId: string;
  photo: string;
  firstName?: string;
  lastName?: string;
  planId?: number;
  creditsBalance?: number;
}

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  clerkId: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  planId: { type: Number, default: 1 },
  creditsBalance: { type: Number, default: 10 },
});

const User = models?.User ?? model('User', UserSchema);

export default User;
