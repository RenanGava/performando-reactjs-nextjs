import { useMemo } from 'react'
import { ProductItem } from "./ProductItem"
import { List, ListRowRenderer } from 'react-virtualized';

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

    //usamos o reac-virtualized para renderizar somente os componentes
    // que estão sendo visualizados e deizando 5 pré-renderizados para
    // a exibição após descer o scroll eles serão mostrados.

    const rowRenderer: ListRowRenderer = ({index, key, style}) => {
        return (
            <div key={key} style={style}>
                <ProductItem 
                    product={results[index]} 
                    onAddToWishList={onAddToWishList}
                />
            </div>
        )
    }

    return (
        <div>
            <h2>{totalPrice}</h2>
            <List
                height={300}
                rowHeight={30}
                width={900}
                overscanRowCount={5}
                rowCount={results.length}
                rowRenderer={rowRenderer}
            />
        </div>
    )
}
/*
    o useMemo é utilizado em apenas duas situações
    1 - para calculos pesados que vão exigir mais processamento 
 
    2 - igualdade referencial ou melhor dizendo (quando passamos uma informação para um
    componente filho)
*/