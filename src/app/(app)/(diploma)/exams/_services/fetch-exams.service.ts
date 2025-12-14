 export async function fetchExamsService(){

const res = await fetch(`/api/exams`)



const payLoad = await res.json()

return payLoad



}