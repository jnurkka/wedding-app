import Link from "next/link";
import { Dictionary } from "../types";

export const RegistrationSuccess = ({ dict, email }: { dict: Dictionary; email?: string }) => {
  const linkToLogin = email ? `/login?email=${email}` : "/login";
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto mb-4 text-emerald-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {dict.register.title}
        </h2>
        <p className="text-gray-600 mb-6">{dict.register.subtitle}</p>
        <Link href={linkToLogin}>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md">
            {dict.register.buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};
