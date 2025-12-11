export async function fetchQuestions(examId: string) {
  const resp = await fetch(`/api/questions/?exam=${examId}`);
  const data = await resp.json();
  return data;
}
