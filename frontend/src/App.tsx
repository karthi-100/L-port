import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import ERSALegalClaude from './components/ERSALegalClaude'
import NRIPropertyServices from './components/NRIPropertyServices'
import IntellectualPropertyServices from './components/IntellectualPropertyServices'
import CorporateAdvisoryServices from './components/CorporateAdvisoryServices'
import NavBar from './components/shared/NavBar'
import ScrollToTop from './components/shared/ScrollToTop'

function App() {
  const { pathname } = useLocation()
  const contactSectionId = {
    '/': 'contact',
    '/nri-property-services': 'nri-contact',
    '/intellectual-property': 'ip-contact',
    '/corporate-advisory': 'ca-contact',
  }[pathname] ?? 'contact'

  return (
    <>
      <NavBar
        ctaLabel={pathname === '/nri-property-services' ? 'Book Consultancy' : 'Book Consultation'}
        onCtaClick={() => document.getElementById(contactSectionId)?.scrollIntoView({ behavior: 'smooth' })}
      />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<ERSALegalClaude/>} />
        <Route path="/nri-property-services" element={<NRIPropertyServices/>} />
        <Route path="/intellectual-property" element={<IntellectualPropertyServices/>} />
        <Route path="/corporate-advisory" element={<CorporateAdvisoryServices/>} />
      </Routes>
    </>
  )
}

export default App
