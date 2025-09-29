import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa"
import { ContainerRegistrationKeys } from "@medusajs/medusa"

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  try {
    const { username, storeId } = req.body as { username: string; storeId: string }

    if (!username) {
      return res.status(400).json({ error: "Instagram username is required" })
    }

    if (!storeId) {
      return res.status(400).json({ error: "Store ID is required" })
    }

    // TODO: Implement Instagram scraping logic
    // For now, we'll return mock data to demonstrate the flow
    const mockInstagramPosts = [
      {
        id: "1",
        image_url: "https://picsum.photos/400/400?random=1",
        caption: "Beautiful handmade jewelry piece",
        type: "image"
      },
      {
        id: "2",
        image_url: "https://picsum.photos/400/400?random=2",
        caption: "New collection coming soon!",
        type: "image"
      },
      {
        id: "3",
        image_url: "https://picsum.photos/400/400?random=3",
        caption: "Limited edition artisan crafted items",
        type: "image"
      }
    ]

    // Process posts to extract potential product information
    const processedPosts = mockInstagramPosts.map(post => ({
      ...post,
      suggested_title: extractTitleFromCaption(post.caption),
      suggested_description: post.caption,
      suggested_price: null, // Would use AI to extract price if mentioned
      can_be_product: true // Would use AI to determine if this is a product post
    }))

    console.log(`Instagram import for ${username}:`, processedPosts)

    return res.status(200).json({
      message: "Instagram posts fetched successfully",
      posts: processedPosts,
      total: processedPosts.length
    })

  } catch (error) {
    console.error("Error importing from Instagram:", error)
    return res.status(500).json({ error: "Failed to import from Instagram" })
  }
}

export const OPTIONS = async (req: MedusaRequest, res: MedusaResponse) => {
  res.status(200).end()
}

// Helper function to extract potential product titles from captions
function extractTitleFromCaption(caption: string): string {
  // Simple extraction - in production would use AI
  const words = caption.split(' ')
  return words.slice(0, 5).join(' ') // Take first 5 words as title
}