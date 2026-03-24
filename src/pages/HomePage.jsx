import PostList from "../components/PostList";
import AddPostForm from "../components/AddPostForm";
//หน้าหลัก
//คอมโพเนนต์หลักอย่างฟอร์มสร้างโพสต์และรายการโพสต์มาวางไว้ด้วยกัน
function HomePage() {
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <AddPostForm onAddPost={() => {}} />
      <PostList />
    </div>
  );
} //() => {} ไม่ให้โปรแกรมพังเวลาเราเผลอกดปุ่ม Submit
//หน้านี้มี "ฟอร์มเพิ่มโพสต์" อยู่ข้างบน และมี "รายการโพสต์" อยู่ข้างล่าง
export default HomePage;
