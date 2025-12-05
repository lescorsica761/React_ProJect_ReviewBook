import "./CategoryCard.css";

export default function CategoryCard({ icon, label, onClick }) {
  return (
    <div className="category_card" onClick={onClick}>
      {icon} {label}
    </div>
  );
}
