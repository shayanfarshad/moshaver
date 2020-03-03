import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import LottieView from 'lottie-react-native';
class FinderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            findLoading: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.getData(),
                this.setState({ findLoading: false });
        }, 5000);
    }
    getData = async () => {
        console.log('oke')
        this.props.navigation.navigate('Found');
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0e2d45' }}>
                <View style={{flex:0.8, justifyContent:'center', alignItems:'center' ,width:'100%'}}>
                    <LottieView source={require('../../assets/anim/finder.json')} autoPlay loop />
                    <Text style={{ color: 'white', fontSize: 16, fontFamily: 'IRANSansMobile_Bold' }}>در حال جستجوی مشاور</Text>
                </View>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{ width: '50%', height: 50, borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>لغو درخواست</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export { FinderScreen }
