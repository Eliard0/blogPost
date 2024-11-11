import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface FavoriteContextType {
  favorites: Post[];
  toggleFavorite: (item: Post) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Post[]>([]);
  console.log(favorites)

  const toggleFavorite = (item: Post) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id == item.id)) {
        return prevFavorites.filter((fav) => fav.id != item.id);
      } else {
        return [...prevFavorites, item];
      }
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = (): FavoriteContextType => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export { FavoritesProvider };
