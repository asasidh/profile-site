// Move this file to src/app/page.tsx.
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
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
          {[
            '/images/city-night.jpg',
            '/images/hot-air-balloons.jpg',
            '/images/night-street.jpg',
            '/images/ocean-night.jpg'
          ].map((src, index) => (
            <motion.div
              key={index}
              className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden relative shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-full h-full bg-gray-200 rounded-xl" />
              {/* Images would be loaded here in a real implementation */}
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
            I've spent over two decades at the intersection of technology, business, and digital transformation—leading teams, scaling global operations, and driving strategic growth. My primary focus now is on Generative AI and how it can be used to solve real customer problems. From automating workflows to reimagining creative processes, I'm deeply interested in how AI can reshape industries and create tangible business impact.
          </motion.p>

          <motion.p variants={item} className="text-secondary">
            My career has taken me across the globe, with extensive experience in the U.S. and India. I've also worked closely with large enterprise customers across South and Central America, Japan, and Australia, supporting their digital transformation initiatives. Along the way, I've built and led high-performing teams specializing in Mobile Development, IoT, AI, and Design—bringing together developers, designers, researchers, and strategists to create innovative digital solutions that bridge technology and human experience.
          </motion.p>

          <motion.p variants={item} className="text-secondary">
            Early on, I pioneered the use of AI in market research, uncovering new ways to extract insights and inform strategy. Over the years, I've led M&A initiatives, forged strategic partnerships, and worked closely with industry analysts to position organizations at the forefront of digital innovation. I've helped scale global design studios, run customer collaboration centers, and worked hands-on with cloud and AI teams to push the boundaries of what's possible.
          </motion.p>

          <motion.p variants={item} className="text-secondary">
            What drives me is the challenge of making emerging technology work in the real world—taking ideas from concept to execution and turning hype into real impact. Whether it's through AI-driven automation, data visualization, or next-gen digital experiences, I'm always looking for ways to combine technology and strategy in meaningful ways.
          </motion.p>

          <motion.p variants={item} className="text-secondary">
            Let's connect and explore how we can put Generative AI to work in solving your biggest challenges.
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
              title: 'Mergers & Acquisitions (M&A)',
              description: 'Identifying, evaluating, and integrating opportunities within the digital and interactive space.'
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