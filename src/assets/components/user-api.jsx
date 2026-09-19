import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import Navbar from "./navbar";
import "./UserCard.css";

const fetchUsers = async () => {
  const response = await fetch("https://randomuser.me/api/?results=50");

  if (!response.ok) {
    throw new Error("Unable to load users");
  }

  const data = await response.json();
  return data.results;
};

function UserCard() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  });

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) return true;

    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    const location = `${user.location.city} ${user.location.state} ${user.location.country}`.toLowerCase();

    return (
      fullName.includes(search) ||
      user.email.toLowerCase().includes(search) ||
      location.includes(search)
    );
  });

  return (
    <>
      <Navbar />
      <div className="directory">
        <div className="header">
          <h1>Random Users Directory</h1>

          <div className="top-bar">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <div className="counter">
              Users <span>{filteredUsers.length}</span>
            </div>
          </div>
        </div>

        {isLoading && <p className="status-message">Loading users...</p>}

        {isError && (
          <p className="status-message error-message">
            {error.message || "Something went wrong while loading users."}
          </p>
        )}

        {!isLoading && !isError && filteredUsers.length === 0 && (
          <p className="status-message">No users found for “{searchTerm}”.</p>
        )}

        <div className="user-grid">
          {filteredUsers.map((user) => (
            <div className="user-card" key={user.login.uuid}>
              <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />

              <h2>
                {user.name.title} {user.name.first} {user.name.last}
              </h2>

              <div className="badges">
                <span className="gender">{user.gender}</span>
                <span className="age">{user.registered.age} Years</span>
              </div>

              <div className="info">
                <p>
                  <FaEnvelope />
                  {user.email}
                </p>

                <p>
                  <FaPhone />
                  {user.phone}
                </p>

                <p>
                  <FaMapMarkerAlt />
                  {user.location.city}, {user.location.state}
                </p>

                <p className="country">{user.location.country}</p>
              </div>

              <button type="button">View Profile</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserCard;
