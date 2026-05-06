const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function loader() {
  return new Response(
    JSON.stringify({
      success: false,
      message: "API çalışıyor ✅ POST gönder",
    }),
    { headers: corsHeaders }
  );
}

export async function action({ request }: { request: Request }) {
  try {
    const body = await request.json();

    const quantity = Number(body.quantity || 1);

    const response = await fetch(
      `https://${process.env.SHOPIFY_STORE}/admin/api/2025-01/orders.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN || "",
        },
        body: JSON.stringify({
          order: {
            line_items: [
              {
                variant_id: Number(body.variantId),
                quantity: quantity,
              },
            ],
            financial_status: "pending",
            note: `COD Sipariş
İsim: ${body.name}
Telefon: ${body.phone}
Adres: ${body.address}
Adet: ${quantity}`,
          },
        }),
      }
    );

    const data = await response.json();

    return new Response(
      JSON.stringify({
        success: response.ok,
        shopify: data,
      }),
      { headers: corsHeaders }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: String(err),
      }),
      { status: 200, headers: corsHeaders }
    );
  }
}