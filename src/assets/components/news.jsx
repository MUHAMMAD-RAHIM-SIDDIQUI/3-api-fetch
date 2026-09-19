import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaCalendar,
  FaExternalLinkAlt,
  FaNewspaper,
  FaRocket,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import Navbar from "./navbar";
import "./UserCard.css";

const fetchNews = async () => {
  const response = await fetch(
    "https://api.spaceflightnewsapi.net/v4/articles/?limit=30"
  );

  if (!response.ok) {
    throw new Error("Unable to load space news");
  }

  const data = await response.json();
  return data.results;
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

function SpaceNews() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: articles = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["space-news"],
    queryFn: fetchNews,
    staleTime: 1000 * 60 * 5,
  });

  const search = searchTerm.trim().toLowerCase();
  const filteredArticles = articles.filter((article) => {
    if (!search) return true;

    return (
      article.title?.toLowerCase().includes(search) ||
      article.summary?.toLowerCase().includes(search) ||
      article.news_site?.toLowerCase().includes(search)
    );
  });

  return (
    <>
      <Navbar />
      <div className="directory">
        <div className="header">
          <h1>
            <FaRocket /> Space News
          </h1>

          <div className="top-bar">
            <div className="search-box">
              <FaSearch />
              <input
                type="search"
                placeholder="Search news by title, summary or source..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <div className="counter">
              Articles <span>{filteredArticles.length}</span>
            </div>
          </div>
        </div>

        {isLoading && (
          <p className="status-message">Loading space news...</p>
        )}

        {isError && (
          <div className="status-message error-message">
            <p>{error.message || "Something went wrong while loading news."}</p>
            <button type="button" onClick={() => refetch()}>
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !isError && filteredArticles.length === 0 && (
          <p className="status-message">
            No news found for “{searchTerm}”.
          </p>
        )}

        <div className="user-grid">
          {filteredArticles.map((article) => (
            <article className="user-card news-card" key={article.id}>
              <img
                src={article.image_url}
                alt={article.title}
                className="news-image"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <h2 className="news-title">{article.title}</h2>

              <div className="badges">
                <span className="gender news-source">
                  <FaNewspaper /> {article.news_site}
                </span>
                <span className="age news-date">
                  <FaCalendar /> {formatDate(article.published_at)}
                </span>
              </div>

              <p className="news-summary">{article.summary}</p>

              {article.authors?.length > 0 && (
                <p className="news-author">
                  <FaUser /> {article.authors[0].name}
                </p>
              )}

              <button
                type="button"
                onClick={() => window.open(article.url, "_blank", "noopener,noreferrer")}
              >
                <FaExternalLinkAlt /> Read Full Article
              </button>
            </article>
          ))}
        </div>

        {!isLoading && !isError && articles.length > 0 && (
          <div className="news-refresh">
            <button type="button" onClick={() => refetch()} disabled={isFetching}>
              <FaRocket /> {isFetching ? "Refreshing..." : "Refresh News"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default SpaceNews;
