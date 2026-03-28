import mongoose, { Schema, models, model } from 'mongoose'

export const ADMIN_ROLE = 'ADMIN' as const

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobileNumber: { type: String, required: true, trim: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: [ADMIN_ROLE],
      default: ADMIN_ROLE,
    },
  },
  { timestamps: true },
)

export type UserDocument = mongoose.InferSchemaType<typeof userSchema> & {
  _id: mongoose.Types.ObjectId
}

export const User = models.User ?? model('User', userSchema)
