  export async function fetchDiplomas(pageNumber:number,limit:number) {

 const params = new URLSearchParams({
        page: pageNumber.toString(),
        limit: limit.toString()
      });
    const resp = await fetch(`/api/subjects?${params}`, {
      cache: "no-store",
    });

    if (!resp.ok) {
      throw new Error("Error During fetch data from Diploma Page");
    }

    const payload = await resp.json();
    return payload;
  }