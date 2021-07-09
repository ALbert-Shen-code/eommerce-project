import React from 'react'
import {AppBar,Toolbar, IconButton, Badge, MenuItem,Menu , Typography} from "@material-ui/core";
import {ShoppingCart} from "@material-ui/icons";
import useStyles from "./styles";
import {Link, useLocation} from "react-router-dom"


const Navbar = ({totalItem}) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <div>

            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography>
                        <img alt='commerce.js' height="25px" className={classes.image}/>
                        Commerce JS
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname === '/' && (<div className={classes.button}>
                        <IconButton  component={Link} to="/cart" aria-label="show cart items" color="inherit">
                            <Badge badgeContent={totalItem} color="secondary">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>) }
                    
                </Toolbar>
            </AppBar>
            
        </div>
    )
}

export default Navbar
