export type QuizResultResponse = {
  message: string;
  correct: number;
  wrong: number;
  total: string;
  WrongQuestions: QuizQuestionResult[];
  correctQuestions: QuizQuestionResult[];
};

export type QuizQuestionResult = {
  QID: string;
  Question: string;
  correctAnswer: string;
  answers: Record<string, unknown>;
  inCorrectAnswer?: string;
};
