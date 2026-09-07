import type { ApplicationFormData } from '../types';

/**
 * Where applications are delivered. Set VITE_APPLICATION_ENDPOINT to a form
 * handler (your own API route, Formspree, Getform, a Zapier catch hook, ...).
 * Until it is set, submissions are not delivered anywhere — the UI still runs
 * so the page can be demoed, and the payload is logged in development.
 */
const ENDPOINT = import.meta.env.VITE_APPLICATION_ENDPOINT as string | undefined;

export const isDeliveryConfigured = Boolean(ENDPOINT);

export async function submitApplication(data: ApplicationFormData): Promise<void> {
  const payload = {
    name: data.name.trim(),
    email: data.email.trim(),
    socialHandle: data.socialHandle.trim().replace(/^@/, ''),
    isEighteenPlus: data.isEighteenPlus,
    submittedAt: new Date().toISOString(),
  };

  if (!ENDPOINT) {
    if (import.meta.env.DEV) {
      console.warn(
        '[Typhoon] VITE_APPLICATION_ENDPOINT is not set — this application was not sent anywhere.',
        payload,
      );
    }
    // Keep the perceived latency of a real submission.
    await new Promise((resolve) => setTimeout(resolve, 900));
    return;
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Application submission failed (${response.status})`);
  }
}
