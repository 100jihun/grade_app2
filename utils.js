export function calculateSubjectScore(evaluations) {
  let total = 0;

  evaluations.forEach((e) => {
    if (e.myScore !== "" && e.maxScore) {
      const percent = (e.myScore / e.maxScore) * 100;
      total += (percent * e.weight) / 100;
    }
  });

  return Math.min(total, 100);
}

export function scoreToGPA(score) {
  if (score >= 95) return 4.5;
  if (score >= 90) return 4.0;
  if (score >= 85) return 3.5;
  if (score >= 80) return 3.0;
  if (score >= 75) return 2.5;
  if (score >= 70) return 2.0;
  if (score >= 65) return 1.5;
  if (score >= 60) return 1.0;
  return 0;
}

export function calculateTotalGPA(subjects) {
  let totalPoints = 0;
  let totalCredits = 0;

  subjects.forEach((s) => {
    const score = calculateSubjectScore(s.evaluations);
    const gpa = scoreToGPA(score);

    totalPoints += gpa * s.credit;
    totalCredits += s.credit;
  });

  return totalCredits === 0
    ? 0
    : (totalPoints / totalCredits).toFixed(2);
}