import { Metadata } from 'next'
import QuestionsComponent from "./_components/question-component";

// ====================================================================================================================
// ^^==> Types
type QuestionsPageProps = {
  params: {
    questions: string;
  };
};
// ==============================================================================================================
export const metadata: Metadata = {
  title: 'Questions Page',
}

// ==============================================================================================================
export default function QuestionsPage({
  params: { questions },
}: QuestionsPageProps) {
  
 return <QuestionsComponent questions={questions}/>
  

}
