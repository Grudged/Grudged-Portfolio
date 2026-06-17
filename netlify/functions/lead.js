// chris-moore.dev contact form → Salesforce Web-to-Lead.
// Creates a Lead in the same Lead Org as the AppExchange listing and grudged.io
// (00Dhm000000kGZdEAM) so every inbound inquiry lands in one place and the same
// assignment rules fire. lead_source = "chris-moore.dev" distinguishes the
// surface in reports. EmailJS still sends the email client-side; this only
// mirrors the inquiry into Salesforce.
//
// No env vars required — oid is public (it lives in every Web-to-Lead form).

const WEBTOLEAD_URL =
  "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8";
const SF_OID = "00Dhm000000kGZdEAM";
const ALLOWED_ORIGINS = [
  "https://chris-moore.dev",
  "https://www.chris-moore.dev",
];

const isValidEmail = (e) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e || "").trim());

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  // Block cross-site posts. Referer is the fallback when Origin is absent.
  const origin = event.headers.origin || event.headers.referer || "";
  if (!ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
    return { statusCode: 403, body: "Forbidden" };
  }

  let data = {};
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: "Bad request" };
  }

  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const subject = String(data.subject || "").trim();
  const message = String(data.message || "").trim();
  const honeypot = String(data.botField || "").trim();

  // Honeypot tripped — pretend success so bots don't learn.
  if (honeypot) return { statusCode: 200, body: JSON.stringify({ ok: true }) };

  if (!name || !isValidEmail(email) || !message) {
    return { statusCode: 422, body: JSON.stringify({ ok: false }) };
  }

  // Salesforce requires Last Name + Company. Split the single name field;
  // Company has no form input, so the source site stands in as a marker.
  const [firstToken, ...rest] = name.split(/\s+/);
  const description = subject ? `Subject: ${subject}\n\n${message}` : message;

  try {
    const res = await fetch(WEBTOLEAD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        oid: SF_OID,
        first_name: rest.length ? firstToken : "",
        last_name: rest.length ? rest.join(" ") : firstToken,
        company: "chris-moore.dev",
        email,
        description,
        lead_source: "chris-moore.dev",
      }).toString(),
    });
    if (!res.ok) {
      console.error("Web-to-Lead non-2xx", res.status);
      return { statusCode: 502, body: JSON.stringify({ ok: false }) };
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("Web-to-Lead post failed", err);
    return { statusCode: 502, body: JSON.stringify({ ok: false }) };
  }
};
