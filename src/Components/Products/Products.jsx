import react from "react"
import {Grid} from "@material-ui/core";
import Product from "./Product/product";

const products = [
    {id:1, name:'shoe',description:'Running shoes', price:'$5'}
];
const Products = () =>{
    return(

    <main>
        <Grid container justify='center' spacing={4}>
            {products.map((product)=>(
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>  
                <Product product={product}/>
                <Product/>
                </Grid>

            ))}
        </Grid>
    </main>
    )
}

export default Products;