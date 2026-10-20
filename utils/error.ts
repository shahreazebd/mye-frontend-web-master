import { XiorError } from "xior";

export function extractUploadErrorMessage(error: unknown): string {
  if (error instanceof XiorError) {
    const data = error.response?.data as any;
    if (data?.errors && typeof data.errors === "object") {
      const firstKey = Object.keys(data.errors)[0];
      const firstVal = data.errors[firstKey];
      if (Array.isArray(firstVal) && firstVal.length > 0) {
        return firstVal[0];
      }
      if (typeof firstVal === "string") {
        return firstVal;
      }
    }
    if (data?.message) {
      return data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Failed to upload file. Please try again.";
}
