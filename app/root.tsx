import { Links, Meta, Outlet, Scripts } from "react-router";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

export default function App() {
  return (
    <html>
      <head>
  <Meta />
  <Links />
  <link
    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
    rel="stylesheet"
  />
</head>
      <body style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        <AppProvider i18n={{}}>
          <Outlet />
        </AppProvider>
        <Scripts />
      </body>
    </html>
  );
}