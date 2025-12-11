import z from "zod"



export const loginSchema =z.object({
    email:z.email({ error: (iss) => !Boolean(iss.input)?"Email Is Required":"Invalid Email"
}),
    password:z.string().nonempty("Password Is Required")
})


