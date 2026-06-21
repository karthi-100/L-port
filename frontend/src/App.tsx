import { Routes, Route } from 'react-router-dom'
import './App.css'
import ERSALegalClaude from './components/ERSALegalClaude'
import NRIPropertyServices from './components/NRIPropertyServices'
import IntellectualPropertyServices from './components/IntellectualPropertyServices'
import CorporateAdvisoryServices from './components/CorporateAdvisoryServices'

function App() {

  return (
    <>
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
