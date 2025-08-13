import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Retreat from '@/models/Retreat'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const retreatData = await request.json()
    retreatData.updatedAt = new Date()
    
    const retreat = await Retreat.create(retreatData)
    
    return NextResponse.json(
      { message: 'Retreat created successfully', retreat },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating retreat:', error)
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('Connecting to MongoDB...')
    await dbConnect()
    console.log('MongoDB connected successfully')
    
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('active') === 'true'
    
    let query = {}
    if (activeOnly) {
      query = { isActive: true }
    }
    
    console.log('Querying retreats with filter:', query)
    const retreats = await Retreat.find(query).sort({ createdAt: -1 })
    console.log(`Found ${retreats.length} retreats`)
    
    return NextResponse.json(retreats)
  } catch (error: any) {
    console.error('Error fetching retreats:', error)
    
    // Provide more detailed error information
    let errorMessage = 'Something went wrong'
    if (error.message) {
      errorMessage = error.message
    } else if (error.code) {
      errorMessage = `Database error: ${error.code}`
    }
    
    return NextResponse.json(
      { 
        message: errorMessage,
        error: error.toString(),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
} 