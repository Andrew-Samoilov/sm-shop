export function formatFormData(formData: FormData): string {
    const raw = Object.fromEntries(formData.entries());

    delete raw.recaptcha;
    delete raw.contact_ok;

    return Object.entries(raw)
        .map(([key, value]) => {
            const label = key.replace(/^contact_/, '').replace(/_/g, ' ');
            return `${capitalize(label)}: ${formatValue(value)}`;
        })
        .join('\n');
}

function formatValue(value: FormDataEntryValue): string {
    if (typeof value === 'string') return value;
    if (value instanceof File) return `Файл: ${value.name} (${value.size} байт)`;
    try {
        return JSON.stringify(value);
    } catch {
        return '[object]';
    }
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
