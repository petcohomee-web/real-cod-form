export async function action({ request }: { request: Request }) {
  try {
    return new Response(
      JSON.stringify({
        success: true,
        message: "API çalışıyor 🚀"
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