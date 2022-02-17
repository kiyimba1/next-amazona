import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import axios from 'axios';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
// import Cookie from 'js-cookie';
import { useForm, Controller } from 'react-hook-form'
import Cookies from 'universal-cookie';
// import { useSnackbar } from 'notistack'

export default function Login() {
  // const {enqueueSnackbar, closeSnackbar} = useSnackbar()
  const {handleSubmit, control, formState: {errors}} = useForm();
  const classes = useStyles();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const cookies = new Cookies();

  if (userInfo) {
    router.push('/');
  }

  

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const submitHandler = async ({email, password}) => {
    // closeSnackbar()
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      // console.log(data);
      dispatch({ type: 'USER_LOGIN', payload: data });
      cookies.set('userInfo', data)
      // Cookie.set('userInfo', {data});
      router.push(redirect || '/');
    } catch (error) {
      // enqueueSnackbar(error.responser.data ? error.response.data.message : error.message, {variant: 'error'})
      
    }
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component={'h1'} variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <Controller 
            name="email"
            control={control}
            defaultValue=""
            rules = {{
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
            }}
            render={({field})=>(<TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: 'email' }}
              error={Boolean(errors.email)}
              helperText = {errors.email? errors.email.type === 'pattern'?'Email is not valid':'Email is required': ''}
              {...field}
            ></TextField>)}></Controller>
            
          </ListItem>
          <ListItem>
            <Controller name="password" control={control} rules={{required:true, minLength: 6}} render={({field})=>(
              <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: 'password' }}
              error={Boolean(errors.password)}
              helperText = {errors.password? errors.password.type === 'minLength'?'Password must br 6 characters or more':'Password is required': ''}
             {...field}
            ></TextField>
            )}></Controller>
            
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Dont have an account?{' '}
            <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
