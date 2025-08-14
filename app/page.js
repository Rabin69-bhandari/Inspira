"use client";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useInView, useAnimation } from "framer-motion";
import { FiArrowRight, FiCheck, FiBarChart2, FiUsers, FiPieChart } from "react-icons/fi";
import Loader from "./components/Loader";

export default function Home() {
  const { user, isSignedIn,isLoaded } = useUser();
  const router = useRouter();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Redirect immediately if signed in
      if (user?.id === "user_31EuwuplEAmDNTV8n0YgztSRftv") {
        router.replace("/admin"); // use replace instead of push
      } else {
        router.replace("/dashboard");
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  // Prevent rendering landing page while redirecting
  if (!isLoaded || isSignedIn) {
    return null; // or a spinner
  }

  

 

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-6"
          >
            <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
              <span className="text-indigo-600">Inspira</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                About
              </Link>
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Pricing
              </Link>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    Sign In
                  </button>
                </SignInButton>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md">
                    Get Started
                  </button>
                </SignInButton>
              </>
            )}
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-full max-w-2xl h-full bg-indigo-100 rounded-full filter blur-3xl opacity-20"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Elevate Your Productivity
            </span>
          </h1>
          <p className="mt-6 text-lg max-w-2xl mx-auto text-gray-600">
            Inspira is the modern workspace that helps teams and individuals achieve more with less effort.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <SignInButton mode="modal">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-300 shadow-lg flex items-center gap-2"
              >
                Get Started <FiArrowRight />
              </motion.button>
            </SignInButton>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 text-base font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors duration-300 shadow-sm"
            >
              Live Demo
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-16 relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 to-purple-50/20"></div>
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Dashboard preview"
            className="w-full h-auto"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Designed for modern workflows</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to streamline your work and collaborate effectively
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <FiBarChart2 className="w-8 h-8 text-indigo-600" />,
              title: "Advanced Analytics",
              description: "Real-time insights into your productivity and performance metrics.",
              features: ["Custom dashboards", "Performance trends", "Goal tracking"]
            },
            {
              icon: <FiUsers className="w-8 h-8 text-indigo-600" />,
              title: "Team Collaboration",
              description: "Work seamlessly with your team in real-time.",
              features: ["Shared workspaces", "Comment threads", "Live updates"]
            },
            {
              icon: <FiPieChart className="w-8 h-8 text-indigo-600" />,
              title: "Smart Automation",
              description: "Automate repetitive tasks and focus on what matters.",
              features: ["Workflow templates", "AI suggestions", "Scheduled tasks"]
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-indigo-50">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.features.map((item, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <FiCheck className="mr-2 text-indigo-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 rounded-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by teams worldwide</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their workflow
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: "Inspira has completely transformed how our team works. We're 40% more productive since switching.",
              name: "Sarah Johnson",
              role: "Marketing Director",
              avatar: "https://randomuser.me/api/portraits/women/44.jpg"
            },
            {
              quote: "The intuitive interface makes it easy to onboard new team members. Everyone loves using it!",
              name: "Michael Chen",
              role: "CTO",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg"
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-xl border border-gray-200 shadow-sm"
            >
              <blockquote className="text-lg text-gray-600 mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full mr-4" />
                <div>
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Ready to transform your workflow?</h2>
          <p className="text-lg max-w-2xl mx-auto text-indigo-100 mb-8">
            Join thousands of professionals who have already elevated their productivity with Inspira.
          </p>
          <div className="flex justify-center gap-4">
            <SignInButton mode="modal">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-base font-medium text-indigo-600 bg-white rounded-md hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              >
                Sign Up for Free
              </motion.button>
            </SignInButton>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-base font-medium text-white border border-white rounded-md hover:bg-white/10 transition-colors duration-300"
            >
              Contact Sales
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link href="/features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">Features</Link></li>
                <li><Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">Pricing</Link></li>
                <li><Link href="/integrations" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">About</Link></li>
                <li><Link href="/careers" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">Careers</Link></li>
                <li><Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="/help" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">Help Center</Link></li>
                <li><Link href="/tutorials" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">Tutorials</Link></li>
                <li><Link href="/webinars" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">Webinars</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">Privacy</Link></li>
                <li><Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">Terms</Link></li>
                <li><Link href="/security" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="font-bold text-lg text-indigo-600">
                Inspira
              </Link>
              <p className="text-sm text-gray-500 mt-2">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-gray-500 transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500 transition-colors duration-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}