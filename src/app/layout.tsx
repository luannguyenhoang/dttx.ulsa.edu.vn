import Layout from "@/components/layout";
import { ModalProvider } from "@/components/layout/ModalContext";
import "@/styles/globals.css";
import "@/styles/slick.css";
import "@/styles/tableContent.css";
import "@/styles/tailwind.css";
import "@fontsource/roboto";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_DOMAIN || "https://dttx.ulsa.edu.vn"
  ),
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vn">
      <head>
        <meta
          name="google-site-verification"
          content="XBEDSkrdjtlx6aHvRTTy14VU8X3C0NbmuETShBOlI74"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Plus+Jakarta+Sans:wght@200..800&family=Roboto:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-800">
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PTWXZN3C');
          `}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PTWXZN3C"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Layout>
          <ModalProvider>{children}</ModalProvider>
        </Layout>
      </body>
    </html>
  );
}
