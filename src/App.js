import React, {Component} from 'react';
import firebase from 'firebase';
import {View} from 'react-native';
import {Header, Button, CardSection, Spinner } from './Components/Common';
import LoginForm from './Components/LoginForm'

class App extends Component {
    state= {loggedIn: null}


    componentDidMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyDdwjihFqeexXV32n3SV4Uq6JKYV4vrhbo",
            authDomain: "auth-7d565.firebaseapp.com",
            databaseURL: "https://auth-7d565.firebaseio.com",
            projectId: "auth-7d565",
            storageBucket: "",
            messagingSenderId: "541564370841",
            appId: "1:541564370841:web:c14d40c029f73bbe"
          });

          firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                  this.setState({loggedIn: true});
              } else {
                  this.setState({loggedIn: false });
              }

          });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                   return (
                <CardSection>
                   <Button onPress={() => firebase.auth().signOut()}>
                       Log Out
                   </Button>
                </CardSection>
                   );
            case false: 
                return <LoginForm />;
            default:
                return <Spinner size="large" />     
        }
    }

    render () {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;