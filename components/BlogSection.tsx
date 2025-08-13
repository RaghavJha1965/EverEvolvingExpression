'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Blog {
  _id: string
  title: string
  subtitle: string
  description: string
  bgColor: string
  isPublished: boolean
}

export default function BlogSection() {
  const [articles, setArticles] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs?published=true')
      if (response.ok) {
        const data = await response.json()
        setArticles(data)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-sage-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading articles...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-sage-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif text-forest-600 mb-4">
            Connect to Evolve
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore our transformative articles and insights designed to support your personal growth journey.
          </p>
        </div>
        
        {articles.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No articles available at the moment.</p>
            <p className="text-sm mt-2">Please check back later for new content.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article._id} className={`${article.bgColor} rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full`}>
                <h3 className="text-2xl font-serif text-forest-600 mb-4">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                  {article.description}
                </p>
                <div className="mt-auto">
                  <Link
                    href={`/blog/${article._id}`}
                    className="inline-block bg-sage-600 text-white px-6 py-3 rounded-lg hover:bg-sage-700 transition-colors duration-200 font-medium"
                  >
                    Read More
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