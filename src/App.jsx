import { AdminApp } from './admin/AdminApp'
import { Advantages } from './components/Advantages'
import { CatalogSection } from './components/CatalogSection'
import { CookieBanner } from './components/CookieBanner'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Modal } from './components/Modal'
import { ProjectsSection } from './components/ProjectsSection'
import { ServicesSection } from './components/ServicesSection'

export default function App() {
  if (window.location.pathname.startsWith('/admin')) return <AdminApp />

  return (
    <>
      <Header />
      <main>
        <Hero />
        <CatalogSection />
        <Advantages />
        <ServicesSection />
        <ProjectsSection />
      </main>
      <Footer />
      <Modal />
      <CookieBanner />
    </>
  )
}
