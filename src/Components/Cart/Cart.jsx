import React from 'react'
import {Typography,Container, Button,Grid} from "@material-ui/core";
import useStyles from "./Style";
import CartItem from "./CartItem/CartItem";
import {Link} from "react-router-dom"

const Cart = ({cart, handleUpdateQty, removeQty, handleEmptyCart}) => {
    const classes = useStyles();

    const EmptyCart = ()=>(
        <Typography variant = "subtitle1">
            You have no Item in your cart, please add some item in.
            <Link to="/" className={classes.link}> add some Item</Link>
        </Typography>
    )

    const FiledCart = () =>(
        <div>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=>(
                    <Grid xs={12} sm={4} key={item.id}>
                        <CartItem item = {item} handleUpdateQty={handleUpdateQty} removeQty={removeQty}/>
                    </Grid>
                ))}

            </Grid>
            <div className={classes.cartDetails}>
                <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <Button className={classes.emptyButton} size="large" variant="contained" color="secondary" onClick={handleEmptyCart}> empty Cart</Button>
                <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" variant="contained" color="primary"> Checkout Now</Button>
            </div>
        </div>
    )

    if(!cart.line_items) return "Loading.....";
    return (
        <Container>
            <div className={classes.toolbar}/>
                <Typography className={classes.title} variant="h3" gutterBottom> Your Shopping Cart</Typography>
                {!cart.line_items.length ? <EmptyCart/> : <FiledCart/>}
            
        </Container>

    )
}

export default Cart
