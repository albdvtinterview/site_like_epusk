const jsonHeaders = { 'Content-Type': 'application/json' }

async function request(path, options = {}) {
  const response = await fetch(path, options)
  const data = response.status === 204 ? null : await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.error || `Ошибка запроса: ${response.status}`)
  }

  return data
}

export const catalogApi = {
  categories: () => request('/api/categories'),
}

export const adminApi = {
  categories: (token) => request('/api/admin/categories', { headers: { 'x-admin-token': token } }),
  products: (token) => request('/api/admin/products', { headers: { 'x-admin-token': token } }),
  createProduct: (token, product) => request('/api/admin/products', {
    method: 'POST',
    headers: { ...jsonHeaders, 'x-admin-token': token },
    body: JSON.stringify(product),
  }),
  updateProduct: (token, id, product) => request(`/api/admin/products/${id}`, {
    method: 'PUT',
    headers: { ...jsonHeaders, 'x-admin-token': token },
    body: JSON.stringify(product),
  }),
  deleteProduct: (token, id) => request(`/api/admin/products/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-token': token },
  }),
}
