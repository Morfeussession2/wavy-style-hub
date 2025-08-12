import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get Instagram Access Token from Supabase secrets
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Instagram Basic Display API endpoint
    const accessToken = Deno.env.get('INSTAGRAM_ACCESS_TOKEN')
    
    if (!accessToken) {
      throw new Error('Instagram access token not configured')
    }

    // Fetch user's media from Instagram Basic Display API
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${accessToken}&limit=3`
    )

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`)
    }

    const data = await response.json()

    // Filter only image and video posts
    const posts = data.data
      ?.filter((post: any) => post.media_type === 'IMAGE' || post.media_type === 'VIDEO')
      .slice(0, 3)
      .map((post: any) => ({
        id: post.id,
        caption: post.caption || '',
        media_url: post.media_url,
        thumbnail_url: post.thumbnail_url || post.media_url,
        permalink: post.permalink,
        timestamp: post.timestamp,
        media_type: post.media_type
      }))

    return new Response(
      JSON.stringify({ posts }),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    )

  } catch (error) {
    console.error('Instagram API error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        posts: [] // Return empty array as fallback
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    )
  }
})