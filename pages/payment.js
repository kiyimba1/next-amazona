import { useRouter } from 'next/router'
import React, {useContext, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import { Store } from '../utils/Store'
import Layout from '../components/Layout'
import CheckoutWizard from '../components/checkoutWizard'
import useStyles from '../utils/styles'
import { Button, FormControl, FormControlLabel, List, ListItem, Radio, RadioGroup, Typography } from '@material-ui/core'

export default function Payment() {
    const classes = useStyles()
    const router = useRouter()
    const [paymentMethod, setPaymentMethod] = useState('')
    const {state, dispatch} = useContext(Store)
    const { cart: {shippingAddress},} = state;
    useEffect(() => {
      if (!shippingAddress.address){
          router.push('/shipping')
      }else{
          setPaymentMethod(Cookies.get('paymentMethod')||'')
      }
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        if(!paymentMethod){
            // enqueueSnackbar('Payment method is required', {variant:'error'})
            alert('Payment method is required')
        }else{
            dispatch({type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod})
            Cookies.set('paymentMethod', paymentMethod)
            router.push('/placeorder')
        }
    }
  return (
    <Layout title={"Payment Method"}>
        <CheckoutWizard activeStep={2} />
            <form className={classes.form} onSubmit={submitHandler}>
                <Typography component="h1" variant='h1'>Payment Method</Typography>
                <List>
                    <ListItem>
                        <FormControl component={"fieldset"}>
                            <RadioGroup aria-label='Payment Method' name='paymentMethod' variant={paymentMethod} onChange={(e)=> setPaymentMethod(e.target.value)}>
                                <FormControlLabel label={"PayPal"} value={"PayPal"} control={<Radio/>}></FormControlLabel>
                                <FormControlLabel label={"Strpe"} value={"Stripe"} control={<Radio/>}></FormControlLabel>
                                <FormControlLabel label={"Cash"} value={"Cash"} control={<Radio/>}></FormControlLabel>
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth type='submit' variant='contained' color='primary'>Continue</Button>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth type='button' onClick={()=>router.push('/shipping')} variant='contained' >Back</Button>
                    </ListItem>
                    
                </List>
            </form>
        
    </Layout>
  )
}
