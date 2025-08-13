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
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('active') === 'true'
    
    let query = {}
    if (activeOnly) {
      query = { isActive: true }
    }
    
    const retreats = await Retreat.find(query).sort({ createdAt: -1 })
    
    return NextResponse.json(retreats)
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
} 