import axios from "axios"
import { useState } from "react"

export default async function AddTask() {
    const [titile, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [due_date, setDue_date] = useState("");
    try {
        const res = axios.post('http://localhost:5000/task/add', {

        })
    }
}