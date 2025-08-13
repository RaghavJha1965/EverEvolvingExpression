import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Blog from '@/models/Blog'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const blogData = await request.json()
    blogData.updatedAt = new Date()
    
    const blog = await Blog.create(blogData)
    
    return NextResponse.json(
      { message: 'Blog created successfully', blog },
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
    const publishedOnly = searchParams.get('published') === 'true'
    
    let query = {}
    if (publishedOnly) {
      query = { isPublished: true }
    }
    
    const blogs = await Blog.find(query).sort({ createdAt: -1 })
    
    return NextResponse.json(blogs)
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
} 