import { useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import UserList from "./components/UserList";
import AddPostForm from "./components/AddPostForm";
import PostCount from "./components/PostCount";

function App() {
  const [favorites, setFavorites] = useState([]); /* เก็บ id ที่ถูกใจ */
  /* Toggle ถูกใจ/ยกเลิก */
  function handleToggleFavorite(postId) {
    setFavorites(
      (prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId) /* ลบออก */
          : [...prev, postId] /* เพิ่มเข้า */,
    );
  }
  return (
    <div>
      <div
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "0 1rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
        }}
      >
        {/* คอลัมน์ซ้าย: โพสต์ */}
        <div>
          <AddPostForm onAddPost={() => {}} /> {/* จะเชื่อมใน wk14 */}
          <PostList
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
        {/* คอลัมน์ขวา: สมาชิก */}
        <div>
          <UserList />
        </div>
      </div>
    </div>
  );
}

export default App;
