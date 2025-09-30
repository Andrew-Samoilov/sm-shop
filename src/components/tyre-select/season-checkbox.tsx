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
            <legend className=" text-light hidden lg:block md:pl-6 text-center ">Сезон</legend>
            <div className="flex flex-row flex-wrap justify-center  gap-4  lg:flex-nowrap py-4 md:py-0">
                {SEASONS.map(({ value: v, label }) => (
                    <label key={v} className="flex items-center gap-1 cursor-pointer px-4 py-2 border-2 border-border dark:border-darkmode-border rounded-md">
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
