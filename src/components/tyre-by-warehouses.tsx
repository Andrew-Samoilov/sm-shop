import { getTyreByWarehouses } from "@/lib/server/get-tyre-by-wafehouses";

type TyreByWarehousesProps = {
    externalId: string | null;
};

export  async function TyreByWarehouses({ externalId }: TyreByWarehousesProps) {
    const stocks = await getTyreByWarehouses(externalId);

    if (!stocks?.length) return null;

    return (
        <div className="text-light dark:text-gray-300 gap-1 lg:gap-2 flex-col ml-2">
            {stocks.map((s) => (
                <p key={s.warehouse} className="mr-4">
                    {s.warehouse}: {s.quantity}
                </p>
            ))}
        </div>
    );
}
