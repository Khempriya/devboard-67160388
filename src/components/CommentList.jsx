import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
//รายการคอมเม้น
function CommentList({ postId }) {
  // postId รับ ID ของโพสต์มาจากคอมโพเนนต์แม่ เพื่อให้รู้ว่าต้องไปดึงคอมเมนต์ของโพสต์ไหน
  const [comments, setComments] = useState([]); //เก็บอะเรย์ของข้อมูลความคิดเห็นที่ดึงมาได้ และเริ่มต้นต้องเป็นค่าว่าง
  const [loading, setLoading] = useState(true); //เก็บสถานะว่ากำลังโหลดข้อมูลอยู่หรือไม่;
  const [error, setError] = useState(null); //เก็บข้อความแจ้งเตือนกรณีดึงข้อมูลไม่สำเร็จ

  useEffect(() => {
    //เพื่อสั่งให้ฟังก์ชัน fetchComments ทำงาน
    async function fetchComments() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        ); //เรียก API โดยใช้ postId ที่เปลี่ยนได้
        if (!res.ok) throw new Error("ดึงความคิดเห็นไม่สำเร็จ");
        const data = await res.json();
        setComments(data); //แปลง response → เก็บลง state
      } catch (err) {
        setError(err.message); //ถ้ามี error → เก็บข้อความ error
      } finally {
        setLoading(false);
      } //ไม่ว่าจะสำเร็จหรือพัง → ปิด loading
    }
    fetchComments();
  }, [postId]); // [] = ทำครั้งเดียวตอน component mount

  if (loading)
    return <p style={{ color: "#718096" }}>กำลังโหลดความคิดเห็น...</p>;
  if (error) return <p style={{ color: "#c53030" }}>{error}</p>;

  return (
    <div style={{ marginTop: "0.75rem" }}>
      <strong style={{ color: "#4a5568" }}>
        ความคิดเห็น ({comments.length})
      </strong>
      {comments.map((comment) => (
        <div
          key={comment.id}
          style={{
            background: "#f7fafc",
            borderRadius: "6px",
            padding: "0.5rem 0.75rem",
            marginTop: "0.5rem",
            fontSize: "0.85rem",
          }}
        >
          <div style={{ fontWeight: "bold", color: "#2d3748" }}>
            {comment.name}
          </div>
          <div style={{ color: "#718096" }}>{comment.body}</div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
