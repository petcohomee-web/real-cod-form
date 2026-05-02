let formOpens = 0;

export async function action() {
  formOpens++;

  return Response.json({
    success: true,
    total: formOpens,
  });
}

export async function loader() {
  return Response.json({
    total: formOpens,
  });
}