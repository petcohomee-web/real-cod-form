export async function action({ request }: { request: Request }) {
  try {
    const body = await request.json();

    console.log("GELEN DATA:", body);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Sipariş alındı (Vercel canlı)",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server error",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}