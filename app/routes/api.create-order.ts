export async function loader() {
  return new Response(
    JSON.stringify({
      success: false,
      message: "API çalışıyor ✅ POST gönder"
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

    return new Response(
      JSON.stringify({
        success: true,
        message: "POST çalışıyor ✅",
        received: body
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: String(err)
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}