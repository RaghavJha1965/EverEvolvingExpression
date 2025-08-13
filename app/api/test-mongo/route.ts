import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'

export async function GET() {
  try {
    console.log('Testing MongoDB connection...')
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI)
    
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: 'MONGODB_URI environment variable is not set' },
        { status: 500 }
      )
    }

    await dbConnect()
    
    return NextResponse.json({
      message: 'MongoDB connection successful',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('MongoDB connection test failed:', error)
    
    return NextResponse.json({
      error: 'MongoDB connection failed',
      message: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 