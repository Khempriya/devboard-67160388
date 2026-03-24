function LoadingSpinner() {
  //ทำหน้าที่แสดง "ไอคอนหมุนๆ ตอนกำลังโหลด"
  return (
    <div style={{ textAlign: "center", padding: "3rem", color: "#718096" }}>
      <div
        style={{
          display: "inline-block",
          width: "40px",
          height: "40px",
          border: "4px solid #e2e8f0",
          borderTopColor: "#1e40af",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p style={{ marginTop: "1rem" }}>กำลังโหลด...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div> //ให้หมุนไปจนถึง 360 องศา มันคือการสั่งให้เล่นแอนิเมชันชื่อ spin โดยใช้เวลา 0.8 วินาทีต่อ 1 รอบ ด้วยความเร็วคงที่
  );
}
export default LoadingSpinner;
