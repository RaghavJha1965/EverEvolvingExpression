'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    id: 1,
    quote: "My session with Joel shed new insights into how I've been operating in the world. His method offered ways to identify issues in my personal life and presented a more constructive way forward. Super grateful for the experience!",
    name: "BEN",
    title: "35, Marketing Consultant",
    initial: "B"
  },
  {
    id: 2,
    quote: "Joel's approach to healing is truly transformative. He helped me uncover patterns I didn't even know existed and guided me toward authentic self-expression.",
    name: "SARAH",
    title: "42, Therapist",
    initial: "S"
  },
  {
    id: 3,
    quote: "The retreat experience was life-changing. Joel creates such a safe space for deep healing and personal growth. I left feeling completely renewed.",
    name: "MICHAEL",
    title: "38, Entrepreneur",
    initial: "M"
  },
  {
    id: 4,
    quote: "Working with Joel has been a game-changer for my personal development. His insights are profound and his guidance is gentle yet powerful.",
    name: "EMMA",
    title: "29, Yoga Instructor",
    initial: "E"
  }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        nextTestimonial()
      }
    }, 6000) // Change every 6 seconds

    return () => clearInterval(timer)
  }, [currentIndex, isTransitioning])

  const nextTestimonial = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const prevTestimonial = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToTestimonial = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 min-h-screen" style={{ backgroundColor: '#e7def9' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif text-forest-600 mb-8">
            TESTIMONIALS
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Quote Section */}
          <div className="space-y-8">
            <div className="relative min-h-[200px]">
              <span className="text-7xl font-serif text-forest-600 absolute -top-6 -left-2 opacity-70">"</span>
              <blockquote 
                className={`text-xl text-forest-600 leading-relaxed pl-8 pt-2 transition-all duration-500 ${
                  isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
                }`}
              >
                {currentTestimonial.quote}
              </blockquote>
            </div>
            
            <div className={`pl-8 transition-all duration-500 ${
              isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
            }`}>
              <p className="text-xl font-bold text-forest-600">{currentTestimonial.name}</p>
              <p className="text-gray-600 text-lg">{currentTestimonial.title}</p>
            </div>
          </div>

          {/* Profile Image and Button */}
          <div className="flex flex-col items-center lg:items-end space-y-8">
            {/* Circular Profile Image */}
            <div className={`w-80 h-80 rounded-full bg-gradient-to-br from-sage-200 to-forest-300 flex items-center justify-center shadow-lg transition-all duration-500 ${
              isTransitioning ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
            }`}>
              <span className="text-7xl font-serif text-forest-600 font-bold">
                {currentTestimonial.initial}
              </span>
            </div>

            {/* Book a Call Button */}
            <Link
              href="/book"
              className="inline-flex items-center space-x-3 bg-forest-600 text-white px-8 py-4 rounded-lg hover:bg-forest-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="uppercase tracking-wide">Book a Call</span>
            </Link>
          </div>
        </div>

        {/* Carousel Navigation - Centered */}
        <div className="flex items-center justify-center space-x-6 mt-12">
          <button
            onClick={prevTestimonial}
            disabled={isTransitioning}
            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-forest-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextTestimonial}
            disabled={isTransitioning}
            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
} 