import { useState } from "react";

function useErrorMessage() {
  const [errMsg, setErrMsg] = useState("");

  const clearError = () => setErrMsg("");
  const setError = (message: string) => setErrMsg(message);

  return { errMsg, setError, clearError };
}

export { useErrorMessage };
