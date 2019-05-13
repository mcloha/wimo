import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, TextField, Button, FormGroup } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyDvmLj_qwLsZBJXhhnt1qh1aQgSE_NqZjs',
    authDomain: 'wimo-218815.firebaseapp.com',
    databaseURL: 'https://wimo-218815.firebaseio.com',
    projectId: 'wimo-218815',
    storageBucket: 'wimo-218815.appspot.com',
    messagingSenderId: '438843611912',
    appId: '1:438843611912:web:13fd5e23e0d47f2e'
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
    },
    container: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        textAlign: 'center',
    },
    input: {
        margin: '10px'
    }
})

const OrderForm = props => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { classes } = props;

    const errorTimeOut = () => setTimeout(() => {
        setErrorMessage('');
    }, 3000)

    const getClientLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    database.ref(`orders`).limitToLast(1).once('child_added', snapshot => {
                        let newOrderId;

                        if (snapshot.val()) {
                            newOrderId = snapshot.val().oid + 1;
                        } else {
                            newOrderId = 1;
                        }

                        const { coords } = position;

                        database.ref(`orders/${newOrderId}`).set({
                            oid: newOrderId,
                            dest: {
                                latitude: coords.latitude,
                                longitude: coords.longitude
                            },
                            date: new Date().toISOString(),
                            status: 'active',
                            email,
                            from: 'mcloha@gmail.com'
                        })
                    })
                },
                error => {
                    console.warn(error);
                }
            )
        } else {
            setErrorMessage('Failed to locate your location');
        }
    }

    const makeAnOrder = async e => {
        e.preventDefault();

        const regex = /^\S+@\S+$/i;

        if (email.length > 0 && regex.test(email)) {
            setEmail('');
            try {
                await getClientLocation();
            }
            catch (error) {
                console.warn(error);
            }

        } else {
            setErrorMessage('Please enter a valid email address.');
            errorTimeOut();
        }
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.container}>
                <Typography variant='h5' component='h3'>Make an order</Typography>
                <Typography component='p'>Heres a form for a new order</Typography>
                <form onSubmit={e => makeAnOrder(e)}>
                    <FormGroup>
                        <TextField
                            label='Email'
                            className={classes.input}
                            value={email}
                            onChange={e => setEmail(e.target.value.trim())}
                        />
                        <Button
                            type='submit'
                            variant='contained'>Submit
                        </Button>
                    </FormGroup>
                    <Typography className={classes.input} component='p' color='error'>{errorMessage}</Typography>
                </form>
            </Paper>
        </div>
    )
}

OrderForm.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(OrderForm);
