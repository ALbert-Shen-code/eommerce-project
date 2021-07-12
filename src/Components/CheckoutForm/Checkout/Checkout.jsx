import React, {useState, useEffect} from 'react';
import {Paper,Stepper, Step, StepLabel,Typography,CircularProgress, Divider, Button} from "@material-ui/core";
import makeStyles from "./style";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import {commerce} from "../../../lib/commerce"

const steps = ["Shipping Address", "Payment Details"]

const Checkout = ({cart}) => {
    const classes = makeStyles();
    const [activeStep, setActiveStep ] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);

    useEffect(()=>{
        const generateToken = async ()=>{
            try{
                const token = await commerce.checkout.generateToken(cart.id, {type:'cart'})
                //console.log(token)
                setCheckoutToken(token);
            } catch(error){

            }
        }
        generateToken();
    },[cart])

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken = {checkoutToken}/> : <PaymentForm/>;

    const Conformation = ()=> (
        <div>
            3
        </div>
    )
    return (
        <div>
            <div className = {classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4">
                        Check Out
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length  ? <Conformation/> : checkoutToken && <Form/> }
                </Paper>
            </main>
            
        </div>
    )
}

export default Checkout
