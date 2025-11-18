export const metadata = {
  title: "Guest Area",
};

import { auth } from "../_lib/auth";

export default async function Page() {
  const session = await auth();
  const userName = session?.user?.name || session?.user?.email || "Guest";

  return (
    <h1 className="text-2xl font-semibold text-accent-400 mb-4">
      Account
      <p className="text-primary-200">Welcome to your account, {userName}</p>
    </h1>
  );
}
