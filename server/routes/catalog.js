import { Router } from 'express'
import { pool } from '../db/pool.js'

export const catalogRouter = Router()

catalogRouter.get('/categories', async (_req, res, next) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        c.id,
        c.slug,
        c.name,
        c.description,
        c.image_label AS "imageLabel",
        c.base_product_count + COUNT(p.id)::int AS "productCount"
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id AND p.is_active = TRUE
      WHERE c.is_active = TRUE
      GROUP BY c.id
      ORDER BY c.sort_order, c.id
    `)
    res.json(rows)
  } catch (error) {
    next(error)
  }
})

catalogRouter.get('/products', async (req, res, next) => {
  try {
    const category = typeof req.query.category === 'string' ? req.query.category : null
    const values = []
    let where = 'WHERE p.is_active = TRUE'

    if (category) {
      values.push(category)
      where += ` AND c.slug = $${values.length}`
    }

    const { rows } = await pool.query(`
      SELECT p.id, p.name, p.sku, p.short_description AS "shortDescription",
        p.image_url AS "imageUrl", c.slug AS "categorySlug", c.name AS "categoryName"
      FROM products p
      JOIN categories c ON c.id = p.category_id
      ${where}
      ORDER BY p.created_at DESC
      LIMIT 100
    `, values)
    res.json(rows)
  } catch (error) {
    next(error)
  }
})
