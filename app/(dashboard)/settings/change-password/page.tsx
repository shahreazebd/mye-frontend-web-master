import { Card } from "@/components/ui/card";
import { ChangePasswordForm } from "@/components/settings/change-password/change-password-form";

export default function ChangePasswordPage() {
  return (
    <section className="flex h-[calc(100vh-200px)] items-center justify-center ">
      <Card className="w-2/6 px-5 py-8">
        <h4 className="mb-1">Change Password</h4>
        <p className="mb-4 text-base text-gray-500">
          Secure Your Account with a New Password
        </p>
        <ChangePasswordForm />
      </Card>
    </section>
  );
}
