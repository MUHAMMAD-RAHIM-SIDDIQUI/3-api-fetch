import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaBox,
  FaSearch,
  FaShoppingCart,
  FaTag,
  FaBuilding,
} from "react-icons/fa";
import Navbar from "./navbar";
import "./UserCard.css";

const fetchProducts = async () => {
  const response = await fetch("https://dummyjson.com/products?limit=100");

  if (!response.ok) {
    throw new Error("Unable to load products");
  }

  const data = await response.json();
  return data.products;
};

const ProductGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: products = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousProducts) => previousProducts,
  });

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) return true;

    return (
      product.title.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.brand?.toLowerCase().includes(search)
    );
  });

  return (
    <>
      <Navbar />
      <div className="directory">
        <div className="header">
          <h1>
            <FaBox /> 🛍️ Products Gallery
          </h1>

          <div className="top-bar">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search by product, brand or category..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <div className="counter">
              Products <span>{filteredProducts.length}</span>
            </div>
          </div>
        </div>

        {isFetching && !isLoading && (
          <p className="status-message">Updating products...</p>
        )}

        {isLoading && <p className="status-message">Loading products...</p>}

        {isError && (
          <p className="status-message error-message">
            {error.message || "Something went wrong while loading products."}
          </p>
        )}

        {!isLoading && !isError && filteredProducts.length === 0 && (
          <p className="status-message">No products found for “{searchTerm}”.</p>
        )}

        <div className="user-grid">
          {filteredProducts.map((product) => (
            <div className="user-card" key={product.id}>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "20px",
                  objectFit: "cover",
                }}
              />

              <h2 style={{ fontSize: "18px", margin: "12px 0" }}>
                {product.title.length > 20
                  ? `${product.title.substring(0, 20)}...`
                  : product.title}
              </h2>

              <div className="badges">
                <span className="gender" style={{ background: "#3b82f6" }}>
                  <FaTag style={{ marginRight: "5px" }} />
                  {product.category}
                </span>
                {product.brand && (
                  <span className="age" style={{ background: "#8b5cf6" }}>
                    <FaBuilding style={{ marginRight: "5px" }} />
                    {product.brand}
                  </span>
                )}
              </div>

              <div className="info">
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#06b6d4",
                    justifyContent: "center",
                  }}
                >
                  ${product.price}
                </p>

                <p style={{ justifyContent: "center", gap: "5px" }}>
                  ⭐⭐⭐⭐⭐
                  <span style={{ marginLeft: "8px", color: "#d1d5db" }}>
                    ({product.rating})
                  </span>
                </p>
              </div>

              <button type="button">
                <FaShoppingCart /> Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductGrid;
