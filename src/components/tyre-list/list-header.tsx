import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

const SORT_OPTIONS = [
    { label: "(А-Я)", value: "title_asc" },
    { label: "(Я-А)", value: "title_desc" },
    { label: "Ціна ↑", value: "price_asc" },
    { label: "Ціна ↓", value: "price_desc" },
];

type Props = {
    view: "list" | "gallery";
    onChangeView: (view: "list" | "gallery") => void;
    sort: string;
    onChangeSort: (sort: string) => void;
};

export function ListHeader({ view, onChangeView, sort, onChangeSort }: Props) {

    const handleViewChange = (newView: "list" | "gallery") => {
        onChangeView(newView);
        const newParams = new URLSearchParams(window.location.search);
        newParams.set("view", newView);
        window.history.replaceState(null, "", `?${newParams.toString()}`);

        if (process.env.NODE_ENV === "development") {
            console.info("[handleViewChange]", newView);
        }
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChangeSort(e.target.value);
        const newParams = new URLSearchParams(window.location.search);
        newParams.set("sort", e.target.value);
        window.history.replaceState(null, "", `?${newParams.toString()}`);

        if (process.env.NODE_ENV === "development") {
            console.info("[handleSortChange]", e.target.value);
        }
    };

    return (
        <header className="flex justify-between py-2 xl:py-6">
            <fieldset className="flex gap-2 items-center">
                <span className="hidden xl:block text-light text-sm">Вигляд</span>

                <label
                    className={`btn p-0.5 ${view === "list"
                        ? "btn-primary" :
                        "btn-outline-primary hover:scale-105 duration-300"
                        }`}
                >
                    <input
                        type="radio"
                        name="view"
                        value="list"
                        checked={view === "list"}
                        onChange={() => handleViewChange("list")}
                        className="sr-only"
                        aria-label="Список"
                    />
                    <ListBulletIcon className="h-6 w-6" />
                </label>

                <label
                    className={`btn p-0.5 ${view === "gallery"
                        ? "btn-primary"
                        : "btn-outline-primary hover:scale-105 duration-300"}`}
                >
                    <input
                        type="radio"
                        name="view"
                        value="gallery"
                        checked={view === "gallery"}
                        onChange={() => handleViewChange("gallery")}
                        className="sr-only"
                        aria-label="Галерея"
                    />
                    <Squares2X2Icon className="h-6 w-6" />
                </label>

            </fieldset>

            <div className="flex gap-2 items-center">
                <span className="hidden xl:block text-light text-sm">Сортування</span>
                <select
                    id="sort"
                    name="sort"
                    className="rounded-md border border-border dark:border-darkmode-border px-2 py-1"
                    value={sort}
                    onChange={handleSortChange}
                >
                    {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </header>
    );
}
