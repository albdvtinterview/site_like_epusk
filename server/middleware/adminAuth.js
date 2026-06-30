import crypto from 'node:crypto'

function safeEqual(received, expected) {
  const left = Buffer.from(received || '')
  const right = Buffer.from(expected || '')
  return left.length === right.length && crypto.timingSafeEqual(left, right)
}

export function requireAdmin(req, res, next) {
  const configuredToken = process.env.ADMIN_TOKEN
  const receivedToken = req.get('x-admin-token')

  if (!configuredToken) {
    return res.status(503).json({ error: 'ADMIN_TOKEN is not configured' })
  }

  if (!safeEqual(receivedToken, configuredToken)) {
    return res.status(401).json({ error: 'Неверный токен администратора' })
  }

  return next()
}
