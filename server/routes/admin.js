import { Router } from 'express'
import { z } from 'zod'
import { pool } from '../db/pool.js'
import { requireAdmin } from '../middleware/adminAuth.js'

const productSchema = z.object({
  categoryId: z.coerce.number().int().positive(),
  name: z.string().trim().min(2).max(500),
  sku: z.string().trim().min(2).max(120),
  shortDescription: z.string().trim().max(2000).default(''),
  imageUrl: z.union([z.literal(''), z.url()]).default(''),
  isActive: z.boolean().default(true),
})

export const adminRouter = Router()
adminRouter.use(requireAdmin)

adminRouter.get('/categories', async (_req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT id, slug, name FROM categories WHERE is_active = TRUE ORDER BY sort_order, id')
    res.json(rows)
  } catch (error) {
    next(error)
  }
})

adminRouter.get('/products', async (_req, res, next) => {
  try {
    const { rows } = await pool.query(`
      SELECT p.id, p.category_id AS "categoryId", p.name, p.sku,
        p.short_description AS "shortDescription", p.image_url AS "imageUrl",
        p.is_active AS "isActive", c.name AS "categoryName"
      FROM products p
      JOIN categories c ON c.id = p.category_id
      ORDER BY p.created_at DESC
      LIMIT 500
    `)
    res.json(rows)
  } catch (error) {
    next(error)
  }
})

adminRouter.post('/products', async (req, res, next) => {
  try {
    const product = productSchema.parse(req.body)
    const { rows } = await pool.query(`
      INSERT INTO products (category_id, name, sku, short_description, image_url, is_active)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, category_id AS "categoryId", name, sku,
        short_description AS "shortDescription", image_url AS "imageUrl", is_active AS "isActive"
    `, [product.categoryId, product.name, product.sku, product.shortDescription, product.imageUrl, product.isActive])
    res.status(201).json(rows[0])
  } catch (error) {
    next(error)
  }
})

adminRouter.put('/products/:id', async (req, res, next) => {
  try {
    const id = z.coerce.number().int().positive().parse(req.params.id)
    const product = productSchema.parse(req.body)
    const { rows } = await pool.query(`
      UPDATE products SET category_id = $1, name = $2, sku = $3,
        short_description = $4, image_url = $5, is_active = $6, updated_at = NOW()
      WHERE id = $7
      RETURNING id, category_id AS "categoryId", name, sku,
        short_description AS "shortDescription", image_url AS "imageUrl", is_active AS "isActive"
    `, [product.categoryId, product.name, product.sku, product.shortDescription, product.imageUrl, product.isActive, id])

    if (!rows[0]) return res.status(404).json({ error: 'Товар не найден' })
    return res.json(rows[0])
  } catch (error) {
    return next(error)
  }
})

adminRouter.delete('/products/:id', async (req, res, next) => {
  try {
    const id = z.coerce.number().int().positive().parse(req.params.id)
    const result = await pool.query('DELETE FROM products WHERE id = $1', [id])
    if (!result.rowCount) return res.status(404).json({ error: 'Товар не найден' })
    return res.status(204).end()
  } catch (error) {
    return next(error)
  }
})
