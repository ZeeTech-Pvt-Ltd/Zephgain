// Shared lead-submission helper for the Zephgain signup/contact forms.
// Posts JSON to the meridianc integration endpoint, which assigns the real
// account password and the visitor's IP server-side.
const ENDPOINT = 'https://meridianc-au.com/homeMailAction.php'
const OFFER_NAME = 'ClientCentral-Site'
const ACCOUNT_PASSWORD = 'Lh23s3' // backend default; overridden server-side anyway

export async function submitLead({ firstName, lastName, email, phone }) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      firstName,
      lastName,
      password: ACCOUNT_PASSWORD,
      phone,
      offerName: OFFER_NAME,
    }),
  })
  return res.json()
}
