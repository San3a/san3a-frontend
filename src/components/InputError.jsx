function InputError({ message, className = "" }) {
  if (!message) return null;
  return <p className={`text-red-500 text-xs  ${className}`}>{message}</p>;
}

export default InputError;
