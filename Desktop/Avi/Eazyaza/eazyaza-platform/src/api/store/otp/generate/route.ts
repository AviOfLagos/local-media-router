import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa"
import { ContainerRegistrationKeys } from "@medusajs/medusa"
import { otpStore } from "../../../../lib/otp-store"
import { Resend } from 'resend'

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  try {
    const { email } = req.body as { email: string }

    if (!email) {
      return res.status(400).json({ error: "Email is required" })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = Date.now() + 10 * 60 * 1000 // 10 minutes

    // Store OTP with email as key
    otpStore.set(email, { otp, expiresAt, attempts: 0 })

    // Send OTP via Resend email service
    if (process.env.RESEND_API_KEY && process.env.FROM_EMAIL) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)

        await resend.emails.send({
          from: process.env.FROM_EMAIL,
          to: [email],
          subject: 'Your EazyAza Store Verification Code',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #3B82F6;">Your Verification Code</h2>
              <p>Welcome to EazyAza! Please use the following verification code to complete your store registration:</p>
              <div style="background-color: #F3F4F6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
                <h1 style="color: #1F2937; font-size: 36px; letter-spacing: 8px; margin: 0;">${otp}</h1>
              </div>
              <p>This code will expire in 10 minutes. If you didn't request this code, please ignore this email.</p>
              <p style="color: #6B7280; font-size: 14px;">Best regards,<br>The EazyAza Team</p>
            </div>
          `
        })

        console.log(`OTP sent via email to ${email}: ${otp}`)
      } catch (emailError) {
        console.error('Failed to send OTP email:', emailError)
        // Continue without failing - log to console as fallback
        console.log(`OTP for ${email} (email failed): ${otp}`)
      }
    } else {
      // Fallback: log to console if email not configured
      console.log(`OTP for ${email} (no email config): ${otp}`)
    }

    return res.status(200).json({
      message: "OTP sent successfully",
      // Return OTP in development for testing
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    })

  } catch (error) {
    console.error("Error generating OTP:", error)
    return res.status(500).json({ error: "Failed to generate OTP" })
  }
}

export const OPTIONS = async (req: MedusaRequest, res: MedusaResponse) => {
  res.status(200).end()
}