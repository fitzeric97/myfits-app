import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName } = await request.json()
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )
    
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })
    
    if (authError) throw authError
    
    const baseEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`
    const fitsEmail = `${baseEmail.replace(/[^a-z0-9]/g, '')}@myfits.co`
    
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user?.id,
        email,
        first_name: firstName,
        last_name: lastName,
        fits_email: fitsEmail
      })
    
    if (profileError) throw profileError
    
    return NextResponse.json({
      success: true,
      fitsEmail,
      message: 'Account created successfully!'
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create account' },
      { status: 400 }
    )
  }
}
