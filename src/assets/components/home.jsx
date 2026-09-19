import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaBox,
  FaRocket,
  FaArrowRight,
  FaStar,
  FaDatabase,
  FaChartLine,
  FaClock,
  FaCrown,
  FaGithub,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import "./home.css";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, products: 0, articles: 0 });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [usersResponse, productsResponse, newsResponse] = await Promise.all([
          fetch("https://randomuser.me/api/?results=1"),
          fetch("https://dummyjson.com/products?limit=1"),
          fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=1"),
        ]);

        const usersData = await usersResponse.json();
        const productsData = await productsResponse.json();
        const newsData = await newsResponse.json();

        setStats({
          users: usersData.info?.results || 50,
          products: productsData.total || 100,
          articles: newsData.count || 30,
        });
      } catch {
        setStats({ users: 50, products: 100, articles: 30 });
      }
    };

    loadStats();
  }, []);

  const apiCards = [
    {
      id: 1,
      title: "User Directory",
      icon: <FaUsers />,
      description:
        "Access real user profiles with names, emails, locations, and profile pictures.",
      gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
      bgGradient: "linear-gradient(135deg, #06b6d420, #3b82f620)",
      stats: `${stats.users}+ Users`,
      features: ["Real Names", "Email Addresses", "Location Data", "Profile Images"],
      color: "#06b6d4",
      page: "user-api",
      badge: "Popular",
    },
    {
      id: 2,
      title: "Product Catalog",
      icon: <FaBox />,
      description:
        "Explore products with prices, ratings, images, and categories from DummyJSON.",
      gradient: "linear-gradient(135deg, #8b5cf6, #a855f7)",
      bgGradient: "linear-gradient(135deg, #8b5cf620, #a855f720)",
      stats: `${stats.products}+ Products`,
      features: ["Pricing Data", "Ratings", "Product Images", "Categories"],
      color: "#8b5cf6",
      page: "dummyjson",
      badge: "Trending",
    },
    {
      id: 3,
      title: "Space News",
      icon: <FaRocket />,
      description:
        "Read the latest space articles with source, date, author, summary, and direct links.",
      gradient: "linear-gradient(135deg, #f97316, #ef4444)",
      bgGradient: "linear-gradient(135deg, #f9731620, #ef444420)",
      stats: `${stats.articles}+ Articles`,
      features: ["Latest News", "Sources", "Authors", "Article Links"],
      color: "#f97316",
      page: "news",
      badge: "New",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="homepage">
        <div className="hero-section">
          <div className="hero-overlay" />
          <div className="hero-container">
            <div className="hero-badge">
              <FaCrown /> React Query API Dashboard
            </div>
            <h1 className="hero-title">
              Unified API
              <br />
              <span className="gradient-text">Dashboard Experience</span>
            </h1>
            <p className="hero-description">
              Browse users and products from two live APIs with fast caching,
              loading states, and working search.
            </p>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-value">{stats.users.toLocaleString()}+</div>
                <div className="hero-stat-label">Users</div>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <div className="hero-stat-value">{stats.products.toLocaleString()}+</div>
                <div className="hero-stat-label">Products</div>
              </div>
            </div>
          </div>
        </div>

        <div className="cards-section">
          <div className="section-header">
            <h2>Choose Your Data Source</h2>
            <p>Open a page to browse and search live API data.</p>
          </div>

          <div className="api-cards-grid">
            {apiCards.map((card) => (
              <div
                key={card.id}
                className="api-card-container"
                onClick={() => navigate(`/${card.page}`)}
              >
                <div className="api-card-glow" style={{ background: card.gradient }} />
                <div className="api-card" style={{ background: card.bgGradient }}>
                  {card.badge && (
                    <div className="api-card-badge" style={{ background: card.gradient }}>
                      {card.badge}
                    </div>
                  )}

                  <div className="api-card-icon" style={{ background: card.gradient }}>
                    {card.icon}
                  </div>

                  <h3 className="api-card-title">{card.title}</h3>
                  <p className="api-card-description">{card.description}</p>

                  <div className="api-card-stats">
                    <FaDatabase /> {card.stats}
                  </div>

                  <div className="api-card-features">
                    {card.features.map((feature) => (
                      <span key={feature} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div
                    className="api-card-button"
                    style={{ color: card.color }}
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/${card.page}`);
                    }}
                  >
                    Explore Now <FaArrowRight className="arrow-icon" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="features-showcase">
          <div className="section-header">
            <h2>Why This Dashboard?</h2>
            <p>A simple setup focused on useful API data.</p>
          </div>

          <div className="features-grid">
            <div className="feature-showcase-card">
              <div className="feature-icon-wrapper">
                <FaChartLine />
              </div>
              <h4>Live Data</h4>
              <p>Data is loaded directly from the APIs when the pages are opened.</p>
            </div>
            <div className="feature-showcase-card">
              <div className="feature-icon-wrapper">
                <FaStar />
              </div>
              <h4>React Query</h4>
              <p>Requests are cached and managed without extra context state.</p>
            </div>
            <div className="feature-showcase-card">
              <div className="feature-icon-wrapper">
                <FaClock />
              </div>
              <h4>Fast Search</h4>
              <p>Search users locally and products through the product search API.</p>
            </div>
          </div>
        </div>

        <div className="cta-banner">
          <div className="cta-content">
            <h3>Ready to explore?</h3>
            <p>Choose a data source above and start browsing.</p>
            <div className="cta-buttons">
              <button className="cta-button" onClick={() => navigate("/user-api")}>
                Get Started <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>
                <FaRocket /> API Dashboard
              </h3>
              <p>3 APIs Integrated • React Query</p>
            </div>
            <div className="footer-links">
              <button onClick={() => navigate("/user-api")}>Users</button>
              <button onClick={() => navigate("/dummyjson")}>Products</button>
              <button onClick={() => navigate("/news")}>Space News</button>
            </div>
            <div className="footer-social">
              <FaGithub />
              <FaTwitter />
              <FaLinkedin />
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 API Integration Dashboard | Built with React</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
