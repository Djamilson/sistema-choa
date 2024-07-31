import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

export const googleProviderConfig = GoogleProvider({
  clientId: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID ?? '',
  clientSecret: process.env.NEXT_PUBLIC_AUTH_GOOGLE_SECRET ?? '',
  allowDangerousEmailAccountLinking: true,
  authorization: {
    params: {
      prompt: 'consent',
      access_type: 'offline',
      response_type: 'code',
      scope:
        'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
    },
  },
  profile(profile: GoogleProfile) {
    console.log('profile google:', profile)

    const { email, name, picture, sub } = profile

    return {
      id: sub,
      avatar_url: picture,
      name,
      email,
      username: '',
      person: {
        id: '',
        name,
        email,
        cpf: '',
        birth_date: '',
        status: false,
        privacy: false,
        promotional_email: false,
        gender: 'OTHER',
        avatar: picture,
        avatar_url: picture,
      },
      roles: [],
    }
  },
})
