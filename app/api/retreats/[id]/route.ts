import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Retreat from '@/models/Retreat'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const retreat = await Retreat.findById(params.id)
    
    if (!retreat) {
      return NextResponse.json(
        { message: 'Retreat not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(retreat)
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const updateData = await request.json()
    updateData.updatedAt = new Date()
    
    const retreat = await Retreat.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    )
    
    if (!retreat) {
      return NextResponse.json(
        { message: 'Retreat not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(retreat)
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const retreat = await Retreat.findByIdAndDelete(params.id)
    
    if (!retreat) {
      return NextResponse.json(
        { message: 'Retreat not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ message: 'Retreat deleted successfully' })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
} 