import React, {useState, useEffect}from 'react';
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from "@material-ui/core";
import {useForm, FormProvider} from "react-hook-form";
import CustomTextField from "./CustomTextField";

import {commerce} from "../../lib/commerce";

const AddressForm = ({checkoutToken}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');

    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');

    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const countries = Object.entries(shippingCountries).map(([code,name])=>({id:code, label: name}))

    console.log(countries)

    const fetchShippingCountries = async (checkoutTokenId) =>{
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        //console.log(countries)
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0])
    }

    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id)

    },[])


    const methods = useForm();
    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>

            <FormProvider {...methods}>
                <form onSubmit = ''>
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
                    <Grid item xs={12} sm={6}>
                        <InputLabel> Shipping Subdivision</InputLabel>
                        <Select fullWidth>
                            <MenuItem>
                            Select Me
                            </MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel> Shipping Options </InputLabel>
                        <Select fullWidth>
                            <MenuItem>
                            Select Me
                            </MenuItem>
                        </Select>
                    </Grid>
                </Grid>   
                </form>
                
            </FormProvider>
        </div>
    )
}

export default AddressForm
