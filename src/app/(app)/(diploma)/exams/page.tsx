import { Metadata } from 'next'
import ExamComponent from "./_components/exam-component";

 
export const metadata: Metadata = {
  title: 'Exam Page',
  
}

export default function ExamPage() {

  return <>
  <ExamComponent/>
  </>
}
