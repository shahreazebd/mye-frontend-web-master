import MainFooter from "@/components/footer/main-footer";
import MainNavigation from "@/components/navigation/main/main-navigation";

import "@/styles/globals.css";

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <section>
      <MainNavigation />
      {children}
      <MainFooter />
    </section>
  );
}
