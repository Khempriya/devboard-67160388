import { useState } from "react";
//ฟอร์มเพิ่มโพส
//ฟังก์ชันสำหรับอัปเดตค่า
function AddPostForm({ onAddPost }) {
  //ฟังก์ชันนี้รับ Prop
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  //โค้ดนี้สร้างตัวแปร (State) ขึ้นมา 2 ตัวคือ title และ body
  function handleSubmit(e) {
    e.preventDefault(); //ป้องกันไม่ให้หน้าเว็บรีเฟรชตัวเอง
    if (!title.trim() || !body.trim()) return; // ไม่เป็นค่าว่าง ป้องกันส่งว่าง

    onAddPost({ title, body });
    //นำข้อมูลที่ผู้ใช้กรอก แพ็กใส่ Object แล้วส่งกลับไปให้ Component แม่ผ่านฟังก์ชัน onAddPost
    setTitle(""); // เคลียร์ form หลังส่งข้อมูลเสร็จ
    setBody("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1.5rem",
        background: "#f7fafc",
      }}
    >
      <h3 style={{ margin: "0 0 0.75rem", color: "#2d3748" }}>
        เพิ่มโพสต์ใหม่
      </h3>

      <input
        type="text"
        placeholder="หัวข้อโพสต์"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.5rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          boxSizing: "border-box",
        }}
      />

      <textarea
        placeholder="เนื้อหาโพสต์"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      <button
        type="submit"
        style={{
          background: "#1e40af",
          color: "white",
          border: "none",
          padding: "0.5rem 1.5rem",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        โพสต์
      </button>
    </form>
  );
}

export default AddPostForm;
