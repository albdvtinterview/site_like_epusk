import { AboutAndProcess } from './components/AboutAndProcess'
import { Advantages } from './components/Advantages'
import { CatalogSection } from './components/CatalogSection'
import { ContactSection } from './components/ContactSection'
import { CookieBanner } from './components/CookieBanner'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Modal } from './components/Modal'
import { ProjectsSection } from './components/ProjectsSection'
import { ServicesSection } from './components/ServicesSection'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CatalogSection />
        <Advantages />
        <ServicesSection />
        <ProjectsSection />
        <AboutAndProcess />
        <ContactSection />
      </main>
      <Footer />
      <Modal />
      <CookieBanner />
    </>
  )
}
