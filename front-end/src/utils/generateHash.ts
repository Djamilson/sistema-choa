import { hash } from 'bcryptjs'

export async function generateHash(payload: string): Promise<string> {
  return hash(payload, 8)
}
