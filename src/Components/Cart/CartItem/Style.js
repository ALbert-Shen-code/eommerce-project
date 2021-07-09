import {makeStyles} from "@material-ui/core/styles"

export default makeStyles((theme)=>({
    media:{
        height:200,
    },

    cardContent:{
        display:'flex',
        justifyContent:'space-between'
    },

    CardActions :{
        justifyContent:'space-between'
    },

    buttons :{
        display:'flex',
        alignItems:'center',
    }
}))