'use client';
import { useEffect, useState } from 'react';

// типи відповіді з Нової пошти
type City = {
    Description: string;
    Ref: string;
};

type Warehouse = {
    Description: string;
    Ref: string;
};

export function DeliverySelect() {
    const [cities, setCities] = useState<City[]>([]);
    const [filteredCities, setFilteredCities] = useState<City[]>([]);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

    const [query, setQuery] = useState('');
    const [warehouseQuery, setWarehouseQuery] = useState('');
    const [filteredWarehouses, setFilteredWarehouses] = useState<Warehouse[]>([]);

    // завантажуємо всі міста
    useEffect(() => {
        fetch('/api/np/cities')
            .then((res) => res.json())
            .then((data: City[]) => {
                setCities(data);
                setFilteredCities(data);
            })
            .catch((err) => console.error('Помилка завантаження міст:', err));
    }, []);

    // фільтруємо міста при вводі
    useEffect(() => {
        if (!query) {
            setFilteredCities(cities);
            return;
        }
        const q = query.toLowerCase().trim();

        setFilteredCities(
            cities.filter((c) => {
                const name = c.Description.toLowerCase();
                // фільтр: тільки коли починається з введеного слова
                return name.startsWith(q);
            })
        );
    }, [query, cities]);

    // обираємо місто → тягнемо відділення
    async function handleSelectCity(city: City) {
        setQuery(city.Description);
        setFilteredCities([]); // сховати список
        const res = await fetch('/api/np/warehouses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cityRef: city.Ref }),
        });
        const data: Warehouse[] = await res.json();
        setWarehouses(data);
        setFilteredWarehouses(data);
        setWarehouseQuery('');
    }

    // фільтр відділень
    useEffect(() => {
        if (!warehouseQuery) {
            setFilteredWarehouses(warehouses);
            return;
        }
        const q = warehouseQuery.toLowerCase().trim();
        setFilteredWarehouses(
            warehouses.filter((w) => w.Description.toLowerCase().includes(q))
        );
    }, [warehouseQuery, warehouses]);

    return (
        <div className="space-y-4">
            {/* Пошук міста */}
            <div className="relative">
                <label htmlFor="city-input" className="block text-sm font-medium mb-1">
                    Місто
                </label>
                <input
                    id="city-input"
                    type="text"
                    placeholder="Почніть вводити місто"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full border rounded-md p-2"
                />

                {filteredCities.length > 0 && query && (
                    <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border rounded-md shadow">
                        {filteredCities.slice(0, 50).map((city) => (
                            <li
                                key={city.Ref}
                                onMouseDown={() => handleSelectCity(city)}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {city.Description}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Пошук відділення */}
            {warehouses.length > 0 && (
                <div className="relative">
                    <label htmlFor="warehouse-input" className="block text-sm font-medium mb-1">
                        Відділення
                    </label>

                    <input
                        id="warehouse-input"
                        type="text"
                        placeholder="Введіть номер або назву відділення"
                        value={warehouseQuery}
                        onChange={(e) => setWarehouseQuery(e.target.value)}
                        className="w-full border rounded-md p-2"
                    />

                    {filteredWarehouses.length > 0 && warehouseQuery && (
                        <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border rounded-md shadow">
                            {filteredWarehouses.slice(0, 100).map((w) => (
                                <li
                                    key={w.Ref}
                                    onMouseDown={() => {
                                        setWarehouseQuery(w.Description);
                                        setFilteredWarehouses([]);
                                    }}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {w.Description}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* приховані інпути для передачі даних у замовлення */}
            {query && <input type="hidden" name="delivery_city" value={query} />}
            {warehouseQuery && (
                <input type="hidden" name="delivery_warehouse" value={warehouseQuery} />
            )}

        </div>
    );
}
