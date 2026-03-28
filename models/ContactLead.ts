import mongoose, { Schema, models, model } from 'mongoose'

import {
  CONTACT_LEAD_STATUSES,
  DEFAULT_CONTACT_LEAD_STATUS,
  type ContactLeadStatus,
} from '@/lib/contact-lead-status'

const contactLeadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: CONTACT_LEAD_STATUSES,
      default: DEFAULT_CONTACT_LEAD_STATUS,
    },
  },
  { timestamps: true },
)

export type ContactLeadDocument = mongoose.InferSchemaType<
  typeof contactLeadSchema
> & {
  _id: mongoose.Types.ObjectId
  status: ContactLeadStatus
}

export const ContactLead =
  models.ContactLead ?? model('ContactLead', contactLeadSchema)
