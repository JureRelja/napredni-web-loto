import { createRemoteJWKSet, jwtVerify } from 'jose'

const jwks = createRemoteJWKSet(new URL(`https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`))

export async function verifyToken(authorization?: string) {
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error('No token')
  }
  const token = authorization.split(' ')[1]
  const issuer = `https://${process.env.AUTH0_DOMAIN}/`
  // jwtVerify will validate signature, exp, nbf and alg
  const { payload } = await jwtVerify(token, jwks, {
    issuer,
  })
  return payload
}
