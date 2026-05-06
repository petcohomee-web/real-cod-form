export async function loader() {
  return new Response(
    JSON.stringify({
      success: false,
      message: "API çalışıyor ✅"
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

export async function action({ request }: { request: Request }) {
  try {
    const body = await request.json();

    const response = await fetch(
      `https://${process.env.SHOPIFY_STORE}/admin/api/2025-01/orders.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token":
            process.env.SHOPIFY_ACCESS_TOKEN || "",
        },
        body: JSON.stringify({
          order: {
            line_items: [
              {
                variant_id: body.variantId,
                quantity: 1,
              },
            ],
            financial_status: "pending",
            gateway: "Cash on Delivery",
            note: `
İsim: ${body.name}
Telefon: ${body.phone}
Adres: ${body.address}
            `,
          },
        }),
      }
    );

    const data = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        shopify: data,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: String(err),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}