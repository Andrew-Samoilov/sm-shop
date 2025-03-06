'use client';
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
    const { pending } = useFormStatus();
    
    return (
        <button
            type="submit"
            disabled={pending}
            className={`btn btn-primary btn-md ${pending ? "opacity-50 cursor-not-allowed" : ""}`}>
            Шукати
        </button>
    )
}
