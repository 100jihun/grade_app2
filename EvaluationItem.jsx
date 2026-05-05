export default function EvaluationItem({ item, onChange }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <input placeholder="항목명" />
      <input placeholder="내 점수" />
      <input placeholder="만점" />
      <input placeholder="%" />
    </div>
  );
}