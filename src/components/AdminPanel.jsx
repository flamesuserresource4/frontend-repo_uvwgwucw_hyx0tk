import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function AdminPanel(){
  const [components, setComponents] = useState([])
  const [anchor, setAnchor] = useState([])
  const [builds, setBuilds] = useState([])

  const load = ()=>{
    fetch(`${API}/api/components?limit=500`).then(r=>r.json()).then(setComponents)
    fetch(`${API}/api/admin/anchor-builds`).then(r=>r.json()).then(setAnchor)
    fetch(`${API}/api/builds?limit=100`).then(r=>r.json()).then(setBuilds)
  }
  useEffect(load, [])

  const toggleAnchor = async (id, is_anchor) => {
    await fetch(`${API}/api/builds/${id}?is_anchor=${!is_anchor}`, {method:'PATCH'})
    load()
  }

  return (
    <div className="min-h-screen bg-[#0B0B12] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold">Admin</h1>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Components</h2>
          <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {components.map(c => (
              <div key={c.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-sm text-gray-400">{c.type}</div>
                <div className="font-medium">{c.name}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Builds</h2>
          <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {builds.map(b => (
              <div key={b.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="font-medium">{b.title}</div>
                <div className="text-sm text-gray-400">❤ {b.likes||0}</div>
                <button onClick={()=>toggleAnchor(b.id, b.is_anchor)} className="mt-3 px-3 py-2 rounded-lg bg-white text-black">{b.is_anchor? 'Unset Anchor':'Set Anchor'}</button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Anchor Builds</h2>
          <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {anchor.map(b => (
              <a key={b.id} href={`/build/${b.id}`} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="font-medium">{b.title}</div>
                <div className="text-sm text-gray-400">❤ {b.likes||0}</div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
