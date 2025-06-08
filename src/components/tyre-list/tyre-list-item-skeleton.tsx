// components/tyre-list-item-skeleton.tsx
export function TyreListItemSkeleton() {
    return (
        <div className="flex justify-between gap-12 items-center p-6 bg-theme-light dark:bg-theme-dark rounded-lg animate-pulse">
            <div className="min-w-[193px] h-[193px]  text-light flex items-center justify-center">
                Фото
            </div>
            <div className="gap-2 flex flex-col mr-auto w-full max-w-xs">
                <div className="h-6 w-36 bg-gray-200 rounded mb-2" />
                <div className="h-5 w-44 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-52 bg-gray-100 rounded mb-2" />
                <div className="flex gap-2">
                    <div className="h-3 w-20 bg-gray-100 rounded" />
                    <div className="h-3 w-24 bg-gray-100 rounded" />
                </div>
                <div className="h-3 w-36 bg-gray-200 rounded mt-2" />
                <div className="h-3 w-40 bg-gray-200 rounded" />
            </div>
            <div className="flex flex-col gap-6 items-end">
                <div className="flex flex-row gap-2 items-end">
                    <div className="h-7 w-16 bg-gray-200 rounded" />
                    <div className="h-4 w-10 bg-gray-100 rounded" />
                </div>
                <div className="h-10 w-24 btn btn-outline-primary" />
            </div>
        </div>
    );
}
