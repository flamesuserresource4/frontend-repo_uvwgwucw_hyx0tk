import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function TopLoved() {
  const [builds, setBuilds] = useState([])

  useEffect(() => {
    fetch(`${API}/api/builds?top_loved=true`).then(r=>r.json()).then(setBuilds).catch(()=>{})
  }, [])

  return (
    <section className="bg-[#0B0B12] text-white py-16" id="top">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Community favorites</h2>
        <p className="text-gray-400 mt-2">The three most loved builds right now</p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {builds.map(b => (
            <a key={b.id} href={`/build/${b.id}`} className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{b.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{b.description}</p>
                </div>
                <div className="text-pink-400 font-semibold">❤ {b.likes || 0}</div>
              </div>
              <div className="mt-4 text-sm text-gray-300">${'{'}b.total_price?.toFixed?.(2) || '—'}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
