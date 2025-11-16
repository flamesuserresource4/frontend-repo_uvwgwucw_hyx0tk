import { useEffect, useMemo, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const types = ['cpu','motherboard','ram','gpu','storage','psu','case','cooler']

export default function Configurator(){
  const [components, setComponents] = useState({})
  const [selected, setSelected] = useState({})
  const [title, setTitle] = useState('My Rig')
  const [desc, setDesc] = useState('')
  const [issues, setIssues] = useState([])
  const [watts, setWatts] = useState(0)
  const [saving, setSaving] = useState(false)
  
  useEffect(()=>{
    types.forEach(t => {
      fetch(`${API}/api/components?type=${t}`).then(r=>r.json()).then(items => setComponents(prev=>({...prev, [t]: items})))
    })
  },[])

  useEffect(()=>{
    const payload = {
      title, description: desc, is_anchor: false,
      components: Object.entries(selected).map(([type, id])=>({type, component_id: id}))
    }
    fetch(`${API}/api/builds/validate`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
      .then(r=>r.json()).then(data => { setIssues(data.issues||[]); setWatts(data.estimated_wattage||0) }).catch(()=>{})
  }, [selected, title, desc])

  const total = useMemo(()=>{
    let s = 0
    for(const [type,id] of Object.entries(selected)){
      const c = (components[type]||[]).find(x=>x.id===id)
      if(c?.price) s += Number(c.price)
    }
    return s
  }, [selected, components])

  const save = async () => {
    setSaving(true)
    const payload = {
      title, description: desc, is_anchor: false,
      components: Object.entries(selected).map(([type, id])=>({type, component_id: id}))
    }
    const res = await fetch(`${API}/api/builds`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
    if(res.ok){
      const j = await res.json()
      window.location.href = `/build/${j.id}`
    } else {
      const j = await res.json().catch(()=>({}))
      alert(`Could not save build.\n${JSON.stringify(j.detail||j)}`)
    }
    setSaving(false)
  }

  return (
    <section id="configurator" className="bg-[#0B0B12] text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Manual Configurator</h2>
        <p className="text-gray-400 mt-2">Pick compatible parts. We validate sockets, lengths, and power.</p>

        <div className="mt-8 grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-6">
            {types.map(t => (
              <div key={t} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <h3 className="capitalize font-semibold">{t}</h3>
                  <select value={selected[t]||''} onChange={e=> setSelected(s=>({...s,[t]: e.target.value}))} className="bg-transparent border border-white/20 rounded-lg px-3 py-2">
                    <option value="">Select</option>
                    {(components[t]||[]).map(c => (
                      <option key={c.id} value={c.id} className="bg-[#0B0B12]">{c.name}</option>
                    ))}
                  </select>
                </div>
                {selected[t] && (
                  <div className="mt-3 text-sm text-gray-300">
                    {(components[t]||[]).find(x=>x.id===selected[t])?.description}
                  </div>
                )}
              </div>
            ))}
          </div>

          <aside className="bg-white/5 border border-white/10 rounded-2xl p-5 h-fit sticky top-6">
            <div>
              <label className="text-sm text-gray-400">Title</label>
              <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-black/30 border border-white/10" />
            </div>
            <div className="mt-4">
              <label className="text-sm text-gray-400">Description</label>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={3} className="w-full mt-1 px-3 py-2 rounded-lg bg:black/30 bg-black/30 border border-white/10" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-gray-400 text-sm">Estimated wattage</span>
              <span className="font-semibold">{watts} W</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-gray-400 text-sm">Subtotal</span>
              <span className="font-semibold">${'{'}total.toFixed(2)}</span>
            </div>
            {issues.length>0 && (
              <div className="mt-4 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-lg p-3">
                <div className="font-semibold mb-1">Compatibility issues</div>
                <ul className="list-disc pl-5 space-y-1">
                  {issues.map((m,i)=>(<li key={i}>{m}</li>))}
                </ul>
              </div>
            )}

            <button onClick={save} disabled={saving} className="mt-6 w-full px-4 py-3 rounded-xl bg-white text-black font-semibold disabled:opacity-60">Save build</button>
          </aside>
        </div>
      </div>
    </section>
  )
}
