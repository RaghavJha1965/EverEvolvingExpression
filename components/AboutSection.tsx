import Link from 'next/link'

export default function AboutSection() {
  return (
    <section className="py-20 min-h-screen" style={{ backgroundColor: '#e7eddc' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif text-forest-600 mb-8">
            ABOUT ME
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 rounded-full overflow-hidden bg-gradient-to-br from-forest-200 to-sage-300 flex items-center justify-center">
              {/* Placeholder for profile image */}
              <div className="text-forest-600 text-6xl font-serif">JW</div>
            </div>
          </div>

          {/* Bio Text */}
          <div className="flex-1 space-y-6">
            <div className="space-y-6 text-lg text-forest-600 leading-relaxed">
              <p>
                My story begins with my own healing and transformation work in my mid-twenties, 
                and led to passion for helping others unveil their most authentic self.
              </p>
              
              <p>
                I graduated from an extensive constellation therapy training program in 2020 and 
                certified as an emotional clearing method, and life coaching.
              </p>
              
              <p>
                I'm excited to be at this stage and guide clients through this journey to a true 
                journey using an integrative approach.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-block bg-forest-600 text-white px-8 py-3 rounded-lg hover:bg-forest-700 transition-colors duration-200 font-medium uppercase tracking-wide"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 