import { Category } from "@/types";

/* The code is defining a constant variable `URL` which is a string that represents the URL of an API
endpoint. The URL is constructed using the value of the `NEXT_PUBLIC_API_UR` environment variable,
which is accessed through `process.env`. */
const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async () : Promise<Category[]> => {
    const res = await fetch(URL);

    return res.json();
}


export default getCategories;