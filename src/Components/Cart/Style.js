import {makeStyles} from "@material-ui/core/styles"


export default makeStyles((theme)=>({
    toolbar:theme.mixins.toolbar,

    title:{
        marginTop:'5%',
        fontStyle:'italic',
        fontSize:'50px',
        fontFamily:'boild',
        color: 'blue'
    },

    emptyButton:{
        minWidth:'150px',
        [theme.breakpoints.down('xs')]:{
            marginBottom:'50px',
        },

        [theme.breakpoints.up('xs')]:{
            marginRight:'50px',
            marginLeft:'50px'
        },
    },

    checkoutButton :{
        minWidth:'150px',
    },

    link:{
        textDecoration:'none',
    },

    cartDetails:{
        display:'flex',
        marginTop:'10%',
        width:'100%',
        justifyContent:'space-berween'
        
    }
}))