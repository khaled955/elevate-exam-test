export async function fetchQuestionsService(examId: string) {
  const resp = await fetch(`/api/questions/?exam=${examId}`);
  const payload = await resp.json();
  return payload;
}
