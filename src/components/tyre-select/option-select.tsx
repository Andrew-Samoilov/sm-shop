type Props = {
    id: string;
    label: string;
    options: number[];
    value: string;
    onChange: (v: string) => void;
};

export function OptionSelect({ id, label, options, value, onChange }: Props) {
    return (
        <div className="flex flex-col lg:gap-2">
            <label
                htmlFor={id}
                className=" sr-only lg:not-sr-only text-sm text-light pl-2 "
                aria-hidden="false">
                Оберіть {label}
            </label>
            <select
                id={id}
                name={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border-2 border-border bg-white dark:bg-darkmode-body rounded-md 
               
                p-1 py-2 md:px-4  
                focus:ring-2 focus:outline-none"
            >

              
                <option value="">{label}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}
