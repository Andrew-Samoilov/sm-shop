type Props = {
    id: string;
    label: string;
    options: number[];
    value: string;
    onChange: (v: string) => void;
};

export function OptionSelect({ id, label, options, value, onChange }: Props) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="block text-sm text-light pl-2">
                {label}
            </label>
            <select
                id={id}
                name={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border-2 border-border rounded-md px-4 py-2 focus:ring-2 focus:outline-none"
            >
                <option value="">Оберіть {label.toLowerCase()}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}
