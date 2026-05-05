import React, { useState, useEffect } from "react";
import SubjectCard from "./components/SubjectCard";
import SubjectDetail from "./components/SubjectDetail";
import { calculateTotalGPA } from "./utils";

export default function App() {
  const [subjects, setSubjects] = useState(() => {
    try {
      const saved = localStorage.getItem("subjects");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    setSubjects([
      ...subjects,
      {
        id: Date.now(),
        name: "새 과목",
        credit: 3,
        type: "major",
        evaluations: [],
      },
    ]);
  };

  const updateSubject = (id, updated) => {
    setSubjects(subjects.map((s) => (s.id === id ? updated : s)));
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const selectedSubject = subjects.find((s) => s.id === selectedId);

  if (selectedSubject) {
    return (
      <SubjectDetail
        subject={selectedSubject}
        onBack={() => setSelectedId(null)}
        onUpdate={(updated) => updateSubject(selectedId, updated)}
      />
    );
  }

  return (
    <div style={{ padding: "16px", maxWidth: "480px", margin: "0 auto" }}>
      <h1>Grade Calculator</h1>
      <h2>GPA: {calculateTotalGPA(subjects)}</h2>

      <button style={btn} onClick={addSubject}>
        + 과목 추가
      </button>

      {subjects.map((s) => {
        let progress = 0;
        s.evaluations.forEach((e) => {
          if (e.myScore !== "" && e.maxScore) {
            const percent = (e.myScore / e.maxScore) * 100;
            progress += (percent * e.weight) / 100;
          }
        });

        return (
          <SubjectCard
            key={s.id}
            subject={s}
            progress={progress.toFixed(1)}
            onClick={() => setSelectedId(s.id)}
            onDelete={() => deleteSubject(s.id)}
          />
        );
      })}
    </div>
  );
}

const btn = {
  background: "#FF6F61",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "8px",
};