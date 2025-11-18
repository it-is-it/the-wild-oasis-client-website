"use client";
import { useState } from "react";
import { signInCredentialsAction } from "@/app/_lib/action";
import Spinner from "./Spinner";

function CredentialsSignInForm() {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    async function action(formData) {
        try {
            setPending(true);
            setError("");
            const res = await signInCredentialsAction(formData);
            if (res?.error) setError(res.error);
        } finally {
            setPending(false);
        }
    }

    return (
        <form action={action} className="flex flex-col gap-2 w-full">
            {error && (
                <div className="text-red-600 text-sm border border-red-300 bg-red-50 px-3 py-2">
                    {error}
                </div>
            )}
            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                disabled={pending}
                className="border border-primary-300 px-4 py-3 w-full disabled:opacity-60"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                required
                disabled={pending}
                className="border border-primary-300 px-4 py-3 w-full disabled:opacity-60"
            />
            <button
                type="submit"
                disabled={pending}
                className="border border-primary-300 px-10 py-4 font-medium disabled:opacity-60 w-full text-center flex items-center justify-center gap-3"
            >
                {pending && <span className="scale-75"><Spinner /></span>}
                {pending ? "Signing in..." : "Sign in with Email"}
            </button>
        </form>
    );
}

export default CredentialsSignInForm;
