import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import LoadingSpinner from "./LoadingSpinner";
//รายชื่อผู้ใช้
function UserList() {
  const [users, setUsers] = useState([]); //users (ไว้เก็บรายชื่อ)
  const [loading, setLoading] = useState(true); //loading (ไว้โชว์สถานะโหลด)
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json(); //ดึงข้อมูลมา
        setUsers(data); //ข้อมูลมายัดใส่ setUsers ทันที
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

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
        สมาชิก
      </h2>
      {users.map((user) => (
        <UserCard key={user.id} name={user.name} email={user.email} />
      ))}
    </div>
  );
}
export default UserList;
