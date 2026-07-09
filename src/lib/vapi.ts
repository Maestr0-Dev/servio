const VAPI_API = "https://api.vapi.ai";

function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
    "Content-Type": "application/json",
  };
}

// Available area codes for Vapi numbers
const AVAILABLE_AREA_CODES = ["406", "937", "209"];

export async function provisionPhoneNumber(shopId: string) {
  // Pick a random available area code
  const areaCode = AVAILABLE_AREA_CODES[Math.floor(Math.random() * AVAILABLE_AREA_CODES.length)];

  // Vapi limits name to 40 characters
  const shortName = `Servio-${shopId.slice(0, 8)}`;

  const res = await fetch(`${VAPI_API}/phone-number`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      provider: "vapi",
      name: shortName,
      numberDesiredAreaCode: areaCode,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Vapi phone number error:", data);
    throw new Error(data.message || "Failed to provision phone number");
  }

  return {
    phoneNumberId: data.id,
    phoneNumber: data.number,
  };
}

export async function deletePhoneNumber(phoneNumberId: string) {
  const res = await fetch(`${VAPI_API}/phone-number/${phoneNumberId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return res.ok;
}

export async function getPhoneNumbers() {
  const res = await fetch(`${VAPI_API}/phone-number`, {
    headers: getHeaders(),
  });

  return await res.json();
}
