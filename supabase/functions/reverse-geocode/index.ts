import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { latitude, longitude } = await req.json()
    
    if (!latitude || !longitude) {
      return new Response(
        JSON.stringify({ error: 'Latitude and longitude are required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const MAPBOX_TOKEN = Deno.env.get('MAPBOX_PUBLIC_TOKEN')
    
    if (!MAPBOX_TOKEN) {
      return new Response(
        JSON.stringify({ error: 'Mapbox token not configured' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}&types=place,locality,neighborhood,address&limit=1`
    
    const response = await fetch(mapboxUrl)
    
    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    return new Response(
      JSON.stringify(data),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})