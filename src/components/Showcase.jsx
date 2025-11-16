import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Showcase() {
  const [builds, setBuilds] = useState([])

  useEffect(() => {
    fetch(`${API}/api/builds?limit=24`).then(r=>r.json()).then(setBuilds).catch(()=>{})
  }, [])

  return (
    <section className="bg-[#0B0B12] text-white py-16" id="showcase">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Showcase</h2>
            <p className="text-gray-400 mt-2">See what others are building</p>
          </div>
          <a href="/new" className="px-4 py-2 rounded-lg bg-white text-black font-medium">Create build</a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {builds.map(b => (
            <a key={b.id} href={`/build/${b.id}`} className="group rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{b.title}</h3>
                <span className="text-xs text-gray-400">❤ {b.likes || 0}</span>
              </div>
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">{b.description}</p>
              <div className="mt-4 text-sm text-gray-300">${'{'}b.total_price?.toFixed?.(2) || '—'}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
