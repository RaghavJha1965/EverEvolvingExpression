'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'

interface Blog {
  _id: string
  title: string
  subtitle: string
  description: string
  sections: Array<{
    heading: string
    content: string
  }>
  image: string
  bgColor: string
  isPublished: boolean
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Blog[]>([])
  const [showSignupForm, setShowSignupForm] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const hasSubmittedBlogForm = localStorage.getItem('hasSubmittedBlogForm')
    if (hasSubmittedBlogForm) {
      setHasSubmitted(true)
      fetchBlogs()
    } else {
      setShowSignupForm(true)
      setLoading(false)
    }
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const userData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        localStorage.setItem('hasSubmittedBlogForm', 'true')
        setHasSubmitted(true)
        setShowSignupForm(false)
        fetchBlogs()
      } else {
        const error = await response.json()
        alert(error.message || 'Something went wrong')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (showSignupForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Connect to Evolve</h2>
              <p className="text-lg text-gray-700 font-serif">
                Enter your information below to access<br />our transformative articles and insights.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 transition-colors duration-200 shadow-md w-full"
              >
                {isSubmitting ? 'Submitting...' : 'Access Articles'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif text-forest-600 mb-4">
            Connect to Evolve
          </h1>
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

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block bg-forest-600 text-white px-6 py-3 rounded-lg hover:bg-forest-700 transition-colors duration-200 font-medium"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  )
} 