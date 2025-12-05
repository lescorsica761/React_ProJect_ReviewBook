import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import InputField from "../components/InputField";
import "./AddReview.css";

export default function AddReview() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // 작성 또는 수정 구분
  const category = params.get("category"); // 작성 시 카테고리
  const reviewId = params.get("id"); // 수정 시 id

  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");

  // ⭐ 수정 모드라면 기존 데이터 불러오기
  useEffect(() => {
    if (reviewId) {
      const stored = JSON.parse(localStorage.getItem("reviews") || "[]");
      const target = stored.find((r) => r.id === Number(reviewId));

      if (target) {
        setTitle(target.title);
        setRating(target.rating);
        setContent(target.content);
      }
    }
  }, [reviewId]);

  // ⭐ 작성
  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("reviews") || "[]");

    const newReview = {
      id: Date.now(),
      title,
      rating: Number(rating),
      content,
      date: new Date().toISOString().split("T")[0],
      category,
    };

    localStorage.setItem("reviews", JSON.stringify([newReview, ...existing]));

    navigate(`/list?category=${category}`);
  };

  // ⭐ 수정
  const handleUpdate = () => {
    const existing = JSON.parse(localStorage.getItem("reviews") || "[]");

    const updated = existing.map((r) =>
      r.id === Number(reviewId)
        ? {
            ...r,
            title,
            rating: Number(rating),
            content,
          }
        : r
    );

    localStorage.setItem("reviews", JSON.stringify(updated));
    alert("수정되었습니다 !!");
    navigate(`/list?category=${category}`);
  };

  return (
    <div className="addReview">
      <Header title={reviewId ? "리뷰 수정" : `리뷰 작성 (${category})`} />

      <InputField label="제목">
        <input
          type="text"
          placeholder="작품 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </InputField>

      <InputField label="별점">
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="5">⭐ 5</option>
          <option value="4">⭐ 4</option>
          <option value="3">⭐ 3</option>
          <option value="2">⭐ 2</option>
          <option value="1">⭐ 1</option>
        </select>
      </InputField>

      <InputField label="리뷰 내용">
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </InputField>

      <button
        className="submit_btn"
        onClick={reviewId ? handleUpdate : handleSubmit}
      >
        {reviewId ? "수정하기" : "작성하기"}
      </button>
    </div>
  );
}
