 export async function fetchExamsService(){

const res = await fetch(`/api/exams`)

// if(!res.ok){
//   throw new Error("Error During Fetch Exams From Exam Page")
// }

const payLoad = await res.json()

return payLoad



}