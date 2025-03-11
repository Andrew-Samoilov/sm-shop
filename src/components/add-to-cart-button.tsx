'use client';
    function handleClick(id:string) {
        console.log(`handleClick, tyre id:`,id);
        localStorage.setItem('tyreId', id);  
    }

export function AddToCartButton({ id }: { id: string }) {
      
    return (
        <button
            type="button"  
            onClick={()=>handleClick(id)}
            className={`btn btn-primary btn-sm hover:text-accent`}>
            Add to cart
        </button>
    )
}
