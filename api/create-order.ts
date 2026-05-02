export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  try {
    const { name, phone, address, variantId } = req.body;

    const response = await fetch(
      `https://${process.env.SHOPIFY_STORE}/admin/api/2024-01/orders.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: {
            line_items: [
              {
                variant_id: variantId,
                quantity: 1,
              },
            ],
            customer: {
              first_name: name,
              phone: phone,
            },
            shipping_address: {
              address1: address,
              phone: phone,
              first_name: name,
              country: "Turkey",
            },
            financial_status: "pending",
          },
        }),
      }
    );

    const data = await response.json();

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}