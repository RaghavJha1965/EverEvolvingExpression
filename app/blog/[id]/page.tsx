'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'

interface BlogSection {
  heading: string
  content: string
}

interface Blog {
  _id: string
  title: string
  subtitle: string
  description: string
  sections: BlogSection[]
  image: string
  bgColor: string
  isPublished: boolean
}

export default function BlogArticle() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<Blog | null>(null)
  const [showSignupForm, setShowSignupForm] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const hasSubmittedBlogForm = localStorage.getItem('hasSubmittedBlogForm')
    if (hasSubmittedBlogForm) {
      setHasSubmitted(true)
      fetchArticle()
    } else {
      setShowSignupForm(true)
      setLoading(false)
    }
  }, [params.id])

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/blogs/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setArticle(data)
      } else {
        console.error('Article not found')
        router.push('/blog')
      }
    } catch (error) {
      console.error('Error fetching article:', error)
      router.push('/blog')
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
        fetchArticle()
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
          <p className="mt-4 text-gray-600">Loading article...</p>
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

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => router.push('/blog')}
              className="inline-block bg-forest-600 text-white px-6 py-3 rounded-lg hover:bg-forest-700 transition-colors duration-200 font-medium"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif text-forest-600 mb-4">
            {article.subtitle}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {article.description}
          </p>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {article.sections && article.sections.length > 0 ? (
                article.sections.map((section, index) => (
                  <div key={index}>
                    <h2 className="text-xl font-serif text-forest-600 font-semibold mb-4">
                      {section.heading}
                    </h2>
                    <p className="text-gray-800 font-sans leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>Article content is being prepared.</p>
                </div>
              )}
            </div>

            {/* Right Column - Image */}
            <div className="flex items-center justify-center">
              <div className="w-full h-80 bg-gradient-to-br from-sage-100 to-sage-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm">Article Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push('/blog')}
            className="inline-block bg-forest-600 text-white px-6 py-3 rounded-lg hover:bg-forest-700 transition-colors duration-200 font-medium"
          >
            Back to Blog
          </button>
        </div>
      </div>
    </div>
  )
}