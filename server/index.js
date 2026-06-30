import 'dotenv/config'
import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ZodError } from 'zod'
import { pool } from './db/pool.js'
import { adminRouter } from './routes/admin.js'
import { catalogRouter } from './routes/catalog.js'

const app = express()
const port = Number(process.env.PORT || 3001)
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

app.disable('x-powered-by')
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
    },
  },
}))
app.use(compression())
app.use(express.json({ limit: '64kb' }))

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ status: 'ok', database: 'connected' })
  } catch {
    res.status(503).json({ status: 'error', database: 'unavailable' })
  }
})

app.use('/api', catalogRouter)
app.use('/api/admin', adminRouter)
app.use('/api', (_req, res) => res.status(404).json({ error: 'Маршрут API не найден' }))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(rootDir, 'dist'), { maxAge: '1d', etag: true }))
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path === '/api' || req.path.startsWith('/api/')) return next()
    return res.sendFile(path.join(rootDir, 'dist', 'index.html'))
  })
}

app.use((error, _req, res, _next) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ error: 'Проверьте заполнение полей', details: error.issues })
  }
  if (error?.code === '23505') return res.status(409).json({ error: 'Товар с таким артикулом уже существует' })
  if (error?.code === '23503') return res.status(400).json({ error: 'Выбрана неизвестная категория' })
  console.error('[api]', error.message)
  return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`API server is listening on http://127.0.0.1:${port}`)
})
