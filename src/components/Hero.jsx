import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-[#0B0B12] text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="backdrop-blur-sm/0">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            RigArchitect
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-gray-300 max-w-2xl">
            Design, validate, and showcase PC builds with real compatibility checks. Powered by a shared components database.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#configurator" className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:opacity-90 transition">Start Building</a>
            <a href="#showcase" className="px-6 py-3 border border-white/30 rounded-xl font-semibold hover:bg-white/10 transition">Explore Builds</a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B12]/20 to-[#0B0B12]" />
    </section>
  )
}
