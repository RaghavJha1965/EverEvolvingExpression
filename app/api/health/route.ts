import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({
      status: 'healthy',
      message: 'API is working',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: 'API error',
      error: error?.toString() || 'Unknown error'
    }, { status: 500 })
  }
} 