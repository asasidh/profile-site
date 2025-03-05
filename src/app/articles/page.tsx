'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useArticles } from '@/context/ArticlesContext'

export default function Articles() {
  const { articles, loading, error } = useArticles()

  // Extract a short excerpt from the content
  const getExcerpt = (content: string, maxLength = 150) => {
    // Remove HTML tags
    const text = content.replace(/<[^>]*>?/gm, '')
    // Trim and limit length
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <span className="text-accent">📝</span>
          </div>
          <h1 className="text-4xl font-bold">Articles</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
            <p className="mt-4">Check out my blog directly at <a href="https://deepgains.substack.com/" target="_blank" rel="noopener noreferrer" className="text-accent underline">deepgains.substack.com</a></p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {articles.map((article, index) => (
                <motion.div
                  key={article.link}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="aspect-video relative bg-gray-100">
                    {article.thumbnail ? (
                      <Image 
                        src={article.thumbnail} 
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        priority={index < 2}
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-accent/10">
                        <span className="text-4xl">📝</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                    <p className="text-secondary mb-4">{getExcerpt(article.description || article.content)}</p>
                    <Link 
                      href={article.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent font-medium hover:underline inline-flex items-center"
                    >
                      Read more
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                href="https://deepgains.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent text-white py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Visit My Blog for More Articles
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  )
}