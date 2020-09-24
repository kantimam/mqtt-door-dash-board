import React, { useState, useContext } from 'react'
import { Box, Button, FormHelperText, TextField, Typography } from '@material-ui/core'
import FormCard from '../FormCard'
import { useHistory } from 'react-router-dom'
import { login } from '../services/userService'
import { UserContext } from '../App'
import FormCard from '../components/FormCard'
import { authFormStyles } from '../styles/styles'



const Login = () => {
    const classes = authFormStyles()
    const history = useHistory()
    const { dispatch } = useContext(UserContext)
    const [username, setName] = useState('')
    const [password, setPassword] = useState('')
    const [nameError, setNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [formError, setFormError] = useState('')

    const validate = () => {
        let passed = true
        if (!username) {
            setNameError('name is required')
            passed = false
        }
        if (username.length < 4) {
            setNameError('min length for name is 4')
            passed = false
        }
        if (password.length < 6) {
            setPasswordError('min length for password is 6')
            passed = false
        }
        return passed
    }

    const submit = (e) => {
        e.preventDefault()
        // if no errors try to submit
        if (validate()) {
            login(username, password)
                .then((data) => data.json())
                .then((json) => {
                    // check if response has the required field
                    if (!json.user) throw new Error('invalid response')
                    dispatch({
                        type: 'logIn',
                        payload: json.user,
                    })

                    // go to home after
                    history.push('/')
                })
                .catch((e) => {
                    // tell the user login failed keep it for 4 seconds the remove it
                    console.log(e)
                    setFormError('could not login')
                    setTimeout(() => setFormError(''), 4000)

                })
        }
    }

    return (
        <Box display="flex" minHeight="100vh">
            <FormCard elevation={4}>
                <Typography align='center' display='block' variant="h4">
                    Login
                </Typography>
                <form className={classes.root} onSubmit={submit}>
                    <TextField
                        name="username"
                        label="username"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                        fullWidth
                        size="small"
                        required
                        error={!!nameError}
                        helperText={nameError}
                    />

                    <TextField
                        name="password"
                        label="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        type="password"
                        fullWidth
                        size="small"
                        required
                        error={!!passwordError}
                        helperText={passwordError}
                    />

                    <Button
                        className={classes.submitButton}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        SUBMIT
                    </Button>

                    <FormHelperText error={!!formError}>{formError}</FormHelperText>
                </form>
            </FormCard>
        </Box>
    )
}

export default Login