import React from 'react';
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

import { registration } from "../../service/utils";
import { INCORRECT_EMAIL, USED_EMAIL, EMPTY_FIELDS, OK, DEFAULT } from "./constants";

import { styles } from './style';

class Registration extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        isAuthorized: PropTypes.bool,
    };

    state = {
        status: DEFAULT
    };

    mountNameInput = nameInput => this.nameInput = nameInput;
    mountSurnameInput = surnameInput => this.surnameInput = surnameInput;
    mountPasswordInput = passwordInput => this.passwordInput = passwordInput;
    mountEmailInput = emailInput => this.emailInput = emailInput;
    handleKeyPress = (e) => e.key === 'Enter' && this.handleClick();

    handleClick = () => {
        registration(
            this.nameInput.value,
            this.surnameInput.value,
            this.emailInput.value,
            this.passwordInput.value,
            status => this.setState({status: status})
        );
    };

    render() {
        const { classes, isAuthorized } = this.props,
              { status } = this.state;
        let warning = <></>;

        if (isAuthorized) {
            return <Redirect to={'/'}/>
        }

        if(status === OK) {
            return <Redirect to={'/authorization'}/>
        }

        if(status === INCORRECT_EMAIL) {
            warning = <Typography>Некорректный Email</Typography>
        }

        if(status === USED_EMAIL) {
            warning = <Typography>Этот email уже был использован</Typography>
        }

        if(status === EMPTY_FIELDS) {
            warning = <Typography>Заполните все поля</Typography>
        }

        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.container}
            >
                <form onKeyPress={this.handleKeyPress}>
                    <Card className={classes.card}>
                        <div>
                            {warning}
                            <TextField
                                id="standard-name"
                                label="Name"
                                margin="normal"
                                inputRef={this.mountNameInput}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-name"
                                label="Surname"
                                margin="normal"
                                inputRef={this.mountSurnameInput}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-name"
                                label="Password"
                                margin="normal"
                                inputRef={this.mountPasswordInput}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-name"
                                label="Email"
                                margin="normal"
                                inputRef={this.mountEmailInput}
                            />
                        </div>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className={classes.btnGroup}
                        >
                            <Button color="primary" onClick={this.handleClick}>Регистрация</Button>
                        </Grid>
                    </Card>
                </form>
            </Grid>
        );
    }
}

export default withStyles(styles)(Registration)
