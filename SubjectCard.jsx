export default function SubjectCard({ subject, progress, onClick, onDelete }) {
  return (
    <div onClick={onClick} style={{ padding: 16, border: "1px solid #eee", marginTop: 10 }}>
      <h3>{subject.name}</h3>
      <p>{progress}점</p>
      <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>삭제</button>
    </div>
  );
}