import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ title }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>

      <button className="home-btn" onClick={() => navigate("/")}>
        👨‍💻
      </button>
    </header>
  );
}
