// Simple in-memory OTP storage (replace with Redis/database in production)
// This is shared between OTP generation and verification endpoints

interface OtpData {
  otp: string
  expiresAt: number
  attempts: number
}

class OtpStore {
  private store = new Map<string, OtpData>()

  set(email: string, data: OtpData): void {
    this.store.set(email, data)
  }

  get(email: string): OtpData | undefined {
    return this.store.get(email)
  }

  delete(email: string): boolean {
    return this.store.delete(email)
  }

  // Clean up expired OTPs periodically
  cleanExpired(): void {
    const now = Date.now()
    for (const [email, data] of this.store.entries()) {
      if (now > data.expiresAt) {
        this.store.delete(email)
      }
    }
  }
}

export const otpStore = new OtpStore()

// Clean up expired OTPs every 5 minutes
setInterval(() => {
  otpStore.cleanExpired()
}, 5 * 60 * 1000)