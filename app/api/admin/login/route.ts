import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// Admin password hash for 'admin123'
const ADMIN_PASSWORD_HASH = '$2b$10$whgHrsZqAJq8JWvGmCeaHeUOOfbhFx94Mu7y7GocgSAD10K4LsCUq'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { message: 'Password is required' },
        { status: 400 }
      )
    }

    // Verify password
    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 }
      )
    }

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`admin-${Date.now()}`).toString('base64')

    // Create response with token
    const response = NextResponse.json({
      message: 'Login successful',
      token
    })

    // Set cookie for middleware access
    response.cookies.set('adminToken', token, {
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    return response
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
} 