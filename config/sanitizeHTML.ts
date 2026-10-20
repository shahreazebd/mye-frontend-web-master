import DOMPurify from "isomorphic-dompurify";

export default function sanitizeHTML(dirty: any) {
  return DOMPurify.sanitize(dirty);
}
