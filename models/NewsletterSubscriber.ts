import mongoose, { Schema, models, model } from 'mongoose'

const newsletterSubscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true },
)

export type NewsletterSubscriberDocument =
  mongoose.InferSchemaType<typeof newsletterSubscriberSchema> & {
    _id: mongoose.Types.ObjectId
  }

export const NewsletterSubscriber =
  models.NewsletterSubscriber ??
  model('NewsletterSubscriber', newsletterSubscriberSchema)
