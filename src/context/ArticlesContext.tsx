'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Define the article type
interface Article {
  title: string
  link: string
  pubDate: string
  content: string
  description: string
  thumbnail?: string
}

interface ArticlesContextType {
  articles: Article[]
  loading: boolean
  error: string | null
}

const ArticlesContext = createContext<ArticlesContextType>({
  articles: [],
  loading: true,
  error: null
})

export const useArticles = () => useContext(ArticlesContext)

export const ArticlesProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Use a CORS proxy
        const response = await fetch('https://api.allorigins.win/get?url=' + 
          encodeURIComponent('https://deepgains.substack.com/feed'))
        
        if (!response.ok) {
          throw new Error('Failed to fetch RSS feed')
        }
        
        const data = await response.json()
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(data.contents, 'text/xml')
        
        const items = xmlDoc.querySelectorAll('item')
        const parsedArticles: Article[] = []
        
        items.forEach((item) => {
          let thumbnail = ''
          
          // Try to get image from enclosure tag first
          const enclosure = item.querySelector('enclosure')
          if (enclosure?.getAttribute('type')?.startsWith('image/')) {
            thumbnail = enclosure.getAttribute('url') || ''
          }

          // If no enclosure, try to get image from content:encoded
          if (!thumbnail) {
            const content = item.querySelector('content\\:encoded')?.textContent || ''
            const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i)
            if (imgMatch && imgMatch[1]) {
              thumbnail = imgMatch[1]
            }
          }

          // If still no image, try to get from description
          if (!thumbnail) {
            const description = item.querySelector('description')?.textContent || ''
            const imgMatch = description.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i)
            if (imgMatch && imgMatch[1]) {
              thumbnail = imgMatch[1]
            }
          }

          parsedArticles.push({
            title: item.querySelector('title')?.textContent || 'Untitled',
            link: item.querySelector('link')?.textContent || '#',
            pubDate: item.querySelector('pubDate')?.textContent || '',
            content: item.querySelector('content\\:encoded')?.textContent || '',
            description: item.querySelector('description')?.textContent || '',
            thumbnail: thumbnail
          })
        })
        
        // Only keep the top 6 articles
        setArticles(parsedArticles.slice(0, 6))
        setLoading(false)
      } catch (err) {
        console.error('Error fetching RSS feed:', err)
        setError('Failed to load articles. Please try again later.')
        setLoading(false)
      }
    }
    
    // Start fetching articles immediately
    fetchArticles()
  }, [])

  return (
    <ArticlesContext.Provider value={{ articles, loading, error }}>
      {children}
    </ArticlesContext.Provider>
  )
}