import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";

import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  // eslint-disable-next-line no-undef
  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <AppProvider embedded apiKey={apiKey}>
      <s-app-nav>
    <s-link href="/app" rel="home">Dashboard</s-link>
    <s-link href="/app/form-designer">Form Tasarımcısı</s-link>
    <s-link href="/app/fraud-prevention">Dolandırıcılık Önleme</s-link>
    <s-link href="/app/delivery-success">Teslimat Başarısı</s-link>
    <s-link href="/app/sales-booster">Satış Artırıcı</s-link>
    <s-link href="/app/analytics">Analitik</s-link>
    <s-link href="/app/settings">Ayarlar ve Entegrasyonlar</s-link>
    <s-link href="/app/billing">Fatura Planları</s-link>
  </s-app-nav>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs React Router to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
