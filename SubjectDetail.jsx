import EvaluationItem from "./EvaluationItem";
import WaterFillBar from "./WaterFillBar";
import { calculateSubjectScore } from "../utils";

export default function SubjectDetail({ subject, onBack, onUpdate }) {
  const score = calculateSubjectScore(subject.evaluations);

  return (
    <div>
      <button onClick={onBack}>←</button>
      <WaterFillBar evaluations={subject.evaluations} />
      <p>{score.toFixed(1)}점</p>

      {subject.evaluations.map((item, i) => (
        <EvaluationItem key={item.id} item={item} onChange={(v)=>{}} />
      ))}
    </div>
  );
}