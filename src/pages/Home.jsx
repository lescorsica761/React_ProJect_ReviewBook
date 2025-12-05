import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CategoryCard from "../components/CategoryCard";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <Header title="Review Book" />

      <section className="welcome">
        <h2>오늘 어떤 작품을 기록할까요?</h2>
      </section>

      <section className="card_grid">
        <CategoryCard
          icon="📽️"
          label="영화 리뷰"
          onClick={() => navigate("/list?category=movie")}
        />
        <CategoryCard
          icon="📚"
          label="책 리뷰"
          onClick={() => navigate("/list?category=book")}
        />
        <CategoryCard
          icon="🎧"
          label="음악/공연 리뷰"
          onClick={() => navigate("/list?category=music")}
        />
      </section>
    </div>
  );
}
