import Link from 'next/link'

const sessions = [
  {
    id: 1,
    label: "retreat 1",
    title: "Single Constellation Therapy Session",
    price: "$155",
    description: "A single constellation session to bring movement to a trouble/pain/problem situation.",
  },
  {
    id: 2,
    label: "Single Life",
    title: "Single Life Consulting Session",
    price: "$88",
    description: "A 90-minute consulting session to help you gain clarity through strategic and pointed conversation.",
  },
  {
    id: 3,
    price: "$455",
    title: "Single Life Consulting Session",
    description: "A 90-minute consulting session to help you gain clarity through strategic and pointed conversation.",
  }
]

export default function SessionsSection() {
  return (
    <section className="py-20 min-h-screen" style={{ backgroundColor: '#e7def9' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif text-forest-600 mb-4">
            Sessions & Offerings
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore articles on personal growth, healing, and self-discovery.
          </p>
        </div>

        {/* Session Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.map((session, index) => (
            <div key={session.id || index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
              <div className="mb-6">
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  {session.label || session.price}
                </span>
              </div>
              
              <h3 className="text-2xl font-serif text-forest-600 mb-4">
                {session.title}
              </h3>
              
              {session.price && session.label && (
                <p className="text-gray-700 mb-4 font-medium">
                  {session.price}
                </p>
              )}
              
              <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                {session.description}
              </p>
              
              <div className="mt-auto">
                <Link
                  href="/book"
                  className="inline-block w-full bg-forest-600 text-white text-center py-3 rounded-lg hover:bg-forest-700 transition-colors duration-200 font-medium"
                >
                  Click to Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 