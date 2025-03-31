export function loadRecaptchaScript(siteKey: string) {
  return new Promise<void>((resolve, reject) => {
    if (window.grecaptcha) return resolve();

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject("Не вдалося завантажити reCAPTCHA");
    document.head.appendChild(script);
  });
}
