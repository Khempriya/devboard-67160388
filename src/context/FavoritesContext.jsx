import { createContext, useContext, useState } from "react";
//ระบบจัดการการถูกใจ
const FavoritesContext = createContext();
//การสร้างศูนย์กลางข้อมูล
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  //สิ่งที่อยู่ข้างใน ({children}) จะสามารถเข้าถึงข้อมูลนี้ได้ทั้งหมด
  function toggleFavorite(postId) {
    setFavorites((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
