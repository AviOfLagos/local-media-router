import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { connectToDatabase } from "../../../lib/tenant"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const { email } = req.body

    if (!email) {
      res.status(400).json({
        error: "Email is required"
      })
      return
    }

    // Connect to database to check if user has any tenant stores
    const db = await connectToDatabase()

    try {
      // Check if user exists in tenant_users table (indicates store owner)
      const query = `
        SELECT tu.*, t.name as store_name, t.subdomain
        FROM tenant_users tu
        JOIN tenants t ON tu.tenant_id = t.id
        JOIN customer c ON tu.user_id::text = c.id
        WHERE c.email = $1 AND t.status = 'active' AND t.deleted_at IS NULL
      `

      const result = await db.query(query, [email])

      const isStoreOwner = result.rows.length > 0
      const stores = result.rows.map((row: any) => ({
        tenant_id: row.tenant_id,
        store_name: row.store_name,
        subdomain: row.subdomain,
        role: row.role
      }))

      res.json({
        isStoreOwner,
        stores,
        userType: isStoreOwner ? 'store-owner' : 'shopper'
      })

    } finally {
      await db.end()
    }

  } catch (error: any) {
    console.error('Error checking user stores:', error)
    res.status(500).json({
      error: "Failed to check user stores",
      message: error.message
    })
  }
}