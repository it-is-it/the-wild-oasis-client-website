"use client";

import Image from "next/image";
import { signInAction } from "@/app/_lib/action";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function SignInButton() {
  const [isPending, startTransition] = useTransition();

  function onSubmit(e) {
    e.preventDefault();
    startTransition(async () => {
      await signInAction();
    });
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center justify-center gap-6 text-lg border border-primary-300 px-6 py-4 font-medium w-full text-center disabled:opacity-60"
      >
        {isPending ? (
          <span className="flex items-center gap-3">
            <span className="scale-75"><SpinnerMini /></span>
            <span>Signing in...</span>
          </span>
        ) : (
          <>
            <Image
              src="https://authjs.dev/img/providers/google.svg"
              alt="Google logo"
              height={24}
              width={24}
              priority
            />
            <span>Continue with Google</span>
          </>
        )}
      </button>
    </form>
  );
}

export default SignInButton;
