import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import "./FavoriteButton.css";

function FavoriteButton({ coinId, isFavorite, onToggle }) {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent navigation if inside Link
    e.stopPropagation(); // Prevent parent click events
    onToggle(coinId);
  };

  return (
    <IconButton
      onClick={handleClick}
      className="favorite-button"
      size="small"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <StarIcon className="star-icon star-filled" />
      ) : (
        <StarBorderIcon className="star-icon star-outlined" />
      )}
    </IconButton>
  );
}

export default FavoriteButton;
