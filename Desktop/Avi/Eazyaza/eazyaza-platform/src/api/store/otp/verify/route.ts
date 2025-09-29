import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa"
import { otpStore } from "../../../../lib/otp-store"

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  try {
    const { email, otp } = req.body as { email: string; otp: string }

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" })
    }

    const stored = otpStore.get(email)
    if (!stored) {
      return res.status(400).json({ error: "No OTP found for this email" })
    }

    // Check if OTP has expired
    if (Date.now() > stored.expiresAt) {
      otpStore.delete(email)
      return res.status(400).json({ error: "OTP has expired" })
    }

    // Check if too many attempts
    if (stored.attempts >= 3) {
      otpStore.delete(email)
      return res.status(400).json({ error: "Too many failed attempts" })
    }

    // Verify OTP
    if (stored.otp !== otp) {
      stored.attempts += 1
      otpStore.set(email, stored)
      return res.status(400).json({
        error: "Invalid OTP",
        attemptsRemaining: 3 - stored.attempts
      })
    }

    // OTP verified successfully - remove from store
    otpStore.delete(email)

    return res.status(200).json({
      message: "OTP verified successfully",
      verified: true
    })

  } catch (error) {
    console.error("Error verifying OTP:", error)
    return res.status(500).json({ error: "Failed to verify OTP" })
  }
}

export const OPTIONS = async (req: MedusaRequest, res: MedusaResponse) => {
  res.status(200).end()
}