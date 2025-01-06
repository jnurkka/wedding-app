export const CheckEmailComponent = () => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto mb-4 text-indigo-700"
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
          Check Your Email
        </h2>
        <p className="text-gray-600 mb-6">
          {`We've sent a magic link to your email address.
          Click the link to sign in.`}
        </p>
        <p className="text-sm text-gray-500">
          {`The link will expire in 1 hour.
          If you don't see the email, check your spam folder.`}
        </p>
      </div>
    </div>
  )
}