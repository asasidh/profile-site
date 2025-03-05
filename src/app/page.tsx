'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useArticles } from '@/context/ArticlesContext'

export default function About() {
  // Add articles context
  const { articles } = useArticles()

  // State to hold randomized images
  const [randomizedImages, setRandomizedImages] = useState<string[]>([])

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }
  
  // Randomize images on component mount
  useEffect(() => {
    const images = [
      '/light-house.jpg',
      '/butterfly.jpg',
      '/swan.jpg',
      '/lizard.jpg'
    ]
    
    // Fisher-Yates shuffle algorithm
    const shuffled = [...images]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    
    setRandomizedImages(shuffled)
  }, [])

  // Add prefetch effect
  useEffect(() => {
    // Articles will start loading automatically through the ArticlesContext
    // We just need to access the context to trigger the fetch
  }, [])

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
            <span className="text-accent">💬</span>
          </div>
          <h1 className="text-4xl font-bold">About Me</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {randomizedImages.map((src, index) => (
            <motion.div
              key={index}
              className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden relative shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Image
                src={src}
                alt={`Lifestyle image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw"
                className="object-cover"
                priority={index < 2}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.p variants={item} className="text-lg">
            Hello, I'm Arun Sasidharan — a seasoned digital transformation leader with over 20 years of experience navigating the evolving landscape of interactive agencies and digital services.
          </motion.p>

          <motion.p variants={item} className="text-secondary">
            Throughout my career, I've been at the forefront of digital innovation, orchestrating strategic growth initiatives that have reshaped how businesses approach their digital presence. My expertise lies in identifying opportunities for transformation and executing complex strategies that drive measurable results.
          </motion.p>

          <motion.p variants={item} className="text-secondary">
            My journey has been defined by successful implementation of GenAI solutions, integration and scaling of mergers and acquisitions, forging powerful strategic partnerships, and leading global operations across diverse markets. I've cultivated a unique ability to bridge the gap between visionary thinking and practical implementation, ensuring that ambitious goals translate into tangible outcomes.
          </motion.p>

          <motion.p variants={item} className="text-secondary">
          I have also built and managed global design studios, creating spaces where creativity, technology, and business strategy come together to drive innovation. These studios have played a critical role in helping enterprises adopt human-centered design, leverage AI-driven experiences, and scale their digital transformation efforts. By fostering cross-disciplinary collaboration, I’ve helped shape digital experiences that are both cutting-edge and user-centric.
          </motion.p>

          <motion.p variants={item} className="text-secondary">
            What distinguishes my approach is a deep commitment to both business excellence and technological innovation. I believe that true digital leadership requires a harmonious blend of strategic foresight, operational expertise, and a genuine understanding of emerging technologies and their potential impact on business models.
          </motion.p>

          <motion.p variants={item} className="text-secondary">
          What drives me is the challenge of making emerging technology work in the real world—taking ideas from concept to execution and turning hype into real impact. Whether it’s through AI-driven automation, data visualization, or next-gen digital experiences, I’m always looking for ways to combine technology and strategy in meaningful ways.
          </motion.p>

          <motion.p variants={item} className="text-secondary">
          Let’s connect and explore how we can put Generative AI to work in solving your biggest challenges.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Skills Section */}
      <motion.section
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-8">Skills & Expertise</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: 'Generative AI',
              description: 'Driving AI-led transformation and solving business challenges with AI-driven solutions.'
            },
            {
              title: 'Business Strategy & Growth',
              description: 'Developing and executing strategies to scale digital services and expand global operations.'
            },
            {
              title: 'Digital Transformation',
              description: 'Helping enterprises modernize through AI, cloud, IoT, and advanced digital solutions.'
            },
            {
              "title": "Global Design Studio Leadership",
              "description": "Enabling enterprises to adopt human-centered design, leverage AI-driven experiences, and scale digital transformation efforts."
            },
            {
              title: 'Strategic Partnerships & Analyst Relations',
              description: 'Collaborating with industry leaders, analysts, and partners to drive thought leadership and market positioning.'
            },
            {
              title: 'Innovation & Emerging Technology',
              description: 'Exploring and implementing cutting-edge tech solutions to create real-world business impact.'
            },
            {
              title: 'Customer Experience & Digital Services',
              description: 'Crafting AI-enhanced customer experiences and digital engagement strategies.'
            },
            {
              title: 'Cross-Cultural Leadership',
              description: 'Supporting enterprise customers across the U.S., South & Central America, Japan, and Australia.'
            }
          ].map((skill, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <h3 className="text-xl font-semibold mb-2 text-accent">{skill.title}</h3>
              <p className="text-secondary">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}