import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, BackHandler } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';


class FoundScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            findLoading: true,
            roll: ''
        }
        AsyncStorage.getItem('@roll').then((value) => {
            this.setState({ roll: value });
        })
            .then(res => {
                //do something else
            });
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.toggleGoBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.toggleGoBack);
    }

    toggleGoBack = () => {
        this.props.navigation.navigate('Home');
        return true;
    }

    render() {
        return (
            <View style={{flex:1}}>
                {this.state.roll == 'client' ?
                    <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#0e2d45', paddingTop: 30, padddingBottom: 30 }}>
                        <Text style={{ fontSize: 20, color: 'white', fontFamily: 'IRANSansMobile_Bold' }}>مشاور شما یافت شد!</Text>
                        <Image source={{ uri: 'https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-7-avatar-2754582_120519.png' }} style={{ width: 150, height: 150, borderRadius: 75 }} />
                        <Text style={{ color: 'white', fontSize: 18 }}>نام مستعار : دکتر خفن</Text>
                        <Text style={{ color: 'yellow', fontSize: 18, textAlign: 'center' }}>توجه : مدت زمان مکالمه شما به هر شکل تنها 20 دقیقه است</Text>
                        <Text style={{ color: 'white', textAlign: 'center', marginHorizontal: '5%' }}>هزینه مشاوره 15000 تومان بوده و در پایان از حساب شما کسر خواهد شد</Text>
                        <View style={{ width: '90%', flexDirection: 'row', marginHorizontal: '5%', height: 100, justifyContent: 'space-around', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.naivigation.navigate('Chat')} style={{ width: '40%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, elevation: 10 }}>
                                <Text>مکالمه متنی</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Call')} style={{ width: '40%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, elevation: 10 }}>
                                <Text>مکالمه صوتی</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#0e2d45', paddingTop: 30, padddingBottom: 30 }}>
                           <Image source={{ uri: 'https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-7-avatar-2754582_120519.png' }} style={{ width: 150, height: 150, borderRadius: 75 }} />
                           <Text style={{ fontSize: 20, color: 'white', fontFamily: 'IRANSansMobile_Bold' }}>نام مستعار : شایان 96</Text> 
                           <Text style={{ color: 'yellow', fontSize: 18, textAlign: 'center' }}>کاربر شما مکالمه صوتی را انتخاب کرده است</Text>
                    </View>
                }
            </View>
        )
    }
}

export { FoundScreen }
