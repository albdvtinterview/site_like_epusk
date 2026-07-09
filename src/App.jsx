import { useEffect, useState } from 'react'
import { Advantages } from './components/Advantages'
import { CatalogPage } from './components/CatalogPage'
import { CatalogSection } from './components/CatalogSection'
import { CookieBanner } from './components/CookieBanner'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Modal } from './components/Modal'
import { ProjectsSection } from './components/ProjectsSection'
import { ServicesSection } from './components/ServicesSection'

function getRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  const [path] = hash.split('?')
  const [page, categorySlug = ''] = path.split('/')

  if (page === 'catalog') {
    return { page: 'catalog', categorySlug }
  }

  return { page: 'home', categorySlug: '' }
}

export default function App() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const syncRoute = () => setRoute(getRoute())
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    if (route.page === 'catalog') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (window.location.hash && !window.location.hash.startsWith('#/')) {
      window.requestAnimationFrame(() => {
        document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [route.page, route.categorySlug])

  return (
    <>
      <Header />
      {route.page === 'catalog' ? (
        <CatalogPage categorySlug={route.categorySlug} />
      ) : (
        <main>
          <Hero />
          <CatalogSection />
          <Advantages />
          <ServicesSection />
          <ProjectsSection />
        </main>
      )}
      <Footer />
      <Modal />
      <CookieBanner />
    </>
  )
}
