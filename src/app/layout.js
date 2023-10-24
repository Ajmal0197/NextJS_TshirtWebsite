import "./globals.css";

import NavBar from "../components/NavBar";
import { montserrat } from "./fonts";
import Provider from "../components/Provider";

//used for SEO and website search ranking improvement
//https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata = {
  title: "NextJS Store", // title on browser
  description: "You can shop coding shirt from this",
  keywords: ["shirt", "coding shirt", "dark shirt"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-gray-100 ${montserrat.className}`}>
        <Provider>
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
