"use client";

interface FavoriteButtonProps {
  collegeId: number;
  favorites: number[];
  onToggle: (id: number) => void;
}

export default function FavoriteButton({ collegeId, favorites, onToggle }: FavoriteButtonProps) {
  const isFav = favorites.includes(collegeId);
  return (
    <button
      className={`fav-btn ${isFav ? "active" : ""}`}
      onClick={(e) => { e.stopPropagation(); onToggle(collegeId); }}
      title={isFav ? "Remove from favorites" : "Add to favorites"}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      {isFav ? "♥" : "♡"}
    </button>
  );
}
