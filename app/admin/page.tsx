'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface User {
  _id: string
  name: string
  email: string
  createdAt: string
  hasAccess: boolean
}

interface Blog {
  _id: string
  title: string
  subtitle: string
  description: string
  isPublished: boolean
  createdAt: string
}

interface Retreat {
  _id: string
  label: string
  title: string
  price: number
  description: string
  isActive: boolean
  createdAt: string
}

export default function AdminPanel() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [users, setUsers] = useState<User[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [retreats, setRetreats] = useState<Retreat[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    publishedBlogs: 0,
    activeRetreats: 0
  })

  useEffect(() => {
    // Check authentication - look for token in localStorage or cookies
    const adminToken = localStorage.getItem('adminToken') || 
                      document.cookie.split('; ').find(row => row.startsWith('adminToken='))?.split('=')[1]
    
    if (!adminToken) {
      router.push('/admin/login')
      return
    }

    fetchData()
  }, [router])

  const handleLogout = async () => {
    try {
      // Call logout API to clear cookie
      await fetch('/api/admin/logout', { method: 'POST' })
    } catch (error) {
      console.error('Error during logout:', error)
    }
    
    // Clear localStorage
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch all data in parallel
      const [usersRes, blogsRes, retreatsRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/blogs'),
        fetch('/api/retreats')
      ])

      const usersData = await usersRes.json()
      const blogsData = await blogsRes.json()
      const retreatsData = await retreatsRes.json()

      setUsers(usersData)
      setBlogs(blogsData)
      setRetreats(retreatsData)

      setStats({
        totalUsers: usersData.length,
        publishedBlogs: blogsData.filter((blog: Blog) => blog.isPublished).length,
        activeRetreats: retreatsData.filter((retreat: Retreat) => retreat.isActive).length
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleUserAccess = async (userId: string, hasAccess: boolean) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hasAccess: !hasAccess })
      })

      if (response.ok) {
        setUsers(users.map(user => 
          user._id === userId ? { ...user, hasAccess: !hasAccess } : user
        ))
      }
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const toggleBlogPublish = async (blogId: string, isPublished: boolean) => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !isPublished })
      })

      if (response.ok) {
        setBlogs(blogs.map(blog => 
          blog._id === blogId ? { ...blog, isPublished: !isPublished } : blog
        ))
        fetchData() // Refresh stats
      }
    } catch (error) {
      console.error('Error updating blog:', error)
    }
  }

  const toggleRetreatActive = async (retreatId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/retreats/${retreatId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive })
      })

      if (response.ok) {
        setRetreats(retreats.map(retreat => 
          retreat._id === retreatId ? { ...retreat, isActive: !isActive } : retreat
        ))
        fetchData() // Refresh stats
      }
    } catch (error) {
      console.error('Error updating retreat:', error)
    }
  }

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setUsers(users.filter(user => user._id !== userId))
        fetchData() // Refresh stats
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const deleteBlog = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setBlogs(blogs.filter(blog => blog._id !== blogId))
        fetchData() // Refresh stats
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  const deleteRetreat = async (retreatId: string) => {
    if (!confirm('Are you sure you want to delete this retreat?')) return

    try {
      const response = await fetch(`/api/retreats/${retreatId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setRetreats(retreats.filter(retreat => retreat._id !== retreatId))
        fetchData() // Refresh stats
      }
    } catch (error) {
      console.error('Error deleting retreat:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchData}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                🔄 Refresh
              </button>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 transition-colors duration-200"
              >
                Logout
              </button>
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                ← Back to Website
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-forest-500 text-forest-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-forest-500 text-forest-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'blogs'
                  ? 'border-forest-500 text-forest-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Blogs ({blogs.length})
            </button>
            <button
              onClick={() => setActiveTab('retreats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'retreats'
                  ? 'border-forest-500 text-forest-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Retreats ({retreats.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-forest-600">{stats.totalUsers}</p>
              <p className="text-sm text-gray-500">Blog subscribers</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Published Blogs</h3>
              <p className="text-3xl font-bold text-forest-600">{stats.publishedBlogs}</p>
              <p className="text-sm text-gray-500">Active articles</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Active Retreats</h3>
              <p className="text-3xl font-bold text-forest-600">{stats.activeRetreats}</p>
              <p className="text-sm text-gray-500">Available offerings</p>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">User Management</h2>
              <p className="text-sm text-gray-500">Manage blog subscribers and their access</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleUserAccess(user._id, user.hasAccess)}
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.hasAccess
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {user.hasAccess ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Blog Management</h2>
                  <p className="text-sm text-gray-500">Create and manage blog articles</p>
                </div>
                <Link
                  href="/admin/add-blog"
                  className="bg-forest-600 text-white px-4 py-2 rounded-lg hover:bg-forest-700 transition-colors duration-200"
                >
                  Add New Blog
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtitle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs.map((blog) => (
                    <tr key={blog._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{blog.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{blog.subtitle}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleBlogPublish(blog._id, blog.isPublished)}
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            blog.isPublished
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {blog.isPublished ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/admin/edit-blog/${blog._id}`}
                          className="text-forest-600 hover:text-forest-900 mr-4"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteBlog(blog._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'retreats' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Retreat Management</h2>
                  <p className="text-sm text-gray-500">Manage retreat offerings and pricing</p>
                </div>
                <Link
                  href="/admin/add-retreat"
                  className="bg-forest-600 text-white px-4 py-2 rounded-lg hover:bg-forest-700 transition-colors duration-200"
                >
                  Add New Retreat
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {retreats.map((retreat) => (
                    <tr key={retreat._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{retreat.label}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{retreat.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${retreat.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleRetreatActive(retreat._id, retreat.isActive)}
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            retreat.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {retreat.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(retreat.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/admin/edit-retreat/${retreat._id}`}
                          className="text-forest-600 hover:text-forest-900 mr-4"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteRetreat(retreat._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 