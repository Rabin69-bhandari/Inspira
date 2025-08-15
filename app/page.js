"use client";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useInView, useAnimation } from "framer-motion";
import { FiArrowRight, FiCheck, FiBarChart2, FiUsers, FiPieChart } from "react-icons/fi";

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
  };

  
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
  <div className="container relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
    {/* Logo on the left */}
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2"
    >
    <Link href="/" className="flex items-center space-x-2 font-bold text-3xl">
    <span className="text-indigo-600">Inspira</span>
</Link>

    </motion.div>

    {/* Nav centered */}
{/* Nav centered */}
<nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-12 text-lg font-semibold">
  <Link href="/about" className="text-black-600 hover:text-black-900 transition-colors duration-300">
    About
  </Link>
  <Link href="/features" className="text-black-600 hover:text-black-900 transition-colors duration-300">
    Features
  </Link>
  <Link href="/pricing" className="text-black-600 hover:text-black-900 transition-colors duration-300">
    Pricing
  </Link>
</nav>


    {/* Auth buttons on the right */}
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="ml-auto flex items-center space-x-4"
    >
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <>
          <SignInButton mode="modal">
            <button className="px-4 py-2 text-sm font-medium text-black bg-black-600 rounded-md hover:bg-white-700 transition-colors duration-300">
              Sign In
            </button>
          </SignInButton>
          <SignInButton mode="modal">
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-300">
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
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Elevate Your Productivity
            </span>
          </h1>
          <p className="mt-6 text-lg max-w-2xl mx-auto text-gray-600">
            Inspira is the all-in-one workspace designed to help teams and individuals stay organized, collaborate seamlessly, and achieve more every day with less effort, so you can focus on what truly matters.
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
            src="https://i.pinimg.com/736x/6c/fb/3f/6cfb3f7aa8ebffea0dc6f24c5a9b1b36.jpg"
            alt="Dashboard preview"
            className="w-full max-w-10xl h-auto mx-auto rounded-8xl" />
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Designed for modern workflows</h2>
          <p className="text-gray-600 max-w-x3l mx-auto">
          Streamline your work and collaborate effortlessly. </p>
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

<footer className="border-t py-12 bg-black">
  <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
      <div>
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Product</h3>
        <ul className="space-y-3 text-lg text-white">
          <li><Link href="/features">Features</Link></li>
          <li><Link href="/pricing">Pricing</Link></li>
          <li><Link href="/integrations">Integrations</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Company</h3>
        <ul className="space-y-3 text-lg text-white">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/careers">Careers</Link></li>
          <li><Link href="/blog">Blog</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Resources</h3>
        <ul className="space-y-3 text-lg text-white">
          <li><Link href="/help">Help Center</Link></li>
          <li><Link href="/tutorials">Tutorials</Link></li>
          <li><Link href="/webinars">Webinars</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Legal</h3>
        <ul className="space-y-3 text-lg text-white">
          <li><Link href="/privacy">Privacy</Link></li>
          <li><Link href="/terms">Terms</Link></li>
          <li><Link href="/security">Security</Link></li>
        </ul>
      </div>
    </div>

    <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
        <Link href="/" className="font-bold text-2xl text-indigo-600">
          Inspira
        </Link>
        <p className="text-sm text-white mt-2">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
      <div className="flex space-x-6">
        {/* Social icons here */}
      </div>
    </div>
  </div>
</footer>
</div>
  );
}