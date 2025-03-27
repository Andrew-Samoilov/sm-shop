'use client';

function handleClick(id: number, title: string, price: number, quantity: number) {
    
    if (process.env.NODE_ENV === 'development') {
        console.log(`handleClick, tyre id:`, id);
    }

    const tyreData = JSON.stringify({ id, title, price, quantity });
    localStorage.setItem('tyre', tyreData);
}

export function AddToCartButton({ id, title, price, quantity }: { id: number, title: string, price: number, quantity:number }) {
    return (
        <button
            type="button"
            onClick={() => handleClick(id, title, price, quantity)}
            className={`btn btn-primary btn-sm hover:text-accent`}>
            Add to cart
        </button>
    )
}
