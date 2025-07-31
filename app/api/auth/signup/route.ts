// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName } = await request.json()
    
    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )
    
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })
    
    if (authError) {
      console.error('Auth error:', authError)
      throw authError
    }
    
    // Generate FITS email
    const baseEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`
    const fitsEmail = `${baseEmail.replace(/[^a-z0-9]/g, '')}@myfits.co`
    
    // Create user profile
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user?.id,
        email,
        first_name: firstName,
        last_name: lastName,
        fits_email: fitsEmail
      })
    
    if (profileError) {
      console.error('Profile error:', profileError)
      throw profileError
    }
    
    return NextResponse.json({
      success: true,
      fitsEmail,
      message: 'Account created successfully!'
    })
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create account' },
      { status: 400 }
    )
  }
}

// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    
    // Get user profile
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()
    
    return NextResponse.json({
      success: true,
      user: data.user,
      session: data.session,
      profile
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Invalid credentials' },
      { status: 401 }
    )
  }
}
