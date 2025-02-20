import { Tyres } from "@/types";

export default function TyreList({ tyres }: Tyres) {
    return (
        <div>
            <h2>Список шин</h2>
            {tyres.length === 0 ? (
                <p>Немає доступних шин.</p>
            ) : (
                <ul>
                    {tyres.map((tyre) => (
                        <li key={tyre.id}>
                            {tyre.title}- {tyre.date_code} - {tyre.price} грн.
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
