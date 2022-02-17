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

import { useForm, Controller } from 'react-hook-form'
import { getCookieParser } from 'next/dist/server/api-utils';

export default function Register() {
  const {handleSubmit, control, formState: {errors}} = useForm();

  const classes = useStyles();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  if (userInfo) {
    router.push('/');
  }

  

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const submitHandler = async ({name, email, password}) => {
    // closeSnackbar()
    try {
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });
      dispatch({type: 'USER_LOGIN', payload: data})
      getCookieParser.set('userInfo', data);
      // console.log(data);
      router.push(redirect || '/');
    } catch (error) {
      // enqueueSnackbar(error.responser.data ? error.response.data.message : error.message, {variant: 'error'})
      
    }
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component={'h1'} variant="h1">
          Register
        </Typography>
        <List>
          <ListItem>
            <Controller 
            name="name"
            control={control}
            defaultValue=""
            rules = {{
              required: true,
              minLength: 2
            }}
            render={({field})=>(<TextField
              variant="outlined"
              fullWidth
              id="name"
              label="name"
              inputProps={{ type: 'text' }}
              error={Boolean(errors.name)}
              helperText = {errors.name? errors.name.type === 'minLength'?'name is not valid':'name is required': ''}
              {...field}
            ></TextField>)}></Controller>
            
          </ListItem>
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
            <Controller 
            name="password"
            control={control}
            defaultValue=""
            rules = {{
              required: true,
              minLength: 5
            }}
            render={({field})=>(<TextField
              variant="outlined"
              fullWidth
              id="password"
              label="password"
              inputProps={{ type: 'password' }}
              error={Boolean(errors.password)}
              helperText = {errors.password? errors.password.type === 'minLength'?'password is not valid':'password is required': ''}
              {...field}
            ></TextField>)}></Controller>
            
          </ListItem><ListItem>
            <Controller 
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules = {{
              required: true,
              pattern: 5
            }}
            render={({field})=>(<TextField
              variant="outlined"
              fullWidth
              id="confirmPassword"
              label="confirmPassword"
              inputProps={{ type: 'confirmPassword' }}
              error={Boolean(errors.confirmPassword)}
              helperText = {errors.confirmPassword? errors.confirmPassword.type === 'minLength'?'confirmPassword is not valid':'confirmPassword is required': ''}
              {...field}
            ></TextField>)}></Controller>
            
          </ListItem>
          
            
         



          
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Register
            </Button>
          </ListItem>
          <ListItem>
            Already have an account? &nbsp;
            <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
              <Link>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
