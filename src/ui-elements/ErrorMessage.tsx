import { FC } from 'react';

// Define the props interface
interface ErrorMessageProps {
  error: string | null;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  return (
    <>
      {error && (
        <span className="text-red-600 text-left block text-xs md:text-base">
          {error}
        </span>
      )}
    </>
  );
};

export default ErrorMessage;
