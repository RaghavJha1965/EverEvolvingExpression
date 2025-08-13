import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16" style={{ backgroundColor: '#e7eddc' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-serif text-forest-600 leading-tight font-normal">
              ever evolving expression
            </h1>
            
            <div className="space-y-6 text-base text-gray-700 leading-relaxed max-w-2xl">
              <p className="font-sans">
                We are born with our own unique expression, a way of being true to ourselves. 
                Through conditioning and trauma our authentic expression is masked, suppressed 
                usually with the intent of protecting ourselves.
              </p>
              <p className="font-sans">
                As we heal and free ourselves from these limiting belief structures we built 
                to protect us, we uncover our true selves and make conscious choices of how to be. 
                Let the work i offer be one of the stepping stones to the unveiling of your true 
                self and the creator within.
              </p>
            </div>

            <Link
              href="/book"
              className="inline-block bg-forest-600 text-white px-6 py-3 rounded-lg hover:bg-forest-700 transition-colors duration-200 font-medium text-base"
            >
              Book a Session
            </Link>
          </div>

          {/* Right Column - Circular Graphic and Name */}
          <div className="flex flex-col items-center lg:items-end space-y-6">
            {/* Circular Graphic */}
            <div className="relative">
              <div className="w-80 h-80 rounded-full border-2 border-beige bg-gradient-to-br from-sage-200 to-sage-300 flex items-center justify-center overflow-hidden">
                {/* Leaf-like shapes pattern */}
                <div className="absolute inset-0">
                  <svg viewBox="0 0 320 320" className="w-full h-full">
                    <defs>
                      <pattern id="leafPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                        {/* Leaf shape */}
                        <path d="M40 20 Q50 10 60 20 Q50 30 40 20" fill="none" stroke="currentColor" strokeWidth="1" className="text-sage-400"/>
                        <path d="M40 20 Q30 30 40 40 Q50 30 40 20" fill="none" stroke="currentColor" strokeWidth="1" className="text-sage-400"/>
                        {/* Teardrop shape */}
                        <path d="M40 20 Q45 15 50 20 Q45 25 40 20" fill="none" stroke="currentColor" strokeWidth="1" className="text-sage-400"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#leafPattern)"/>
                  </svg>
                </div>
                
                {/* Concentric circles */}
                <div className="relative z-10 w-64 h-64 rounded-full border-2 border-sage-300 bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border-2 border-sage-300 bg-gradient-to-br from-sage-200 to-sage-300 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-forest-200 to-forest-300 opacity-60"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="text-right">
              <h2 className="text-xl font-sans text-gray-700 font-normal">
                joel woolhouse
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 