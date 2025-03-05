'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiHome, FiUser, FiFolder, FiFileText, FiMail } from 'react-icons/fi'
import { FaTwitter, FaLinkedin, FaBlog } from 'react-icons/fa'
import { SiSubstack } from 'react-icons/si'

const Sidebar = () => {
  const menuItems = [
    { icon: FiHome, label: 'Home', href: '/' },
    // Projects link removed
    { icon: FiFileText, label: 'Articles', href: '/articles' },
  ]

  const socialLinks = [
    { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/arunsasi' },
    { icon: FaTwitter, label: 'Twitter', href: 'https://x.com/arunsasi' },
    { icon: SiSubstack, label: 'Substack', href: 'https://deepgains.substack.com/' },
  ]

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-[280px] bg-sidebar-bg p-6 flex flex-col"
    >
      <div className="flex items-center gap-4 mb-8">
        <Image
          src="/profile.jpg"
          alt="Arun Sasidharan"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <h2 className="font-semibold text-primary">Arun Sasidharan</h2>
          <p className="text-sm text-secondary">AI Enthusiast</p>
          <p className="text-sm text-secondary">Vibe Coder</p>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 text-secondary hover:text-primary hover:bg-white rounded-lg transition-colors"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Connect</h3>
        <div className="flex flex-col space-y-3">
          <a 
            href="https://x.com/arunsasi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-secondary hover:text-accent transition-colors"
          >
            <FaTwitter className="w-5 h-5" />
            <span>Twitter</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/arunsasi/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-secondary hover:text-accent transition-colors"
          >
            <FaLinkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
          <a 
            href="https://deepgains.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-secondary hover:text-accent transition-colors"
          >
            <SiSubstack className="w-5 h-5" />
            <span>Substack</span>
          </a>
        </div>
      </div>
    </motion.aside>
  )
}

export default Sidebar