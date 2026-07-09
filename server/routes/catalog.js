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
        GREATEST(c.base_product_count, COUNT(p.id)::int) AS "productCount"
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
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : ''
    const availability = typeof req.query.availability === 'string' ? req.query.availability.trim() : ''
    const priceMode = typeof req.query.priceMode === 'string' ? req.query.priceMode : 'all'
    const sort = typeof req.query.sort === 'string' ? req.query.sort : 'price-asc'
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1)
    const pageSize = Math.min(60, Math.max(1, Number.parseInt(req.query.pageSize, 10) || 24))
    const offset = (page - 1) * pageSize
    const values = []
    let where = 'WHERE p.is_active = TRUE'

    if (category) {
      values.push(category)
      where += ` AND c.slug = $${values.length}`
    }

    if (search) {
      values.push(`%${search}%`)
      where += ` AND (p.name ILIKE $${values.length} OR p.sku ILIKE $${values.length} OR p.short_description ILIKE $${values.length})`
    }

    if (availability) {
      values.push(availability)
      where += ` AND p.availability = $${values.length}`
    }

    if (priceMode === 'priced') {
      where += ' AND p.price > 0'
    }

    if (priceMode === 'request') {
      where += ' AND (p.price IS NULL OR p.price <= 0)'
    }

    const orderBy = {
      'price-desc': '(p.price IS NULL OR p.price <= 0), p.price DESC NULLS LAST, p.name ASC',
      name: 'p.name ASC',
    }[sort] || '(p.price IS NULL OR p.price <= 0), p.price ASC NULLS LAST, p.name ASC'

    const countResult = await pool.query(`
      SELECT COUNT(*)::int AS total
      FROM products p
      JOIN categories c ON c.id = p.category_id
      ${where}
    `, values)

    values.push(pageSize, offset)
    const { rows } = await pool.query(`
      SELECT p.id, p.name, p.sku, p.short_description AS "shortDescription",
        p.image_url AS "imageUrl", p.price, p.availability,
        c.slug AS "categorySlug", c.name AS "categoryName"
      FROM products p
      JOIN categories c ON c.id = p.category_id
      ${where}
      ORDER BY ${orderBy}
      LIMIT $${values.length - 1} OFFSET $${values.length}
    `, values)

    res.json({
      items: rows,
      total: countResult.rows[0]?.total || 0,
      page,
      pageSize,
    })
  } catch (error) {
    next(error)
  }
})
