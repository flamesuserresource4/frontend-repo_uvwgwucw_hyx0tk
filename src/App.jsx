import Hero from './components/Hero'
import TopLoved from './components/TopLoved'
import Showcase from './components/Showcase'
import Configurator from './components/Configurator'
import { Routes, Route } from 'react-router-dom'
import BuildDetail from './components/BuildDetail'
import AdminPanel from './components/AdminPanel'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-[#0B0B12]">
          <Hero />
          <TopLoved />
          <Configurator />
          <Showcase />
        </div>
      }/>
      <Route path="/build/:id" element={<BuildDetail />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  )
}
