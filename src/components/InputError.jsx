function InputError({ message, className = "" }) {
  if (!message) return null;
  return <p className={`text-red-500 text-sm mt ${className}`}>{message}</p>;
}

export default InputError;
