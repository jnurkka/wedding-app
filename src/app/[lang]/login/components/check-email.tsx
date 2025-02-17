import { Dictionary } from "../../types";

export const CheckEmailComponent = ({ dict, type }: { dict: Dictionary; type: 'registration' | 'login' }) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow rounded-md sm:px-10 text-center">
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
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {dict.login.check_email_title}
        </h2>
        <p className="text-gray-600 mb-6">{type === 'login' ? dict.login.check_email_message_login : dict.login.check_email_message_register}</p>
        <p className="text-sm text-gray-500">
          {dict.login.check_email_message_2}
        </p>
      </div>
    </div>
  );
};
