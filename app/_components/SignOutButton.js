"use client";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "@/app/_lib/action";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";


function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  function onSignOut(e) {
    e.preventDefault();
    startTransition(async () => {
      await signOutAction();
    });
  }

  return (
    <form onSubmit={onSignOut}>
      <button
        type="submit"
        disabled={isPending}
        className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full disabled:opacity-60"
      >
        {isPending ? (
          <span className="flex items-center gap-3">
            <span className="scale-75"><SpinnerMini /></span>
          </span>
        ) : (
          <span className="flex items-center gap-4">
            <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-600" />
            <span>Sign out</span>
          </span>
        )}
      </button>
    </form>
  );
}

export default SignOutButton;
