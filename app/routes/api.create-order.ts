export async function action({ request }: { request: Request }) {
  try {
    const body = await request.json();

    console.log("COD DATA:", body);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Sipariş test olarak alındı",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server error",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}