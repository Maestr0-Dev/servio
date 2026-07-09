const TWILIO_API = "https://api.twilio.com/2010-04-01";

function getAuth() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) throw new Error("Twilio credentials not configured");
  return { sid, token };
}

// ========== WhatsApp Number Provisioning ==========

export async function provisionWhatsAppNumber(shopId: string) {
  const { sid, token } = getAuth();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const webhookUrl = `${baseUrl}/api/whatsapp/webhook/${shopId}`;

  // Search for available WhatsApp numbers
  const searchRes = await fetch(
    `${TWILIO_API}/Accounts/${sid}/AvailablePhoneNumbers/US.json?Limit=1`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
      },
    }
  );

  const searchData = await searchRes.json();
  const phoneNumber = searchData.available_phone_numbers?.[0]?.phone_number;

  if (!phoneNumber) {
    throw new Error("No phone numbers available");
  }

  // Purchase the number
  const params = new URLSearchParams();
  params.append("PhoneNumber", phoneNumber);
  params.append("FriendlyName", `Servio WhatsApp - ${shopId.slice(0, 8)}`);
  params.append("VoiceUrl", webhookUrl);
  params.append("VoiceMethod", "POST");

  const purchaseRes = await fetch(
    `${TWILIO_API}/Accounts/${sid}/IncomingPhoneNumbers.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }
  );

  const purchaseData = await purchaseRes.json();

  if (purchaseData.code) {
    throw new Error(purchaseData.message || "Failed to provision number");
  }

  return {
    phoneNumber: phoneNumber,
    sid: purchaseData.sid,
  };
}

// ========== WhatsApp Messaging ==========

export async function sendWhatsAppMessage(
  to: string,
  message: string,
  shopId?: string
) {
  const { sid, token } = getAuth();

  // Get the business's Twilio number
  let from = process.env.TWILIO_WHATSAPP_NUMBER || "whatsapp:+14155238886";

  // Ensure 'to' starts with whatsapp:
  const toNumber = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`;

  const params = new URLSearchParams();
  params.append("To", toNumber);
  params.append("From", from);
  params.append("Body", message);

  const res = await fetch(`${TWILIO_API}/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  return await res.json();
}

export function parseWebhookBody(body: URLSearchParams) {
  return {
    messageSid: body.get("MessageSid") || "",
    accountSid: body.get("AccountSid") || "",
    from: body.get("From") || "",
    to: body.get("To") || "",
    body: body.get("Body") || "",
    numMedia: parseInt(body.get("NumMedia") || "0"),
    timestamp: body.get("Timestamp") || "",
  };
}
