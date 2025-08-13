'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
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

export default function EditRetreat() {
  const params = useParams()
  const router = useRouter()
  const [retreat, setRetreat] = useState<Retreat | null>(null)
  const [formData, setFormData] = useState({
    label: '',
    title: '',
    price: '',
    description: '',
    bgColor: 'bg-white'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const adminToken = localStorage.getItem('adminToken') || 
                      document.cookie.split('; ').find(row => row.startsWith('adminToken='))?.split('=')[1]
    
    if (!adminToken) {
      router.push('/admin/login')
      return
    }

    fetchRetreat()
  }, [params.id, router])

  const fetchRetreat = async () => {
    try {
      const response = await fetch(`/api/retreats/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setRetreat(data)
        setFormData({
          label: data.label,
          title: data.title,
          price: data.price.toString(),
          description: data.description,
          bgColor: data.bgColor
        })
      } else {
        alert('Retreat not found')
        router.push('/admin')
      }
    } catch (error) {
      console.error('Error fetching retreat:', error)
      alert('Error loading retreat')
      router.push('/admin')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/retreats/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price)
        }),
      })

      if (response.ok) {
        alert('Retreat updated successfully!')
        router.push('/admin')
      } else {
        const error = await response.json()
        alert(error.message || 'Something went wrong')
      }
    } catch (error) {
      console.error('Error updating retreat:', error)
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
          <p className="mt-4 text-gray-600">Loading retreat...</p>
        </div>
      </div>
    )
  }

  if (!retreat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Retreat Not Found</h1>
          <Link
            href="/admin"
            className="inline-block bg-forest-600 text-white px-6 py-3 rounded-lg hover:bg-forest-700 transition-colors duration-200"
          >
            Back to Admin
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Edit Retreat</h1>
            </div>
            <Link
              href="/admin"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              ← Back to Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-2">
                Label
              </label>
              <input
                type="text"
                id="label"
                name="label"
                value={formData.label}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                placeholder="e.g., RETREAT 1, SINGLE LIFE"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                placeholder="e.g., Single Constellation Therapy Session"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                placeholder="e.g., 155"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                placeholder="Describe the retreat or session..."
              />
            </div>

            <div>
              <label htmlFor="bgColor" className="block text-sm font-medium text-gray-700 mb-2">
                Background Color
              </label>
              <select
                id="bgColor"
                name="bgColor"
                value={formData.bgColor}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent"
              >
                <option value="bg-white">White</option>
                <option value="bg-sage-100">Sage</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                href="/admin"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-forest-600 text-white rounded-md hover:bg-forest-700 disabled:bg-gray-400 transition-colors duration-200"
              >
                {isSubmitting ? 'Updating...' : 'Update Retreat'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 