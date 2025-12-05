import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./ReviewCard.css";
import DeleteModal from "./DeleteModal";

const ReviewCard = ({
  id,
  title,
  rating,
  date,
  content,
  onDelete,
  category,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const numRating = Number(rating);

  return (
    <>
      <div className="review-card">
        {/* 상단 영역 */}
        <div className="review-top">
          {/* 펼치기 클릭 영역 */}
          <div className="review-info" onClick={() => setOpen(!open)}>
            <h2>{title}</h2>

            <div className="rating">
              {"★".repeat(numRating)}
              {"☆".repeat(5 - numRating)}
            </div>

            <span className="date">{date}</span>
          </div>

          <div className="btn-wrapper">
            {/* 수정 버튼 */}
            <button
              className="edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/add?id=${id}&category=${category}`);
              }}
            >
              🛠수정
            </button>

            {/* 삭제 버튼 */}
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
            >
              🗑삭제
            </button>
          </div>
        </div>

        {/* 펼쳐진 리뷰 내용 */}
        {open && <div className="review-content">{content}</div>}
      </div>

      {/* 삭제 모달 */}
      {showModal && (
        <DeleteModal
          onConfirm={() => {
            onDelete(id);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ReviewCard;
