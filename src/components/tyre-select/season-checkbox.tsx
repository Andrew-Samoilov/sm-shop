'use client';
import { useState } from 'react';

const SEASONS = [
    { value: 'summer', label: 'Літо' },
    { value: 'winter', label: 'Зима' },
    { value: 'allseason', label: 'Всесезон' },
];

export  function SeasonCheckbox({ defaultValues = [], onChange, }: {
    defaultValues?: string[];
    onChange?: (values: string[]) => void;
}) {
    const [selected, setSelected] = useState<string[]>(defaultValues);

    const handleToggle = (value: string) => {
        const newSelected = selected.includes(value)
            ? selected.filter((v) => v !== value)
            : [...selected, value];
        setSelected(newSelected);
        onChange?.(newSelected);
    };

    return (
        <fieldset>
            <legend className="text-sm text-light pl-6 text-center md:text-start">Сезон</legend>
            <div className="flex flex-row flex-wrap justify-center md:justify-start gap-6 md:px-4 py-2 ">
                {SEASONS.map(({ value, label }) => (
                    <label key={value} className="flex items-center gap-2 cursor-pointer ">
                        <input
                            id={value}
                            type="checkbox"
                            checked={selected.includes(value)}
                            onChange={() => handleToggle(value)}
                            className=" rounded-md "
                        />
                        <span >{label}</span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
}
