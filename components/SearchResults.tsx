import { useMemo } from 'react'
import { ProductItem } from "./ProductItem"

interface SearchResultsProps {
    totalPrice: number
    results: Array<{
        id: number,
        price: number,
        title: string,
        priceFormatted: string
    }>;
    onAddToWishList: (id: number) => void
}


export function SearchResults({ totalPrice, results, onAddToWishList }: SearchResultsProps) {

    // foi retirado daqui e colocado dentro de pages/index.tsx
    // const totalPrice = useMemo(() => {
    //     return results.reduce((total, product) => {
    //         return total + product.price
    //     }, 0)
    // }, [results])

    return (
        <div>
            <h2>{totalPrice}</h2>
            {results.map(product => {
                return (
                    <ProductItem 
                        key={product.id} 
                        product={product} 
                        onAddToWishList={onAddToWishList}
                    />
                )
            })}
        </div>
    )
}
/*
    o useMemo é utilizado em apenas duas situações
    1 - para calculos pesados que vão exigir mais processamento 
 
    2 - igualdade referencial ou melhor dizendo (quando passamos uma informação para um
    componente filho)
*/