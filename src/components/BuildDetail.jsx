import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function BuildDetail(){
  const { id } = useParams()
  const [build, setBuild] = useState(null)
  const [comment, setComment] = useState('')
  const [liking, setLiking] = useState(false)

  const load = ()=>{
    fetch(`${API}/api/builds/${id}`).then(r=>r.json()).then(setBuild)
  }
  useEffect(load, [id])

  const like = async () => {
    setLiking(true)
    await fetch(`${API}/api/builds/${id}/like?user_id=guest`, {method:'POST'})
    setLiking(false)
    load()
  }

  const addComment = async () => {
    if(!comment.trim()) return
    await fetch(`${API}/api/builds/${id}/comment`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({build_id: id, content: comment, author_name:'Guest'})})
    setComment('')
    load()
  }

  if(!build) return <div className="min-h-screen bg-[#0B0B12] text-white flex items-center justify-center">Loading…</div>

  return (
    <div className="min-h-screen bg-[#0B0B12] text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <a href="/" className="text-sm text-gray-400">← Back</a>
        <h1 className="text-3xl font-semibold mt-2">{build.title}</h1>
        <p className="text-gray-400 mt-1">{build.description}</p>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {build.components_expanded?.map((bc,i)=>(
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-sm text-gray-400">{bc.type}</div>
                <div className="font-medium">{bc.component?.name}</div>
              </div>
            ))}
          </div>
          <aside className="p-5 rounded-2xl bg-white/5 border border-white/10 h-fit">
            <div className="text-sm text-gray-400">Likes</div>
            <div className="text-2xl font-semibold">{build.likes || 0}</div>
            <button onClick={like} disabled={liking} className="mt-4 w-full px-4 py-2 bg-white text-black rounded-xl">Like</button>
            <div className="mt-6">
              <div className="font-semibold mb-2">Add comment</div>
              <textarea value={comment} onChange={e=>setComment(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10" />
              <button onClick={addComment} className="mt-3 w-full px-4 py-2 rounded-xl bg-white text-black">Post</button>
            </div>
          </aside>
        </div>

        <div className="mt-10">
          <div className="font-semibold mb-2">Comments</div>
          <div className="space-y-3">
            {build.comments?.map(c => (
              <div key={c.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-sm text-gray-400">{c.author_name || 'Anon'}</div>
                <div>{c.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
