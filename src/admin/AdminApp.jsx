import { ArrowLeft, Check, Edit3, LogOut, PackagePlus, RefreshCw, Save, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { adminApi } from '../lib/api'

const emptyProduct = {
  categoryId: '',
  name: '',
  sku: '',
  shortDescription: '',
  imageUrl: '',
  isActive: true,
}

export function AdminApp() {
  const [token, setToken] = useState(() => sessionStorage.getItem('energopusk-admin-token') || '')
  const [tokenInput, setTokenInput] = useState(token)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyProduct)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const load = useCallback(async (adminToken = token) => {
    if (!adminToken) return
    setLoading(true)
    setError('')
    try {
      const [categoryRows, productRows] = await Promise.all([
        adminApi.categories(adminToken),
        adminApi.products(adminToken),
      ])
      setCategories(categoryRows)
      setProducts(productRows)
      setForm((current) => ({ ...current, categoryId: current.categoryId || categoryRows[0]?.id || '' }))
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => { load() }, [load])

  const login = (event) => {
    event.preventDefault()
    const nextToken = tokenInput.trim()
    sessionStorage.setItem('energopusk-admin-token', nextToken)
    setToken(nextToken)
    load(nextToken)
  }

  const logout = () => {
    sessionStorage.removeItem('energopusk-admin-token')
    setToken('')
    setTokenInput('')
    setProducts([])
  }

  const change = (event) => {
    const { name, value, type, checked } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const resetForm = () => {
    setEditingId(null)
    setForm({ ...emptyProduct, categoryId: categories[0]?.id || '' })
  }

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setNotice('')
    const payload = { ...form, categoryId: Number(form.categoryId) }
    try {
      if (editingId) {
        await adminApi.updateProduct(token, editingId, payload)
        setNotice('Товар обновлён')
      } else {
        await adminApi.createProduct(token, payload)
        setNotice('Товар добавлен')
      }
      resetForm()
      await load()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  const edit = (product) => {
    setEditingId(product.id)
    setForm({
      categoryId: product.categoryId,
      name: product.name,
      sku: product.sku,
      shortDescription: product.shortDescription || '',
      imageUrl: product.imageUrl || '',
      isActive: product.isActive,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const remove = async (product) => {
    if (!window.confirm(`Удалить товар «${product.name}»?`)) return
    setLoading(true)
    setError('')
    try {
      await adminApi.deleteProduct(token, product.id)
      if (editingId === product.id) resetForm()
      await load()
      setNotice('Товар удалён')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f4f5f8] p-5">
        <form onSubmit={login} className="w-full max-w-md rounded-2xl bg-white p-7 shadow-card">
          <a href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500"><ArrowLeft size={17} /> На сайт</a>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-orange">ЭНЕРГОПУСК</p>
          <h1 className="mt-3 text-3xl font-black text-ink">Управление каталогом</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">Введите значение переменной <code>ADMIN_TOKEN</code>. Токен хранится только до закрытия вкладки.</p>
          <label className="field-label mt-7">Токен администратора<input className="field" type="password" value={tokenInput} onChange={(event) => setTokenInput(event.target.value)} required autoFocus /></label>
          <button className="button-primary mt-5 w-full justify-center" type="submit">Войти <Check size={18} /></button>
        </form>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f4f5f8] pb-20">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-shell flex h-20 items-center justify-between gap-5">
          <div><p className="text-xs font-black uppercase tracking-[0.15em] text-orange">Админ-панель</p><h1 className="mt-1 text-xl font-black text-ink">Каталог товаров</h1></div>
          <div className="flex items-center gap-3">
            <a href="/" className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-bold">На сайт</a>
            <button type="button" onClick={logout} className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200" aria-label="Выйти"><LogOut size={18} /></button>
          </div>
        </div>
      </header>

      <div className="container-shell grid gap-6 py-8 lg:grid-cols-[390px_1fr]">
        <section className="h-fit rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3"><PackagePlus className="text-orange" /><h2 className="text-xl font-black">{editingId ? 'Редактировать товар' : 'Новый товар'}</h2></div>
          <form onSubmit={submit}>
            <label className="field-label">Категория<select className="field" name="categoryId" value={form.categoryId} onChange={change} required>{categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}</select></label>
            <label className="field-label mt-4">Название<input className="field" name="name" value={form.name} onChange={change} required /></label>
            <label className="field-label mt-4">Артикул<input className="field" name="sku" value={form.sku} onChange={change} required /></label>
            <label className="field-label mt-4">Описание<textarea className="field min-h-24 resize-y" name="shortDescription" value={form.shortDescription} onChange={change} /></label>
            <label className="field-label mt-4">URL изображения<input className="field" type="url" name="imageUrl" value={form.imageUrl} onChange={change} placeholder="https://..." /></label>
            <label className="mt-5 flex items-center gap-3 text-sm font-bold"><input type="checkbox" name="isActive" checked={form.isActive} onChange={change} className="h-4 w-4 accent-orange" /> Показывать товар</label>
            <button disabled={loading} className="button-primary mt-6 w-full justify-center disabled:opacity-50" type="submit"><Save size={18} /> {editingId ? 'Сохранить' : 'Добавить товар'}</button>
            {editingId && <button type="button" onClick={resetForm} className="mt-3 w-full rounded-lg border border-slate-200 py-3 text-sm font-bold">Отменить</button>}
          </form>
        </section>

        <section className="min-w-0 rounded-2xl bg-white p-5 shadow-sm md:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div><h2 className="text-xl font-black">Товары</h2><p className="mt-1 text-sm text-slate-500">{products.length} позиций загружено в панель</p></div>
            <button type="button" onClick={() => load()} className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200" aria-label="Обновить"><RefreshCw size={18} className={loading ? 'animate-spin' : ''} /></button>
          </div>
          {error && <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm font-semibold text-red-700">{error}<p className="mt-2 font-normal">Проверьте PostgreSQL, DATABASE_URL, миграцию и ADMIN_TOKEN.</p></div>}
          {notice && <div className="mb-5 rounded-lg bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">{notice}</div>}
          <div className="space-y-3">
            {products.map((product) => (
              <article key={product.id} className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-black text-ink">{product.name}</h3>{!product.isActive && <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-black uppercase text-slate-500">Скрыт</span>}</div><p className="mt-1 text-xs text-slate-400">{product.categoryName} · {product.sku}</p><p className="mt-2 truncate text-sm text-slate-500">{product.shortDescription || 'Без описания'}</p></div>
                <div className="flex shrink-0 gap-2"><button type="button" onClick={() => edit(product)} className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200" aria-label={`Редактировать ${product.name}`}><Edit3 size={17} /></button><button type="button" onClick={() => remove(product)} className="grid h-10 w-10 place-items-center rounded-lg border border-red-200 text-red-600" aria-label={`Удалить ${product.name}`}><Trash2 size={17} /></button></div>
              </article>
            ))}
            {!loading && !products.length && !error && <p className="py-14 text-center text-sm text-slate-500">Товаров пока нет.</p>}
          </div>
        </section>
      </div>
    </main>
  )
}
