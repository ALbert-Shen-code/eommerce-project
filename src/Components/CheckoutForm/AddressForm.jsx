import React, {useState, useEffect}from 'react';
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from "@material-ui/core";
import {useForm, FormProvider} from "react-hook-form";
import CustomTextField from "./CustomTextField";
import {Link} from "react-router-dom"
import {commerce} from "../../lib/commerce";

const AddressForm = ({checkoutToken}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');

    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');

    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const countries = Object.entries(shippingCountries).map(([code,name])=>({id:code, label: name}))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code,name])=>({id:code, label: name}))
    const options= shippingOptions.map((sO)=>({id:sO.id, label:`${sO.description} - ${sO.price.formatted_with_symbol}`}))

    console.log(countries)

    const fetchShippingCountries = async (checkoutTokenId) =>{
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        //console.log(countries)
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchShippingDivisions = async (countryCode)=>{
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region=null)=>{
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region})

        setShippingOptions(options);
        setShippingOption(options[0].id)
    }

    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id)

    },[])

    useEffect(()=>{
        if(shippingCountry) fetchShippingDivisions(shippingCountry)

    },[shippingCountry]);

    useEffect(()=>{
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry,shippingSubdivision)
 
    },[shippingSubdivision])


    const methods = useForm();
    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>

            <FormProvider {...methods}>
                <form onSubmit = {methods.handleSubmit((data)=>{})}>
                 <Grid container spacing={3}>
                    <CustomTextField name='FirstName' label='First Name'/>
                    <CustomTextField name='lastName' label='Last Name'/>
                    <CustomTextField name='address' label='Address'/>
                    <CustomTextField name='email' label='Email'/>
                    <CustomTextField name='city' label='City'/>
                    <CustomTextField name='ZIP' label='Post Code'/>
                    <Grid item xs={12} sm={6}>
                        <InputLabel> Shipping Country </InputLabel>
                        <Select fullWidth value={shippingCountry} onChange={(e)=>setShippingCountry(e.target.value)}>
                            {countries.map((country)=>(
                              <MenuItem key={country.id} value={country.id}>
                            {country.label}
                            </MenuItem>  
                            ))}
                            
                        </Select>
                    </Grid>

                    <Grid item xs={12} sm={6} >
                        <InputLabel> Shipping Subdivision</InputLabel>
                        <Select fullWidth value={shippingSubdivision} onChange={(e)=>setShippingSubdivision(e.target.value)}>
                        {subdivisions.map((subdivision)=>(
                              <MenuItem key={subdivision.id} value={subdivision.id}>
                            {subdivision.label}
                            </MenuItem>  
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel> Shipping Options </InputLabel>
                        <Select fullWidth value= {shippingOption} onChange={(e)=>setShippingOption(e.target.value)}>
                        {options.map((option)=>(
                              <MenuItem key={option.id} value={option.id}>
                            {option.label}
                            </MenuItem>  
                            ))}
                        </Select>
                    </Grid>
                </Grid>   
                </form>

                <br/>

                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                    <Button type= "submit" variant="contained">Next</Button>
                </div>
                
            </FormProvider>
        </div>
    )
}

export default AddressForm
