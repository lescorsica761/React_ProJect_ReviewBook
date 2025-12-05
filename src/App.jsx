import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReviewList from "./pages/ReviewList";
import AddReview from "./pages/AddReview";
import "./App.css";

function App() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      title: "재밌었어요",
      rating: 5,
      date: "2025.01.01",
      content: "완전 만족!",
    },
    {
      id: 2,
      title: "그냥 그랬음",
      rating: 3,
      date: "2025.01.02",
      content: "평범함",
    },
  ]);

  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/list"
            element={<ReviewList reviews={reviews} onDelete={handleDelete} />}
          />
          <Route path="/add" element={<AddReview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
