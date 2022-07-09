import { memo } from 'react'

interface ProductItemProps {
    product: {
        id: number,
        price: number,
        priceFormatted: string,
        title: string
    };
    onAddToWishList: (id: number) => void
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
    return (
        <div>
            {product.title} - <strong>{product.price}</strong>
            <button onClick={() => onAddToWishList(product.id)}>Add to wishlist</button>
        </div>
    )
}

// devemos passar uma função para verificar se o component deve ser renderizado novamente
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) =>{
    return Object.is( prevProps.product, nextProps.product)

    // não devemos retornar uma comparação feita dessa forma
    // prevProps.products.id === nextProps.products.id
    // pois se estivermos usando um banco de dados o id pode ainda não ter sido
    // passado para o front-end
    // ai podemos utilizar o metodo de comparação do Object.is()
    // que compara dois valores sejam eles objetos, arrays ou simpes variaveis.
})

