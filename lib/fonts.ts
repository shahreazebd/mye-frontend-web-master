import { Archivo } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
export const archivoFont = Archivo({
  subsets: ["latin"], // Define subsets
  display: "swap", // Use 'swap' for better loading
  variable: "--font-archivo",
});
