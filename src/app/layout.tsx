import Layout from "@/components/layout";
import { ModalProvider } from "@/components/layout/ModalContext";
import "@/styles/globals.css";
import "@/styles/slick.css";
import "@/styles/tableContent.css";
import "@/styles/tailwind.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Roboto, Montserrat, Plus_Jakarta_Sans } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-roboto"
});

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-montserrat"
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-plus-jakarta"
});

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
    <html
      lang="vi"
      className={`${roboto.variable} ${montserrat.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="XBEDSkrdjtlx6aHvRTTy14VU8X3C0NbmuETShBOlI74"
        />
        {/* Preconnect to image CDN for faster LCP */}
        <link rel="preconnect" href="https://admintuxa.ulsa.vn" />
        <link rel="dns-prefetch" href="https://admintuxa.ulsa.vn" />
      </head>
      <body className={`bg-white text-gray-800 ${roboto.className}`}>
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
