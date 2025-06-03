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
        <fieldset>
            <legend className="text-sm text-light pl-6 text-center md:text-start">Сезон</legend>
            <div className="flex flex-row flex-wrap justify-center md:justify-start gap-6 md:px-4 py-2 ">
                {SEASONS.map(({ value: v, label }) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer ">
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
