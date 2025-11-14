'use client';

const SEASONS = [
    { value: 'summer', label: 'Літо' },
    { value: 'winter', label: 'Зима' },
    { value: 'allseason', label: 'Всесезон' },
];

export function SeasonCheckbox({
    value,
    onChange,
}: {
    value: string[];
    onChange: (values: string[]) => void;
}) {

    const handleToggle = (season: string) => {
        if (value.includes(season)) {
            onChange(value.filter((v) => v !== season));
        } else {
            onChange([...value, season]);
        }
    };

    return (
        <fieldset >
            <legend className="sr-only  text-light hidden lg:block text-center ">Сезон</legend>
            <div className="flex flex-wrap lg:flex-col justify-center content-center gap-2    py-2 md:py-0">
                {SEASONS.map(({ value: v, label }) => (
                    <label key={v} className="flex items-center gap-1 cursor-pointer 
                    px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-2
                    border-border border-2 dark:border-darkmode-border rounded-md">
                        <input
                            id={v}
                            type="checkbox"
                            checked={value.includes(v)}
                            onChange={() => handleToggle(v)}
                        />
                        <span >{label}</span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
}
