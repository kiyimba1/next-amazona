import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import Cookies from 'universal-cookie';

import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

import { useForm, Controller } from 'react-hook-form'
// import Cookie from 'js-cookie'

export default function Register() {
  const {handleSubmit, control, formState: {errors}} = useForm();

  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const cookies = new Cookies();

  

  

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
  }, []);

  const submitHandler =  ({fullName, address, city, postalCode, country}) => {
    // closeSnackbar()
   
      dispatch({type: 'SAVE_SHIPPING_ADDRESS', payload: {fullName, address, city, postalCode, country}})
      cookies.set('shippingAddress', {fullName, address, city, postalCode, country})
      router.push('/payment');
    
  };
  return (
    <Layout title="Shipping Address">
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component={'h1'} variant="h1">
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller 
            name="fullName"
            control={control}
            defaultValue=""
            rules = {{
              required: true,
              minLength: 2
            }}
            render={({field})=>(<TextField
              variant="outlined"
              fullWidth
              id="fullName"
              label="Full Name"
          
              error={Boolean(errors.fullName)}
              helperText = {errors.fullName? errors.fullName.type === 'minLength'?'Full Name is not valid':'Full Name is required': ''}
              {...field}
            ></TextField>)}></Controller>
            
          </ListItem>

          <ListItem>
            <Controller 
            name="address"
            control={control}
            defaultValue=""
            rules = {{
              required: true,
              minLength: 2
            }}
            render={({field})=>(<TextField
              variant="outlined"
              fullWidth
              id="address"
              label="Address"
          
              error={Boolean(errors.address)}
              helperText = {errors.address? errors.address.type === 'minLength'?'Address is not valid':'Address is required': ''}
              {...field}
            ></TextField>)}></Controller>
            
          </ListItem>

          <ListItem>
            <Controller 
            name="city"
            control={control}
            defaultValue=""
            rules = {{
              required: true,
              minLength: 2
            }}
            render={({field})=>(<TextField
              variant="outlined"
              fullWidth
              id="city"
              label="City"
          
              error={Boolean(errors.city)}
              helperText = {errors.city? errors.city.type === 'minLength'?'City is not valid':'City is required': ''}
              {...field}
            ></TextField>)}></Controller>
            
          </ListItem>

          <ListItem>
            <Controller 
            name="country"
            control={control}
            defaultValue=""
            rules = {{
              required: true,
              minLength: 2
            }}
            render={({field})=>(<TextField
              variant="outlined"
              fullWidth
              id="country"
              label="Country"
          
              error={Boolean(errors.country)}
              helperText = {errors.country? errors.country.type === 'minLength'?'Country is not valid':'Country is required': ''}
              {...field}
            ></TextField>)}></Controller>
            
          </ListItem>

          <ListItem>
            <Controller 
            name="postalCode"
            control={control}
            defaultValue=""
            rules = {{
              required: true,
              minLength: 2
            }}
            render={({field})=>(<TextField
              variant="outlined"
              fullWidth
              id="postalCode"
              label="Postal Code"
          
              error={Boolean(errors.postalCode)}
              helperText = {errors.postalCode? errors.postalCode.type === 'minLength'?'Postal Code is not valid':'Postal Code is required': ''}
              {...field}
            ></TextField>)}></Controller>
            
          </ListItem>
          
          
            
         



          
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
          
        </List>
      </form>
    </Layout>
  );
}
