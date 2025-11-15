const BASE = "https://6900d632ff8d792314bbb519.mockapi.io/api";

async function handleRes(res: Response) {
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} ${txt}`);
  }
  return res.json();
}

export async function createOrder(order: unknown) {
  const res = await fetch(`${BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return handleRes(res);
}

export async function getOrder(id: string) {
  const res = await fetch(`${BASE}/orders/${id}`);
  return handleRes(res);
}

export async function updateOrder(id: string, patch: unknown) {
  const res = await fetch(`${BASE}/orders/${id}`, {
    method: "PUT", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  return handleRes(res);
}

export async function deleteOrder(id: string) {
  const res = await fetch(`${BASE}/orders/${id}`, { method: "DELETE" });
  return handleRes(res);
}

export async function listOrders(query?: Record<string,string|number>) {
  const qs = query ? "?" + new URLSearchParams(Object.entries(query).map(([k,v])=>[k,String(v)])) : "";
  const res = await fetch(`${BASE}/orders${qs}`);
  return handleRes(res);
}
