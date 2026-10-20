"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const handelThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  return (
    <Button variant="ghost" size="sm" onClick={handelThemeToggle}>
      <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
