import React from 'react';
import {Typography, Button, Card, CardActions, CardContent,CardMedia} from "@material-ui/core";

import useStyles from "./Style";

const CartItem = ({item, handleUpdateQty, removeQty}) => {
    const classes = useStyles();
    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className = {classes.media}/>
            <CardContent className={classes.CardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
                <div className={classes.buttons}> 
                <Button type="button" size="small" onClick={()=>handleUpdateQty(item.id, item.quantity -1 )}>  -
                </Button>
                <Typography>{item.quantity}</Typography>
                <Button type="button" size="small" onClick={()=>handleUpdateQty(item.id, item.quantity  + 1 )}>  +
                </Button>
                </div>

                <Button variant="contained" type="buttton" color="secondary" onClick={()=> removeQty(item.id)}>Remove</Button>

            </CardActions>
        </Card>
    )
}

export default CartItem;
