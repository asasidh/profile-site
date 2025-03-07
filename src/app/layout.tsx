import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arun Sasidharan - GenAI Leader and Vibe Coder',
  description: 'Digital transformation leader with 20 years of experience in M&A, strategic partnerships, and global operations.',
  keywords: 'AI, GenAI, Business Leader, digital transformation, M&A, strategic partnerships, global operations, leadership, interactive agency, digital services'
}

// Update your layout file to include the ArticlesProvider
import { ArticlesProvider } from '@/context/ArticlesContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ArticlesProvider>
          <Sidebar />
          
          <div className="pl-[60px] md:pl-[280px] min-h-screen">
            {children}
          </div>
        </ArticlesProvider>
      </body>
    </html>
  )
}