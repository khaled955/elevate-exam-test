//^^==>Exam inside each question
export type Exam = {
  _id: string;
  title: string;
  duration: number;
  subject: string; // subject id
  numberOfQuestions: number;
  active: boolean;
  createdAt: string; // ISO date string
};
// ===============================================================================================================
//^^==>Single answer option
export type AnswerOption = {
  answer: string;
  key: string; // e.g. "A1", "A2" ...
};
// ==============================================================================================================
//^^==>Question
export type Question = {
  _id: string;
  question: string;
  answers: AnswerOption[];
  type: "single_choice" | string;
  correct: string; // e.g. "A1" (matches AnswerOption.key)
  subject: string | null;
  exam: Exam;
  createdAt: string; // ISO date string
};
// ==========================================================================================================
//^^==>Full API response
declare type QuestionsResponse = {
  message: "success";
  questions: Question[];
};

// ================================================================================================================
export type ExamAnswerFormValues = {
  answers: {
    questionId: string;
    correct: string; // "A1" | "A2" | "A3" | "A4"
  }[];
  time: number; // seconds spent
};
