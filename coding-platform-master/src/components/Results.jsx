import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

// Separate component for displaying optimal solutions
const OptimalSolutionDisplay = ({ question, submittedCode, language }) => {
  // This component remains unchanged
  return (
    <div className="mt-6 p-6 bg-gray-50 rounded-lg">
      <h4 className="text-xl font-semibold mb-4 text-blue-700">
        Optimal Solution Reference
      </h4>

      <div className="space-y-6">
        {/* Complexity Analysis */}
        <div className="mb-4">
          <h5 className="font-medium text-gray-800 mb-2">
            Complexity Analysis:
          </h5>
          <div className="bg-white p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <span className="text-gray-600">Time Complexity:</span>
                <span className="ml-2 font-mono font-medium">
                  {question.complexity.time}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Space Complexity:</span>
                <span className="ml-2 font-mono font-medium">
                  {question.complexity.space}
                </span>
              </div>
            </div>
            <p className="text-gray-700">{question.complexity.explanation}</p>
          </div>
        </div>

        {/* Optimal Implementation */}
        <div>
          <h5 className="font-medium text-gray-800 mb-2">
            Optimal Implementation:
          </h5>
          <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
            <pre className="text-white">
              <code>{question.optimalSolution[language]}</code>
            </pre>
          </div>
        </div>

        {/* Your Implementation */}
        <div>
          <h5 className="font-medium text-gray-800 mb-2">
            Your Implementation:
          </h5>
          <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
            <pre className="text-white">
              <code>{submittedCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// Performance Badge component
const PerformanceBadge = ({ performance }) => {
  const badges = {
    excellent: "bg-green-100 text-green-800 border-green-200",
    good: "bg-blue-100 text-blue-800 border-blue-200",
    fair: "bg-yellow-100 text-yellow-800 border-yellow-200",
    poor: "bg-red-100 text-red-800 border-red-200",
  };

  const getPerformanceLevel = (score) => {
    if (score >= 90) return { level: "excellent", text: "Excellent" };
    if (score >= 70) return { level: "good", text: "Good" };
    if (score >= 50) return { level: "fair", text: "Fair" };
    return { level: "poor", text: "Needs Improvement" };
  };

  const { level, text } = getPerformanceLevel(performance);

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium border ${badges[level]}`}
    >
      {text}
    </span>
  );
};

// Component to display a single result history item
const ResultHistoryItem = ({ result, isExpanded, toggleExpand }) => {
  const calculateTotalPercentage = () => {
    const totalScore = result.mcq.score + result.coding.score;
    const totalPossible = result.mcq.total + result.coding.total;
    return ((totalScore / totalPossible) * 100).toFixed(1);
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: "A", color: "text-green-600" };
    if (percentage >= 70) return { grade: "B", color: "text-blue-600" };
    if (percentage >= 50) return { grade: "C", color: "text-yellow-600" };
    if (percentage >= 30) return { grade: "D", color: "text-orange-600" };
    return { grade: "F", color: "text-red-600" };
  };

  const totalPercentage = calculateTotalPercentage();
  const { grade, color } = getGrade(totalPercentage);
  const date = new Date(result.timestamp).toLocaleString();

  return (
    <div className="border rounded-lg overflow-hidden mb-4">
      {/* Header - Always visible */}
      <div 
        className="p-4 bg-white flex items-center justify-between cursor-pointer hover:bg-gray-50"
        onClick={toggleExpand}
      >
        <div className="flex items-center space-x-4">
          <div className="font-medium text-lg">{result.name}</div>
          <div className="text-gray-500 text-sm">{date}</div>
          <PerformanceBadge performance={totalPercentage} />
        </div>
        <div className="flex items-center space-x-4">
          <div className={`text-xl font-bold ${color}`}>
            {totalPercentage}% ({grade})
          </div>
          <div className="text-gray-500">
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t p-6 bg-gray-50">
          {/* Status/Reason */}
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <p className="text-gray-700">
              <span className="font-medium">Status:</span> {result.reason}
            </p>
          </div>

          {/* Section Scores */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* MCQ Section */}
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h3 className="text-xl font-semibold mb-4">
                Multiple Choice Questions
              </h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600 mb-1">Score</div>
                  <div className="text-2xl font-bold">
                    {result.mcq.score}/{result.mcq.total}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600 mb-1">Percentage</div>
                  <div className={`text-2xl font-bold ${getGrade((result.mcq.score / result.mcq.total) * 100).color}`}>
                    {((result.mcq.score / result.mcq.total) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Coding Section */}
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h3 className="text-xl font-semibold mb-4">
                Coding Questions
              </h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600 mb-1">
                    Test Cases Passed
                  </div>
                  <div className="text-2xl font-bold">
                    {result.coding.score}/{result.coding.total}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600 mb-1">Percentage</div>
                  <div className={`text-2xl font-bold ${getGrade((result.coding.score / result.coding.total) * 100).color}`}>
                    {((result.coding.score / result.coding.total) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coding Solutions Review */}
          {result.coding.answers && Object.keys(result.coding.answers).length > 0 && (
            <div className="border-t pt-8">
              <h3 className="text-2xl font-semibold mb-6">
                Code Review & Optimization
              </h3>

              {Object.entries(result.coding.answers).map(
                ([index, submission]) => {
                  const question = result.questions[index];
                  return (
                    <div key={index} className="mb-8 p-6 border rounded-lg bg-white shadow-sm">
                      <h4 className="text-xl font-semibold mb-4">
                        {question.title}
                      </h4>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-4 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600">
                            Tests Passed
                          </div>
                          <div className="text-xl font-bold">
                            {submission.testsPassed}/{submission.totalTests}
                          </div>
                        </div>

                        {/* Optimization Status */}
                        <div
                          className={`p-4 rounded ${
                            submission.optimization?.optimal
                              ? "bg-green-50"
                              : "bg-yellow-50"
                            }`}
                        >
                          <div className="text-sm text-gray-600">
                            Solution Efficiency
                          </div>
                          <div className="text-sm mt-1">
                            {submission.optimization?.optimal
                              ? "✓ Optimal Solution"
                              : `⚠ ${submission.optimization?.reason}`}
                          </div>
                        </div>
                      </div>

                      {/* Show optimal solution if the submitted solution isn't optimal */}
                      {!submission.optimization?.optimal &&
                        question.optimalSolution && (
                          <OptimalSolutionDisplay
                            question={question}
                            submittedCode={submission.code}
                            language={submission.language}
                          />
                        )}
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Results = () => {
  const location = useLocation();
  const name = location.state?.name || "Unknown";
  const [currentResults, setCurrentResults] = useState(null);
  const [reason, setReason] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [expandedResult, setExpandedResult] = useState(null);
  const [viewMode, setViewMode] = useState('current'); // 'current' or 'history'
  const navigate = useNavigate();

  // Load current result and save to history
  useEffect(() => {
    const savedResults = sessionStorage.getItem("examResults");
    const savedReason = sessionStorage.getItem("examEndReason");
    const savedQuestions = sessionStorage.getItem("codingQuestions");
  
    if (savedResults) {
      const resultData = JSON.parse(savedResults);
      const questionsData = JSON.parse(savedQuestions || '{}');
  
      // Create current result object
      const currentResult = {
        ...resultData,
        questions: questionsData,
        reason: savedReason || "Exam completed",
        name: name,
        timestamp: new Date().toISOString(),
      };
  
      setCurrentResults(currentResult);
      setReason(savedReason || "Exam completed");
  
      // Load existing results from localStorage
      const existingResults = JSON.parse(localStorage.getItem("examHistoryResults") || "[]");
  
      // Only proceed if the user is not "Unknown" and doesn't already have a result
      if (name !== "Unknown" && !existingResults.some((result) => result.name === name)) {
        const updatedResults = [currentResult, ...existingResults];
        localStorage.setItem("examHistoryResults", JSON.stringify(updatedResults));
  
        // Update state with all results
        setAllResults(updatedResults);
      } else {
        // If the user is "Unknown" or already has a result, just update the state with existing results
        setAllResults(existingResults);
      }
  
      // If the user is "Unknown", automatically switch to history view
      if (name === "Unknown") {
        setViewMode('history');
      }
    } else if (viewMode === 'current') {
      // No current results, load history or redirect
      const existingResults = JSON.parse(localStorage.getItem("examHistoryResults") || "[]");
      if (existingResults.length > 0) {
        setAllResults(existingResults);
        setViewMode('history');
      } else {
        navigate("/");
      }
    }
  }, [navigate, name, viewMode]);

  // Load history from localStorage
  useEffect(() => {
    const existingResults = JSON.parse(localStorage.getItem("examHistoryResults") || "[]");
    setAllResults(existingResults);
  }, []);

  const toggleResultExpand = (resultId) => {
    if (expandedResult === resultId) {
      setExpandedResult(null);
    } else {
      setExpandedResult(resultId);
    }
  };

  const calculateMCQPercentage = (result) => {
    return ((result.mcq.score / result.mcq.total) * 100).toFixed(1);
  };

  const calculateCodingPercentage = (result) => {
    return ((result.coding.score / result.coding.total) * 100).toFixed(1);
  };

  const calculateTotalPercentage = (result) => {
    const totalScore = result.mcq.score + result.coding.score;
    const totalPossible = result.mcq.total + result.coding.total;
    return ((totalScore / totalPossible) * 100).toFixed(1);
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: "A", color: "text-green-600" };
    if (percentage >= 70) return { grade: "B", color: "text-blue-600" };
    if (percentage >= 50) return { grade: "C", color: "text-yellow-600" };
    if (percentage >= 30) return { grade: "D", color: "text-orange-600" };
    return { grade: "F", color: "text-red-600" };
  };

  // Toggle between current result and history
  const handleViewModeChange = (mode) => {
    if (mode === 'current') {
      // If switching to "Current" view, show the latest result only if it exists
      const latestResult = allResults[0]; // Latest result is the first in the array
      if (latestResult) {
        setCurrentResults(latestResult);
      } else {
        // If no results exist, stay in history view
        setViewMode('history');
        return;
      }
    }
    setViewMode(mode);
  };

  // Clear current results and exam data
  const clearCurrentExam = () => {
    sessionStorage.removeItem("examResults");
    sessionStorage.removeItem("examEndReason");
    sessionStorage.removeItem("codingQuestions");
  };

  // Delete a specific result from history
  const deleteResult = (timestamp) => {
    const updatedResults = allResults.filter(result => result.timestamp !== timestamp);
    setAllResults(updatedResults);
    localStorage.setItem("examHistoryResults", JSON.stringify(updatedResults));
    
    // If we're deleting the current expanded result, close it
    if (expandedResult === timestamp) {
      setExpandedResult(null);
    }
  };

  // Clear all history
  const clearAllHistory = () => {
    if (window.confirm("Are you sure you want to delete all exam history? This cannot be undone.")) {
      localStorage.removeItem("examHistoryResults");
      setAllResults([]);
      setExpandedResult(null);
      
      // If we're in history view with no results, go back to home
      if (viewMode === 'history' && !currentResults) {
        navigate("/");
      }
    }
  };

  if (name !== "Unknown") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Thank You for Taking the Test, {name}!
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            We appreciate your participation. Your results will be reviewed and you will be notified shortly.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!currentResults && viewMode === 'current' && allResults.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">
          No results available. Please take an exam first.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">
              {viewMode === 'current' ? `Exam Results for ${name}` : 'Exam History'}
            </h1>

            {/* Conditionally render the toggle button */}
            {name !== "Unknown" && (
              <div className="flex justify-center mb-8">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    onClick={() => handleViewModeChange('current')}
                    disabled={!currentResults}
                    className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                      viewMode === 'current'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    } border border-gray-200`}
                  >
                    Current Result
                  </button>
                  <button
                    type="button"
                    onClick={() => handleViewModeChange('history')}
                    className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                      viewMode === 'history'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    } border border-gray-200`}
                  >
                    History
                  </button>
                </div>
              </div>
            )}

            {viewMode === 'current' && currentResults ? (
              <div className="space-y-8">
                {/* Current Exam Result content */}
                {/* Exam End Reason */}
                {reason && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">
                      <span className="font-medium">Status:</span> {reason}
                    </p>
                  </div>
                )}

                {/* Overall Score */}
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">
                    Overall Performance
                  </h2>
                  <div
                    className={`text-4xl font-bold mb-2 ${
                      getGrade(calculateTotalPercentage(currentResults)).color
                    }`}
                  >
                    {calculateTotalPercentage(currentResults)}%
                  </div>
                  <div className="text-xl mb-4">
                    Grade: {getGrade(calculateTotalPercentage(currentResults)).grade}
                  </div>
                  <PerformanceBadge performance={calculateTotalPercentage(currentResults)} />
                </div>

                {/* Section Scores */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* MCQ Section */}
                  <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Multiple Choice Questions
                    </h3>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-gray-50 rounded">
                        <div className="text-sm text-gray-600 mb-1">Score</div>
                        <div className="text-2xl font-bold">
                          {currentResults.mcq.score}/{currentResults.mcq.total}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded">
                        <div className="text-sm text-gray-600 mb-1">
                          Percentage
                        </div>
                        <div
                          className={`text-2xl font-bold ${
                            getGrade(calculateMCQPercentage(currentResults)).color
                          }`}
                        >
                          {calculateMCQPercentage(currentResults)}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coding Section */}
                  <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Coding Questions
                    </h3>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-gray-50 rounded">
                        <div className="text-sm text-gray-600 mb-1">
                          Test Cases Passed
                        </div>
                        <div className="text-2xl font-bold">
                          {currentResults.coding.score}/{currentResults.coding.total}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded">
                        <div className="text-sm text-gray-600 mb-1">
                          Percentage
                        </div>
                        <div
                          className={`text-2xl font-bold ${
                            getGrade(calculateCodingPercentage(currentResults)).color
                          }`}
                        >
                          {calculateCodingPercentage(currentResults)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coding Solutions Review */}
                <div className="border-t pt-8">
                  <h3 className="text-2xl font-semibold mb-6">
                    Code Review & Optimization
                  </h3>

                  {currentResults?.coding?.answers &&
                    Object.entries(currentResults.coding.answers).map(
                      ([index, submission]) => {
                        const question = currentResults.questions[index];
                        return (
                          <div key={index} className="mb-8 p-6 border rounded-lg">
                            <h4 className="text-xl font-semibold mb-4">
                              {question.title}
                            </h4>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="p-4 bg-gray-50 rounded">
                                <div className="text-sm text-gray-600">
                                  Tests Passed
                                </div>
                                <div className="text-xl font-bold">
                                  {submission.testsPassed}/{submission.totalTests}
                                </div>
                              </div>

                              {/* Optimization Status */}
                              <div
                                className={`p-4 rounded ${
                                  submission.optimization?.optimal
                                    ? "bg-green-50"
                                    : "bg-yellow-50"
                                }`}
                              >
                                <div className="text-sm text-gray-600">
                                  Solution Efficiency
                                </div>
                                <div className="text-sm mt-1">
                                  {submission.optimization?.optimal
                                    ? "✓ Optimal Solution"
                                    : `⚠ ${submission.optimization?.reason}`}
                                </div>
                              </div>
                            </div>

                            {/* Show optimal solution if the submitted solution isn't optimal */}
                            {!submission.optimization?.optimal &&
                              question.optimalSolution && (
                                <OptimalSolutionDisplay
                                  question={question}
                                  submittedCode={submission.code}
                                  language={submission.language}
                                />
                              )}
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* History View */}
                {allResults.length > 0 ? (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold">Result History</h2>
                      <button
                        onClick={clearAllHistory}
                        className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 transition-colors"
                      >
                        Clear All History
                      </button>
                    </div>

                    {allResults.map((result, index) => (
                      <div key={index} className="relative">
                        <ResultHistoryItem
                          result={result}
                          isExpanded={expandedResult === result.timestamp}
                          toggleExpand={() => toggleResultExpand(result.timestamp)}
                        />
                        {/* Delete button for this result */}
                        <button
                          className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteResult(result.timestamp);
                          }}
                          title="Delete this result"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-10 bg-gray-50 rounded-lg">
                    <div className="text-xl text-gray-500">
                      No exam history available.
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-12 flex justify-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Return to Home
              </button>
              {viewMode === 'current' && currentResults && (
                <>
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Print Results
                  </button>
                  <button
                    onClick={clearCurrentExam}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Start New Exam
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;