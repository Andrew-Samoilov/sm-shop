"use client";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children: string;
  disabled?: boolean;
  pendingText?: string;
  className?: string;
}

export function SubmitButton({
  children,
  disabled,
  pendingText,
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled ?? pending}
      className={`btn btn-primary btn-md ${className ?? ""} ${pending ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {pending ? (pendingText ?? children) : children}
    </button>
  );
}
