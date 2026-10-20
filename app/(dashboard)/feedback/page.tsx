import { Metadata } from "next";

import FeedbackWrapper from "@/components/feedback/feedback-wrapper";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Hand-picked themes that you can copy and paste into your apps.",
};

export default function FeedbackPage() {
  return <FeedbackWrapper />;
}
