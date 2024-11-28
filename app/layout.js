import Head from 'next/head';

export const metadata = {
  title: "SEO LIST",
  description: "Website list",
  keywords: "domains, featured domains, SEO, ads, pages",
};

export default function Layout({ children }) {
  return (
    <>
      {/* Custom HTML and Body tags */}
      <html lang="en">
        <head>
          <Head>
            {/* Global SEO settings */}

            
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="author" content="Your Name or Company" />
            <meta charSet="UTF-8" />
            <link rel="canonical" href="https://yourwebsite.com" />
            <meta property="og:title" content="Home | My App" />
            <meta property="og:description" content="Discover featured domains, pages, and ads in this SEO-optimized Next.js homepage." />
            <meta property="og:url" content="https://yourwebsite.com" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://yourwebsite.com/featured-image.png" />
          </Head>
        </head>

        <body>
          <div>{children}</div>
        </body>
      </html>
    </>
  );
}
