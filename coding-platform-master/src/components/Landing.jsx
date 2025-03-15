import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code, Terminal, User, ArrowRight, BarChart, Shield } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen font-sans bg-[#0A0A0A] text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[size:20px_20px] opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,255,255,0.02)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6">
              <motion.span
                className="bg-[#1E1E1E] text-[#00FF88] text-sm font-mono px-4 py-2 rounded-full border border-[#333333]"
                whileHover={{ scale: 1.05 }}
              >
                FULL-STACK TESTING PLATFORM
              </motion.span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 text-[#00FF88]">
              ProcX
            </h1>
            <p className="text-xl md:text-2xl text-[#A0A0A0] mb-12 max-w-3xl mx-auto">
              The ultimate platform for full-stack coding assessments. Test your
              skills, track your progress, and land your dream job.
            </p>
            <div className="flex gap-6 justify-center">
              <Link to="/test">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#00FF88] text-[#0A0A0A] px-8 py-4 rounded-xl font-sans text-lg font-semibold hover:bg-[#00CC66] transition-all duration-300"
                >
                  Take a Test
                </motion.button>
              </Link>
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#1E1E1E] text-[#00FF88] px-8 py-4 rounded-xl font-sans text-lg border border-[#333333] hover:bg-[#2E2E2E] transition-all duration-300"
                >
                  Go to Admin Dashboard
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-[#1E1E1E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-[#00FF88]">
                Why Choose ProcX?
              </h2>
              <p className="text-[#A0A0A0] text-xl max-w-2xl mx-auto">
                Built for developers, by developers. ProcX offers the best tools
                to assess and improve your coding skills.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#0A0A0A] p-8 rounded-xl border border-[#333333] hover:border-[#00FF88] transition-all duration-300"
              >
                <div className="text-[#00FF88] p-3 bg-[#1E1E1E] rounded-lg w-fit">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mt-6 mb-4 text-[#00FF88]">
                  Real-Time Coding
                </h3>
                <p className="text-[#A0A0A0] mb-6">
                  Write, compile, and test code in real-time with our built-in
                  IDE.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#0A0A0A] p-8 rounded-xl border border-[#333333] hover:border-[#00FF88] transition-all duration-300"
              >
                <div className="text-[#00FF88] p-3 bg-[#1E1E1E] rounded-lg w-fit">
                  <BarChart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mt-6 mb-4 text-[#00FF88]">
                  Detailed Analytics
                </h3>
                <p className="text-[#A0A0A0] mb-6">
                  Get insights into your performance with detailed analytics and
                  progress tracking.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[#0A0A0A] p-8 rounded-xl border border-[#333333] hover:border-[#00FF88] transition-all duration-300"
              >
                <div className="text-[#00FF88] p-3 bg-[#1E1E1E] rounded-lg w-fit">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mt-6 mb-4 text-[#00FF88]">
                  Secure & Reliable
                </h3>
                <p className="text-[#A0A0A0] mb-6">
                  Your data is safe with us. ProcX ensures top-notch security and
                  reliability.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6 text-[#00FF88]">
                Ready to Test Your Skills?
              </h2>
              <p className="text-[#A0A0A0] text-xl mb-8">
                Join thousands of developers who trust ProcX for their coding
                assessments.
              </p>
              <Link to="/test">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#00FF88] text-[#0A0A0A] px-8 py-4 rounded-xl font-sans text-lg font-semibold hover:bg-[#00CC66] transition-all duration-300"
                >
                  Start a Test Now
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;