import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Carte de citation",
  description: "Créez des cartes de citation personnalisées",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700|Montserrat:400,700|Lato:400,700|Oswald:400,700|Raleway:400,700|Merriweather:400,700|Playfair+Display:400,700|Poppins:400,700|Nunito:400,700|Quicksand:400,700|Ubuntu:400,700|Fira+Sans:400,700|Source+Sans+Pro:400,700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
