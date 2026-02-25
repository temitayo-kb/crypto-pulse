import React, { useState, useEffect } from "react";
import { FavoritesContext } from "./FavoritesContext";

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cryptoFavorites");
      if (stored) {
        const parsed = JSON.parse(stored);
        setFavorites(parsed);
      }
      setIsInitialized(true); // Mark as initialized
    } catch (error) {
      console.error("Error loading favorites:", error);
      setIsInitialized(true);
    }
  }, []);

  // Save favorites to localStorage whenever they change (but NOT on initial mount)
  useEffect(() => {
    if (!isInitialized) return; // Skip saving until initialized

    try {
      localStorage.setItem("cryptoFavorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  }, [favorites, isInitialized]);

  const toggleFavorite = (coinId) => {
    setFavorites((prev) => {
      if (prev.includes(coinId)) {
        return prev.filter((id) => id !== coinId);
      } else {
        return [...prev, coinId];
      }
    });
  };

  const isFavorite = (coinId) => {
    return favorites.includes(coinId);
  };

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
