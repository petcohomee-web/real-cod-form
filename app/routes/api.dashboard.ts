export async function loader() {
  return Response.json({
    embedStatus: true,

    stats: {
      formOpens: 12,
      orders: 5,
      revenue: 5200,
      conversionRate: 41,
    },

    plan: {
      name: "Free Plan",
      usedOrders: 5,
      orderLimit: 50,
    },

    balance: {
      sms: 120,
      whatsapp: 30,
    },

    news: {
      title: "Dashboard API bağlandı",
      description:
        "Dashboard verileri artık API route üzerinden geliyor.",
    },
  });
}