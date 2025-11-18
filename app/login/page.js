import SignInButton from "../_components/SignInButton";
import CredentialsSignInForm from "../_components/CredentialsSignInForm";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-10">
      <h2 className="text-3xl font-semibold text-center">
        Sign in to access your guest area
      </h2>

      <div className="flex flex-col w-full max-w-md gap-6 items-stretch">
        <CredentialsSignInForm />

        <div className="flex items-center gap-4">
          <span className="flex-1 h-px bg-gray-300" />
          <span className="text-2xl text-gray-500">or</span>
          <span className="flex-1 h-px bg-gray-300" />
        </div>

        <SignInButton />
      </div>
    </div>
  );
}
