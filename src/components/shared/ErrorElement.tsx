const ErrorElement = ({ message }: { message: string }) => {
  return <p className="text-error text-sm text-center p-2">{message}</p>;
};

export default ErrorElement;
