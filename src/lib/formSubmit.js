// Posts a form to FormSubmit's AJAX endpoint. FormSubmit reports `success`
// as the string "true"/"false", so a plain truthiness check treats failures
// as successes — compare explicitly and surface the server's message.
const FORM_SUBMIT_URL = "https://formsubmit.co/ajax/amaswaseem@gmail.com";

export const submitForm = async (data) => {
  const response = await fetch(FORM_SUBMIT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ _captcha: "false", _template: "table", ...data }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || String(result.success) !== "true") {
    throw new Error(result.message || "Failed to submit form");
  }

  return result;
};
