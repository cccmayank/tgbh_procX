import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import Gemini SDK
import { Save, Trash, Edit, Plus } from "lucide-react";

const SetQuestions = () => {
  const [questions, setQuestions] = useState([]); // Stores current questions
  const [inputText, setInputText] = useState(""); // Admin's input text
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [editIndex, setEditIndex] = useState(null); // Index of the question being edited
  const [editText, setEditText] = useState(""); // Text for editing a question

  // Load questions from questions.json on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Fetch questions from questions.json
  const fetchQuestions = async () => {
    try {
      const response = await fetch("/data/questions.json", {
        headers: {
          "Cache-Control": "no-cache", // Prevent caching issues
        },
      });
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      } else {
        console.log("No questions found. Starting with an empty list.");
        setQuestions([]);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  
  // Save questions to questions.json
  const saveQuestions = async (updatedQuestions) => {
    try {
      const response = await fetch("http://localhost:5000/save-questions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuestions),
      });
  
      if (response.ok) {
        console.log("Questions saved successfully!");
      } else {
        console.error("Failed to save questions:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving questions:", error);
    }
  };

  // Handle generating MCQs using Gemini API
  const generateQuestions = async () => {
  if (!inputText.trim()) {
    alert("Please enter a request.");
    return;
  }

  setLoading(true);
  try {
    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI("AIzaSyDIsCQ9VG8lSMbSG7_9DO2qwWiSF9NaiqY"); // Replace with your actual API key
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Use "gemini-pro" or "gemini-2.0-flash"

    // Define the prompt
    const prompt = `Generate 10 multiple-choice questions (MCQs) on ${inputText}. Each question should have:
    - A question text
    - 4 answer options (a, b, c, d)
    - A correct answer (only one correct option)
    Return the output in JSON format like this:
    [
      {
        "question": "What is...?",
        "answers": {
          "a": "Option 1",
          "b": "Option 2",
          "c": "Option 3",
          "d": "Option 4"
        },
        "correct_answers": {
          "a_correct": "false",
          "b_correct": "true",
          "c_correct": "false",
          "d_correct": "false"
        }
      }
    ]`;

    // Generate content
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse the response (handle ```json and ```)
    let jsonResponse = responseText.trim(); // Trim whitespace
    if (jsonResponse.startsWith("```json")) {
      jsonResponse = jsonResponse.replace("```json", "").replace("```", "").trim(); // Remove ```json and ```
    }

    console.log("Raw Response:", responseText); // Debugging: Log raw response
    console.log("Parsed JSON:", jsonResponse); // Debugging: Log parsed JSON

    // Parse JSON and update questions
    const newQuestions = JSON.parse(jsonResponse);
    const updatedQuestions = [...questions, ...newQuestions];
    setQuestions(updatedQuestions);
    saveQuestions(updatedQuestions);
    setInputText("");
  } catch (error) {
    console.error("Error generating questions:", error);
    alert("Failed to generate questions. Please check the console for details.");
  } finally {
    setLoading(false);
  }
};

  // Handle editing a question
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(questions[index].question);
  };

  // Save edited question
  const saveEdit = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[editIndex].question = editText;
    setQuestions(updatedQuestions);
    saveQuestions(updatedQuestions);
    setEditIndex(null);
    setEditText("");
  };

  // Handle deleting a question
  const handleDelete = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    saveQuestions(updatedQuestions);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <h1 className="text-3xl font-bold text-[#00FF88] mb-8">Set Questions</h1>

      {/* Input Box for Generating Questions */}
      <div className="mb-8">
        <textarea
          className="w-full p-4 bg-[#1E1E1E] text-white rounded-lg border border-[#333333] focus:border-[#00FF88] outline-none"
          rows="4"
          placeholder="Enter your request (e.g., '10 MCQs on Computer Networks')"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="mt-4 bg-[#00FF88] text-[#0A0A0A] px-6 py-2 rounded-lg font-semibold hover:bg-[#00CC66] transition-all duration-300"
          onClick={generateQuestions}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Questions"}
        </button>
      </div>

      {/* Current Questions List */}
      <div>
        <h2 className="text-2xl font-bold text-[#00FF88] mb-6">
          Current Questions
        </h2>
        {questions.length === 0 ? (
          <p className="text-[#A0A0A0]">No questions available.</p>
        ) : (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div
                key={index}
                className="p-4 bg-[#1E1E1E] rounded-lg border border-[#333333]"
              >
                {editIndex === index ? (
                  <div>
                    <textarea
                      className="w-full p-2 bg-[#0A0A0A] text-white rounded-lg border border-[#333333] focus:border-[#00FF88] outline-none"
                      rows="3"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button
                      className="mt-2 bg-[#00FF88] text-[#0A0A0A] px-4 py-1 rounded-lg font-semibold hover:bg-[#00CC66] transition-all duration-300"
                      onClick={saveEdit}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[#A0A0A0]">{question.question}</p>
                      <div className="mt-2 space-y-1">
                        {Object.entries(question.answers).map(([key, value]) => (
                          <p key={key} className="text-sm text-gray-400">
                            {key.toUpperCase()}. {value}
                          </p>
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-[#00FF88]">
                        Correct Answer:{" "}
                        {Object.entries(question.correct_answers).find(
                          ([key, value]) => value === "true"
                        )?.[0].replace("_correct", "")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="text-[#00FF88] hover:text-[#00CC66]"
                        onClick={() => handleEdit(index)}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        className="text-[#FF4444] hover:text-[#CC0000]"
                        onClick={() => handleDelete(index)}
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SetQuestions;