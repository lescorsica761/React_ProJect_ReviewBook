import React from "react";
import "./DeleteModal.css";

const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>삭제하시겠어요?</h3>
        <p>삭제하면 복구가 어려워요.</p>

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onCancel}>
            취소
          </button>
          <button className="delete-btn" onClick={onConfirm}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
