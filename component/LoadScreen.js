import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
class LoadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.getData(),
                this.setState({ isLoading: false });
        }, 5000);
    }

    getData = async () => {
        const user = await AsyncStorage.getItem('@user');
        if (user !== null) {
            this.props.navigation.navigate('Home')
        } else {
            this.props.navigation.navigate('ChooseRoll')
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <StatusBar hidden={true} />
                <LottieView source={require('../assets/anim/load.json')}
                    autoPlay loop autoSize={true} />
            </View>
        );
    }
}

export { LoadScreen };