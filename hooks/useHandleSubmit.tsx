"use client"
import emailjs from "emailjs-com"
import { useState } from "react"

export default function useHandleSubmit() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const form = e.currentTarget as HTMLFormElement

        try {
        await emailjs.sendForm(
            process.env.NEXT_PUBLIC_SERVICE_ID!,
            process.env.NEXT_PUBLIC_TEMPLATE_ID!,
            form,
            process.env.NEXT_PUBLIC_PUBLIC_KEY!
        )
        console.log("environmet variables", {
            serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
            templateId: process.env.NEXT_PUBLIC_TEMPLATE_ID,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
        }
        )
        setSuccess(true)
        form.reset()
        } catch (err) {
        console.error(err)
        alert("Error sending message")
        }

        setLoading(false)
    }
    return { handleSubmit, loading, success }
}