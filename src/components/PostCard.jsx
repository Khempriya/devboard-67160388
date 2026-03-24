import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import CommentList from "./CommentList";
//กล่องข้อความแสดงโพส
function PostCard({ post }) {
  //post (Props): รับข้อมูลของโพสต์ 1 โพสต์ id titleมาจากคอมโพเนนต์แม่เพื่อนำมาแสดงผล
  const { favorites, toggleFavorite } = useFavorites();
  //เรียกใช้ Context เพื่อดึงฟังก์ชันและข้อมูลส่วนกลางมาใช้:
  //favorites: รายการ ID ของโพสต์ที่ถูกใจทั้งหมด/toggleFavorite: ฟังก์ชันสำหรับกดเพิ่ม/ลบโพสต์นี้ออกจากรายการถูกใจ
  const isFavorite = favorites.includes(post.id);
  //เป็นตัวแปรที่เช็คว่า โพสต์ปัจจุบันนี้ (post.id) อยู่ในรายการ favorites หรือเปล่า
  const [showComments, setShowComments] = useState(false);
  //ผู้ใช้กำลังเปิดดูคอมเมนต์ของโพสต์นี้อยู่หรือไม่" โดยเริ่มต้นกำหนดเป็น false ซ่อนไว้ก่อน
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "white",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem" }}>
        <Link
          to={`/posts/${post.id}`}
          style={{ color: "#1e40af", textDecoration: "none" }}
        >
          {post.title}
        </Link>
      </h3>
      <p style={{ margin: "0 0 0.75rem", color: "#4a5568", lineHeight: 1.6 }}>
        {post.body}
      </p>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => toggleFavorite(post.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            color: isFavorite ? "#e53e3e" : "#a0aec0",
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

        <button
          onClick={() => setShowComments((prev) => !prev)}
          style={{
            background: "none",
            border: "1px solid #e2e8f0",
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "4px",
            color: "#4a5568",
          }}
        >
          {showComments ? "▲ ซ่อน" : "▼ ความคิดเห็น"}
        </button>
      </div>

      {showComments && <CommentList postId={post.id} />}
    </div> //การประกอบร่างกับ CommentList
  );
}
//&& ทำหน้าที่บอกว่า "ถ้า showComments เป็น true เท่านั้น ถึงจะแสดงคอมโพเนนต์ <CommentList> ออกมา" พร้อมกับส่ง post.id ไปให้ CommentList ไปโหลดข้อมูลต่อ
export default PostCard;
