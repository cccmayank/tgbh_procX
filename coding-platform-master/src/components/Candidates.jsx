import React, { useState } from 'react';
import { send } from 'emailjs-com';
import { motion } from 'framer-motion';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', testDate: '', testTime: '', testSubject: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addCandidate = () => {
    if (form.name && form.email) {
      setCandidates([...candidates, form]);
      setForm({ name: '', email: '', testDate: '', testTime: '', testSubject: '', password: '' });
    }
  };

  const sendEmail = (candidate) => {
    const templateParams = {
      test_date: candidate.testDate,
      test_time: candidate.testTime,
      test_subject: candidate.testSubject,
      password: candidate.password,
      to_email: candidate.email,
      to_name: candidate.name
    };

    send('service_ehjda9f', 'template_2pyrskh', templateParams, 'EoeRoUu7V0Kjwp5Pd')
      .then((response) => {
        console.log('Email sent successfully:', response);
        alert(`Email sent to ${candidate.email}`);
      })
      .catch((err) => console.error('Failed to send email:', err));
  };

  return (
    <div className="min-h-screen font-sans bg-[#0A0A0A] text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[size:20px_20px] opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,255,255,0.02)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-[#00FF88]">Add Candidate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="bg-[#1E1E1E] text-white p-3 rounded-lg border border-[#333333] focus:border-[#00FF88] focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="bg-[#1E1E1E] text-white p-3 rounded-lg border border-[#333333] focus:border-[#00FF88] focus:outline-none"
            />
            <input
              type="date"
              name="testDate"
              value={form.testDate}
              onChange={handleChange}
              className="bg-[#1E1E1E] text-white p-3 rounded-lg border border-[#333333] focus:border-[#00FF88] focus:outline-none"
            />
            <input
              type="time"
              name="testTime"
              value={form.testTime}
              onChange={handleChange}
              className="bg-[#1E1E1E] text-white p-3 rounded-lg border border-[#333333] focus:border-[#00FF88] focus:outline-none"
            />
            <input
              type="text"
              name="testSubject"
              placeholder="Test Subject"
              value={form.testSubject}
              onChange={handleChange}
              className="bg-[#1E1E1E] text-white p-3 rounded-lg border border-[#333333] focus:border-[#00FF88] focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="bg-[#1E1E1E] text-white p-3 rounded-lg border border-[#333333] focus:border-[#00FF88] focus:outline-none"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addCandidate}
            className="bg-[#00FF88] text-[#0A0A0A] px-8 py-3 rounded-xl font-sans text-lg font-semibold hover:bg-[#00CC66] transition-all duration-300"
          >
            Add Candidate
          </motion.button>

          <h2 className="text-4xl font-bold mt-16 mb-8 text-[#00FF88]">Candidates List</h2>
          <ul className="space-y-4">
            {candidates.map((candidate, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1E1E1E] p-6 rounded-lg border border-[#333333] hover:border-[#00FF88] transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-[#00FF88]">{candidate.name}</h3>
                    <p className="text-[#A0A0A0]">{candidate.email}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => sendEmail(candidate)}
                    className="bg-[#00FF88] text-[#0A0A0A] px-6 py-2 rounded-lg font-sans text-md font-semibold hover:bg-[#00CC66] transition-all duration-300"
                  >
                    Send Email
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Candidates;