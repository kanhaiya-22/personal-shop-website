"use client";

import { ta } from "@/i18n";
import { CircleAlert, Eye, EyeOff, LoaderCircle, LockKeyhole } from "lucide-react";
import { useActionState, useState } from "react";
import { login } from "@/server/actions/admin";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const [show, setShow] = useState(false);
  const input =
    "h-12 w-full rounded-xl border-2 border-line bg-white px-4 text-base outline-none transition focus:border-navy-900";
  return (
    <form action={action} className="grid gap-5">
      <div>
        <label htmlFor="identifier" className="mb-1.5 block text-sm font-semibold text-navy-900">
          {ta.login.identifier}
        </label>
        <input id="identifier" name="identifier" autoComplete="username" required className={input} autoFocus />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-navy-900">
          {ta.login.password}
        </label>
        <div className="relative">
          <input id="password" name="password" type={show ? "text" : "password"} autoComplete="current-password" required className={`${input} pr-12`} />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? ta.login.hide : ta.login.show}
            className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-navy-500 hover:bg-navy-50"
          >
            {show ? <EyeOff className="size-5" aria-hidden="true" /> : <Eye className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>
      {state?.error && (
        <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-navy-700 to-navy-950 font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
      >
        {pending ? <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> : <LockKeyhole className="size-5" aria-hidden="true" />}
        {pending ? ta.login.submitting : ta.login.submit}
      </button>
    </form>
  );
}
