"use client";
import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

type View = "list" | "gallery";

export function ViewSwitcher({
    view,
    onChange,
}: {
    view: View;
    onChange: (next: View) => void;
}) {

    // const router = useRouter();
    // const searchParams = useSearchParams();
    // const current = searchParams.get("view") ?? "list";

    // const toggle = (next: "list" | "gallery") => {
    //     const params = new URLSearchParams(searchParams);
    //     params.set("view", next);
    //     router.push(`?${params.toString()}`);
    // };

    return (
        <div className="flex gap-2">
            <button
                onClick={() => onChange("list")}
                className={`btn p-0.5 hover:scale-105 duration-300 ${view === "list" ? "btn-primary" : "btn-outline-primary"
                    }`}
                aria-label="Список"
            >
                <ListBulletIcon className="h-6 w-6" />
            </button>

            <button
                onClick={() => onChange("gallery")}
                className={`btn p-0.5 hover:scale-105 duration-300 ${view === "gallery" ? "btn-primary" : "btn-outline-primary"
                    }`}
                aria-label="Галерея"
            >
                <Squares2X2Icon className="h-6 w-6" />
            </button>

        </div>
    );
}
