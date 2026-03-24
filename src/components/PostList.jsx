import { useState, useEffect } from "react";
import { useFavorites } from "../context/FavoritesContext";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";
import PostCount from "./PostCount";
//ศูนย์กลาง รายการรวมโพสและสมาชิก พื้นหลัง
//PostCard และ LoadingSpinner มารวมกัน
function PostList() {
  const { favorites, toggleFavorite } = useFavorites();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  //มีการจอง State
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        //ดึงข้อมูลโพสต์จำลองจาก jsonplaceholder
        if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
        const data = await res.json();
        setPosts(data.slice(0, 20)); // เอาแค่ 20 รายการแรกมาแสดง
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filtered = posts.filter(
    (
      post, //สร้างตัวแปร filtered มารองรับก่อน
    ) => post.title.toLowerCase().includes(search.toLowerCase()),
  ); //.toLowerCase()ค้นหาได้เจอเสมอ ไม่ว่าจะพิมพ์พิมพ์เล็กหรือพิมพ์ใหญ่
  //หัวข้อโพสต์ (title) มีคำค้นหา (search) ซ่อนอยู่หรือไม่
  if (loading) return <LoadingSpinner />;
  //ถ้าดึงข้อมูลสำเร็จ แสดงแอนิเมชันวงกลมหมุนๆ
  if (error)
    //และถ้าดึงข้อมูลไม่สำเร็จ ก็จะแสดงกล่องข้อความสีแดง
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>

      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}
      {filtered.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => toggleFavorite(post.id)}
        />
      ))}
      <PostCount count={posts.length} />
    </div>
  ); //จำนวนโพส
}

export default PostList;
