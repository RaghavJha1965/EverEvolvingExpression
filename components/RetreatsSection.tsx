'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Retreat {
  _id: string
  label: string
  title: string
  price: number
  description: string
  bgColor: string
  isActive: boolean
}

export default function RetreatsSection() {
  const [retreats, setRetreats] = useState<Retreat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRetreats()
  }, [])

  const fetchRetreats = async () => {
    try {
      const response = await fetch('/api/retreats?active=true')
      if (response.ok) {
        const data = await response.json()
        setRetreats(data)
      }
    } catch (error) {
      console.error('Error fetching retreats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading sessions...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif text-forest-600 mb-4">
            Retreats
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore our transformative sessions and retreats designed to support your personal growth and healing journey.
          </p>
        </div>
        
        {retreats.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No active sessions available at the moment.</p>
            <p className="text-sm mt-2">Please check back later or contact us for more information.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {retreats.map((retreat) => (
              <div key={retreat._id} className={`${retreat.bgColor} rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full`}>
                <div className="mb-4">
                  <span className="text-sm font-medium text-forest-600 uppercase tracking-wide">
                    {retreat.label}
                  </span>
                </div>
                <h3 className="text-2xl font-serif text-gray-800 mb-2">
                  {retreat.title}
                </h3>
                <div className="text-3xl font-bold text-forest-600 mb-4">
                  ${retreat.price}
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                  {retreat.description}
                </p>
                <div className="mt-auto">
                  <Link
                    href="/book"
                    className="inline-block bg-forest-600 text-white px-6 py-3 rounded-lg hover:bg-forest-700 transition-colors duration-200 font-medium"
                  >
                    Click to Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
} 