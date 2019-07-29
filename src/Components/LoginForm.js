import React, {Component} from 'react';
import {Text} from 'react-native'
import Firebase from 'firebase';
import {Button, Card, CardSection, Input, Spinner } from './Common'

class LoginForm extends Component {
    state = { email: '', password: '', error:'', loading: false};

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({error: '', loading: true});

        Firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                Firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }

    onLoginFail() {
        this.setState({error: 'Authentication Failed', loading: false});
    }

onLoginSuccess() {
    this.setState({
        email: '',
        passsword: '',
        loading: false,
        error: ''
    });
}
    

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />
        }

        return(
            <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>
        );
    }
    
    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                    placeholder="user@example.com"
                    label="Email"
                    value={this.state.email}
                    onChangeText={email => this.setState ({ email })}
                     />
                </CardSection>
                <CardSection>
                    <Input
                    secureTextEntry
                    placeholder="password"
                    label="password"
                    value={this.state.passsword}
                    onChangeText={password => this.setState ({password})}
                    
                    />
                </CardSection>

                <Text style={styles.errorTextStyle} >
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles={
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;