import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'

export async function GET() {
  try {
    await dbConnect()
    
    return NextResponse.json({
      status: 'success',
      message: 'MongoDB connected successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('MongoDB connection error:', error)
    
    return NextResponse.json({
      status: 'error',
      message: 'Failed to connect to MongoDB',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 