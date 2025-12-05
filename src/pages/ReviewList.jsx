import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import ReviewCard from "../components/ReviewCard";
import "./ReviewList.css";

export default function ReviewList() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // ⭐ URL에서 카테고리 가져옴
  const category = params.get("category");

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reviews") || "[]");

    // ⭐ 카테고리 필터링
    const filtered = stored.filter((r) => r.category === category);

    setReviews(filtered);
  }, [category]);

  // 삭제 기능
  const handleDelete = (id) => {
    const stored = JSON.parse(localStorage.getItem("reviews") || "[]");

    // 전체 리뷰에서 삭제
    const updated = stored.filter((r) => r.id !== id);
    localStorage.setItem("reviews", JSON.stringify(updated));

    // 현재 페이지의 카테고리 리뷰만 다시 set
    setReviews(updated.filter((r) => r.category === category));
  };

  return (
    <div className="reviewList">
      {/* 카테고리에 맞는 타이틀 표시 */}
      <Header
        title={
          category === "movie"
            ? "영화 리뷰"
            : category === "book"
            ? "책 리뷰"
            : category === "music"
            ? "음악/공연 리뷰"
            : "내 리뷰 기록"
        }
      />

      {reviews.length === 0 ? (
        <p className="empty">아직 작성한 리뷰가 없습니다.</p>
      ) : (
        reviews.map((r) => (
          <ReviewCard
            key={r.id}
            id={r.id}
            title={r.title}
            rating={r.rating}
            date={r.date}
            content={r.content}
            category={r.category}
            onDelete={handleDelete}
          />
        ))
      )}

      {/* ⭐ 리뷰 작성 시 카테고리 유지하여 Add 화면으로 이동 */}
      <button
        className="add_btn"
        onClick={() => navigate(`/add?category=${category}`)}
      >
        리뷰 작성하기
      </button>
    </div>
  );
}
