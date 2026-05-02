import {
  Badge,
  Banner,
  BlockStack,
  Button,
  Card,
  Divider,
  InlineGrid,
  InlineStack,
  Page,
  ProgressBar,
  Text,
} from "@shopify/polaris";
import { useEffect, useState } from "react";

const defaultData = {
  embedStatus: true,
  stats: {
    formOpens: 0,
    orders: 0,
    revenue: 0,
    conversionRate: 0,
  },
  setup: {
    step: 3,
    totalSteps: 6,
    progress: 50,
    items: [
      { label: "Create your COD form", done: true },
      { label: "Activate Theme App Embed", done: true },
      { label: "Connect Pixel tracking", done: false },
      { label: "Set fraud prevention rules", done: false },
      { label: "Connect WhatsApp notifications", done: false },
    ],
  },
  plan: {
    name: "Free Plan",
    usedOrders: 0,
    orderLimit: 50,
  },
  balance: {
    sms: 0,
    whatsapp: 0,
  },
  news: {
    title: "Dashboard data system hazırlandı",
    description:
      "Dashboard artık API verisiyle çalışmaya hazır. Sıradaki adım gerçek form açılışı, sipariş ve gelir verilerini bağlamak.",
  },
};

export default function Dashboard() {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((res) =>
        setData({
          ...defaultData,
          ...res,
          stats: { ...defaultData.stats, ...res.stats },
          setup: { ...defaultData.setup, ...res.setup },
          plan: { ...defaultData.plan, ...res.plan },
          balance: { ...defaultData.balance, ...res.balance },
          news: { ...defaultData.news, ...res.news },
        })
      )
      .catch(() => setData(defaultData));
  }, []);

  if (!data) {
    return <Page title="Dashboard">Loading...</Page>;
  }

  const planProgress = (data.plan.usedOrders / data.plan.orderLimit) * 100;

  const performanceCards = [
    [String(data.stats.formOpens), "Form Opens"],
    [String(data.stats.orders), "Orders"],
    [`TRY ${data.stats.revenue.toLocaleString("en-US")}`, "Revenue"],
    [`${data.stats.conversionRate}%`, "Conversion Rate"],
  ];

  return (
    <Page title="Dashboard">
      <style>{`
        .wnWrap{max-width:920px;margin:0 auto;animation:wnFade .22s ease}
        @keyframes wnFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .wnCard{border-radius:16px;transition:.16s ease}
        .wnCard:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(15,23,42,.08)}
        .wnMetric{font-size:36px;font-weight:800;letter-spacing:-0.04em;color:#111827;line-height:1.05;font-variant-numeric:tabular-nums}
        .wnActionCard{min-height:178px}
        .wnIconBox{width:100%;height:82px;border-radius:14px;background:linear-gradient(135deg,#f5f3ff,#fff7ed);display:flex;align-items:center;justify-content:center;font-size:36px}
        .wnPill{display:inline-flex;border-radius:999px;padding:4px 9px;background:#f5f3ff;color:#5b21b6;font-size:12px;font-weight:700}
        .wnButton button{border-radius:9px!important;transition:.15s ease!important}
        .wnButton button:active{transform:scale(.98)}
        .wnUpdate{border-radius:16px;background:linear-gradient(135deg,#f5f3ff,#fff);border:1px solid #e5e7eb;overflow:hidden}
        .wnUpdateInner{display:grid;grid-template-columns:1.4fr .8fr;gap:18px;align-items:center;padding:22px}
        .wnArt{min-height:120px;border-radius:14px;background:radial-gradient(circle at 30% 25%,#c4b5fd,transparent 28%),linear-gradient(135deg,#ede9fe,#fdf2f8);display:flex;align-items:center;justify-content:center;font-size:42px}
        @media(max-width:900px){.wnWrap{max-width:100%}.wnUpdateInner{grid-template-columns:1fr}}
      `}</style>

      <div className="wnWrap">
        <BlockStack gap="500">
          <InlineStack align="space-between" blockAlign="center">
            <BlockStack gap="100">
              <Text as="h1" variant="headingXl">Dashboard</Text>
              <Text as="p" tone="subdued">
                Real COD FORM uygulamanın kurulum ve performans merkezi.
              </Text>
            </BlockStack>

            <InlineStack gap="200">
              <Button>Support?</Button>
              <Button variant="primary">Form Designer</Button>
            </InlineStack>
          </InlineStack>

          <div className="wnCard">
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <BlockStack gap="100">
                    <Text as="h2" variant="headingMd">Onboarding Guide</Text>
                    <Text as="p" tone="subdued">
                      Kapıda ödeme formunu mağazada çalıştırmak için adımları tamamla.
                    </Text>
                  </BlockStack>
                  <Badge tone="success">
                    Step {data.setup.step} / {data.setup.totalSteps}
                  </Badge>
                </InlineStack>

                <ProgressBar progress={data.setup.progress} tone="success" size="small" />

                <div style={{ background: "#f6f6f7", borderRadius: 12, padding: 16 }}>
                  <InlineStack align="space-between" blockAlign="center">
                    <BlockStack gap="200">
                      <InlineStack gap="200" blockAlign="center">
                        <Badge tone={data.embedStatus ? "success" : "critical"}>
                          {data.embedStatus ? "ON" : "OFF"}
                        </Badge>
                        <Text as="p" fontWeight="semibold">
                          Theme App Embed durumu
                        </Text>
                      </InlineStack>

                      <Text as="p" tone="subdued">
                        {data.embedStatus
                          ? "Theme App Embed aktif görünüyor. COD form mağazada çalışmaya hazır."
                          : "Theme App Embed aktif değil. Formun mağazada görünmesi için açılmalı."}
                      </Text>

                      <div className="wnButton">
                        <Button variant="primary">Temayı Aç</Button>
                      </div>
                    </BlockStack>

                    <div style={{
                      width: 92,
                      height: 70,
                      borderRadius: 12,
                      background: "linear-gradient(135deg,#ffffff,#ede9fe)",
                      border: "1px solid #e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28
                    }}>
                      ⚡
                    </div>
                  </InlineStack>
                </div>

                {data.setup.items.map((item: any) => (
                  <InlineStack key={item.label} gap="300" blockAlign="center">
                    <Badge tone={item.done ? "success" : "new"}>
                      {item.done ? "✓" : "•"}
                    </Badge>
                    <Text as="p">{item.label}</Text>
                  </InlineStack>
                ))}
              </BlockStack>
            </Card>
          </div>

          <BlockStack gap="300">
            <InlineStack align="space-between">
              <Text as="h2" variant="headingMd">Performance Report</Text>
              <InlineStack gap="100">
                <Button pressed>Today</Button>
                <Button>7 days</Button>
                <Button>30 days</Button>
              </InlineStack>
            </InlineStack>

            <InlineGrid columns={4} gap="300">
              {performanceCards.map(([value, label]) => (
                <div className="wnCard" key={label}>
                  <Card>
                    <BlockStack gap="150">
                      <div className="wnMetric">{value}</div>
                      <Text as="p" tone="subdued">{label}</Text>
                    </BlockStack>
                  </Card>
                </div>
              ))}
            </InlineGrid>
          </BlockStack>

          <InlineGrid columns={2} gap="300">
            <div className="wnCard">
              <Card>
                <BlockStack gap="300">
                  <InlineStack align="space-between">
                    <Text as="h2" variant="headingMd">Plan Durumu</Text>
                    <Badge tone="info">{data.plan.name}</Badge>
                  </InlineStack>

                  <Text as="p" tone="subdued">
                    {data.plan.usedOrders} / {data.plan.orderLimit} sipariş kullanıldı
                  </Text>

                  <ProgressBar progress={planProgress} tone="primary" size="small" />

                  <div className="wnButton">
                    <Button variant="primary">Planı Yükselt</Button>
                  </div>
                </BlockStack>
              </Card>
            </div>

            <div className="wnCard">
              <Card>
                <BlockStack gap="300">
                  <Text as="h2" variant="headingMd">SMS / WhatsApp Bakiyesi</Text>

                  <InlineStack align="space-between">
                    <Text as="p">SMS</Text>
                    <Text as="p" fontWeight="semibold">{data.balance.sms} kredi</Text>
                  </InlineStack>

                  <InlineStack align="space-between">
                    <Text as="p">WhatsApp</Text>
                    <Text as="p" fontWeight="semibold">{data.balance.whatsapp} mesaj</Text>
                  </InlineStack>

                  <div className="wnButton">
                    <Button>Bakiye Yükle</Button>
                  </div>
                </BlockStack>
              </Card>
            </div>
          </InlineGrid>

          <BlockStack gap="300">
            <Text as="h2" variant="headingMd">
              Grow your COD sales
            </Text>

            <InlineGrid columns={3} gap="300">
              {[
                ["🎨", "Open Form Designer", "Customize fields, layout, language, colors and live preview.", "Open designer"],
                ["🛡️", "Set Fraud Prevention", "Block risky phone numbers, duplicate orders and suspicious users.", "Open fraud rules"],
                ["📈", "Launch Sales Booster", "Add order bump, quantity offers and post-purchase upsells.", "Open booster"],
              ].map(([icon, title, desc, button]) => (
                <div className="wnCard wnActionCard" key={title}>
                  <Card>
                    <BlockStack gap="300">
                      <div className="wnIconBox">{icon}</div>
                      <Text as="h3" variant="headingMd">{title}</Text>
                      <Text as="p" tone="subdued">{desc}</Text>
                      <div className="wnButton">
                        <Button>{button}</Button>
                      </div>
                    </BlockStack>
                  </Card>
                </div>
              ))}
            </InlineGrid>
          </BlockStack>

          <div className="wnUpdate">
            <div className="wnUpdateInner">
              <BlockStack gap="300">
                <span className="wnPill">News / Updates</span>
                <Text as="h2" variant="headingLg">
                  {data.news.title}
                </Text>
                <Text as="p" tone="subdued">
                  {data.news.description}
                </Text>
                <Divider />
                <InlineStack gap="200">
                  <Button variant="primary">Önceki güncellemeler</Button>
                  <Button>Yardım merkezi</Button>
                </InlineStack>
              </BlockStack>

              <div className="wnArt">🚀</div>
            </div>
          </div>

          <Banner tone="info" title="Sıradaki adım">
            <p>
              Dashboard datasını API’ye bağladık. Şimdi gerçek form açılışı, sipariş ve gelir verilerini bağlayacağız.
            </p>
          </Banner>
        </BlockStack>
      </div>
    </Page>
  );
}