import { Montserrat } from "next/font/google";

//https://nextjs.org/docs/app/building-your-application/optimizing/fonts
// If loading a variable font, you don't need to specify the font weight
export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});
