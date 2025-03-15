import React from "react";
import { Link } from "react-router-dom";
import { Settings, Users, FileText, ArrowRight } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen font-sans bg-[#0A0A0A] text-white">
      {/* Dashboard Header */}
      <div className="bg-[#1E1E1E] py-6 border-b border-[#333333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[#00FF88]">ProcX Dashboard</h1>
          <p className="text-[#A0A0A0] mt-2">
            Manage your tests, candidates, and results in one place.
          </p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Set Questions Section */}
          <Link to="/set-questions">
            <div className="bg-[#1E1E1E] p-8 rounded-xl border border-[#333333] hover:border-[#00FF88] transition-all duration-300 cursor-pointer">
              <div className="text-[#00FF88] p-3 bg-[#0A0A0A] rounded-lg w-fit">
                <Settings className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold mt-6 mb-4 text-[#00FF88]">
                Set Questions
              </h2>
              <p className="text-[#A0A0A0] mb-6">
                Create and manage your test questions for assessments.
              </p>
              <div className="flex items-center text-[#00FF88]">
                <span className="mr-2">Go to Questions</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Candidates Management Section */}
          <Link to="/candidates">
            <div className="bg-[#1E1E1E] p-8 rounded-xl border border-[#333333] hover:border-[#00FF88] transition-all duration-300 cursor-pointer">
              <div className="text-[#00FF88] p-3 bg-[#0A0A0A] rounded-lg w-fit">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold mt-6 mb-4 text-[#00FF88]">
                Candidates Management
              </h2>
              <p className="text-[#A0A0A0] mb-6">
                View and manage candidates taking your tests.
              </p>
              <div className="flex items-center text-[#00FF88]">
                <span className="mr-2">Manage Candidates</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Results Section */}
          <Link to="/results">
            <div className="bg-[#1E1E1E] p-8 rounded-xl border border-[#333333] hover:border-[#00FF88] transition-all duration-300 cursor-pointer">
              <div className="text-[#00FF88] p-3 bg-[#0A0A0A] rounded-lg w-fit">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold mt-6 mb-4 text-[#00FF88]">
                Results
              </h2>
              <p className="text-[#A0A0A0] mb-6">
                Analyze and review test results from candidates.
              </p>
              <div className="flex items-center text-[#00FF88]">
                <span className="mr-2">View Results</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;