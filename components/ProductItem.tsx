import { memo, useState } from 'react';
// import { AddProductToWishList } from './AddProductToWishList';
// se for no react puro fora do nextjs unsamos a lib (lazyload)
import { AddProductToWishListProps } from './AddProductToWishList';
import dynamic from 'next/dynamic';
import lodash from 'lodash';

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
    return( 
        import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
    )
},
    {
        loading: () => <span> Carregando!!!</span>
    }
)

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

    const [isAddingToWishList, setIsAddingToWishList] = useState(false)

    return (
        <div>
            {product.title} - <strong>{product.price}</strong>

            <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>
            {isAddingToWishList && (
                <AddProductToWishList

                    onAddToWishList={() => onAddToWishList(product.id)}
                    onRequestClose={() => setIsAddingToWishList(false)}
                />
            )}
        </div>
    )
}

// devemos passar uma função para verificar se o component deve ser renderizado novamente
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    
    return lodash.isEqual(prevProps.product, nextProps.product)


    // substituimos p
    // return Object.is(prevProps.product, nextProps.product)

    // não devemos retornar uma comparação feita dessa forma
    // prevProps.products.id === nextProps.products.id
    // pois se estivermos usando um banco de dados o id pode ainda não ter sido
    // passado para o front-end
    // ai podemos utilizar o metodo de comparação do Object.is()
    // que compara dois valores sejam eles objetos, arrays ou simpes variaveis.
})

