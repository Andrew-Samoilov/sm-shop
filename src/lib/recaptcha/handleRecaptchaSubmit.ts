import { handleClientSubmit } from "./handleClientSubmit";

export async function handleRecaptchaSubmit(
    formId: string,
    recaptchaToken: string,
    
) {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) return;

    const formData = new FormData(form);
    formData.append("recaptcha", recaptchaToken);

    await handleClientSubmit(formId, formData);
    form.reset();
}
