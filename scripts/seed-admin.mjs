/**
 * Create the first admin user in MongoDB.
 * Run: npm run seed:admin
 * Loads .env.local then .env from the project root.
 *
 * Keep this schema in sync with models/User.ts
 */
import { config } from 'dotenv'
import { resolve } from 'node:path'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

config({ path: resolve(process.cwd(), '.env.local') })
config({ path: resolve(process.cwd(), '.env') })

const ADMIN_ROLE = 'ADMIN'

const userSchema = new mongoose.Schema(
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
    role: { type: String, enum: [ADMIN_ROLE], default: ADMIN_ROLE },
  },
  { timestamps: true },
)

const User = mongoose.models.User ?? mongoose.model('User', userSchema)

async function main() {
  const uri = process.env.MONGODB_URI
  const name = process.env.SEED_ADMIN_NAME
  const email = process.env.SEED_ADMIN_EMAIL?.toLowerCase().trim()
  const mobileNumber = process.env.SEED_ADMIN_MOBILE
  const plain = process.env.SEED_ADMIN_PASSWORD

  if (!uri || !name || !email || !mobileNumber || !plain) {
    console.error(
      'Set MONGODB_URI, SEED_ADMIN_NAME, SEED_ADMIN_EMAIL, SEED_ADMIN_MOBILE, SEED_ADMIN_PASSWORD',
    )
    process.exit(1)
  }

  await mongoose.connect(uri)

  const existing = await User.findOne({ email })
  if (existing) {
    console.error('User with this email already exists:', email)
    process.exit(1)
  }

  const password = await bcrypt.hash(plain, 12)
  await User.create({
    name,
    email,
    mobileNumber,
    password,
    role: ADMIN_ROLE,
  })

  console.log('Admin user created:', email)
  await mongoose.disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
