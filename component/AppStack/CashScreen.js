import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput ,BackHandler } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Input } from 'native-base';
import { PersianNumber } from '../../PersianNumber';

class CashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roll: '',
            sugPrice: [
                '15000',
                '25000',
                '45000',
                '60000'
            ],
            user: {
                name: 'شایان',
                cash: '45000',
                age: 24,
                avatar: 'https://cdn2.f-cdn.com/contestentries/1316431/24595406/5ae8a3f2e4e98_thumb900.jpg'
            },
        }
        AsyncStorage.getItem('@roll').then((value) => {
            this.setState({ roll: value });
        })
            .then(res => {
                //do something else
                console.log('cash roll : ', this.state.roll)
            });
    }

    changePrice = (price) => {
        console.log(price)
        console.log(this.price)
    }

    render() {
        console.log(this.state.price)
        return (
            <View style={{ flex: 1, backgroundColor: '#0e2d45' }}>
                <View style={{
                    flexDirection: 'row',
                    flex: 0.35,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    overflow: 'hidden',
                    elevation: 10
                }}>
                    <LinearGradient colors={['#e373ff', '#9349a6', '#683475']} style={{
                        width: '100%',
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row-reverse',
                        paddingHorizontal: '5%',
                        paddingTop: 20
                    }} start={{ x: 1, y: 1 }} end={{ x: 0.0, y: 0.2 }}
                        locations={[0.2, 0.8, 1]}>
                        <View style={{ flex: 0.4 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'IRANSansMobile_Bold' }}> نام مستعار
                                    : {this.state.user.name}</Text>
                            <PersianNumber style={{ fontSize: 16, fontFamily: 'IRANSansMobile_Bold' }}> اعتبار
                                    : 45000 تومان </PersianNumber>
                            <PersianNumber style={{ fontSize: 16, fontFamily: 'IRANSansMobile_Bold' }}> سن
                                    : {this.state.user.age} </PersianNumber>
                        </View>
                        <View style={{
                            flex: 0.3,
                            borderRadius: 20,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image source={{ uri: this.state.user.avatar }} style={{ width: 80, height: 80 }} />
                        </View>
                    </LinearGradient>
                </View>
                {this.state.roll == 'client' ?
                    <View style={styles.mainview}>
                        <Text style={{ marginTop: 10, fontSize: 18, fontFamily: 'IRANSansMobile_Bold', color: 'white' }}>قیمت پیشنهادی</Text>
                        <View style={styles.offerview}>
                            <TouchableOpacity onPress={() => this.setState({ price: this.state.sugPrice[0] })} style={styles.sugbtn}>
                                <PersianNumber style={{ fontSize: 20 }}>{this.state.sugPrice[0]}</PersianNumber>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ price: this.state.sugPrice[1] })} style={styles.sugbtn}>
                                <PersianNumber style={{ fontSize: 20 }}>{this.state.sugPrice[1]}</PersianNumber>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ price: this.state.sugPrice[2] })} style={styles.sugbtn}>
                                <PersianNumber style={{ fontSize: 20 }}>{this.state.sugPrice[2]}</PersianNumber>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ price: this.state.sugPrice[3] })} style={styles.sugbtn}>
                                <PersianNumber style={{ fontSize: 20 }}>{this.state.sugPrice[3]}</PersianNumber>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 0.3, width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{ marginTop: 10, fontSize: 18, fontFamily: 'IRANSansMobile_Bold', color: 'white' }}>قیمت دلخواه :</Text>
                            <View style={{ width: '40%', flexDirection: 'row-reverse', justifyContent: 'space-around', alignItems: 'center' }}>
                                <TextInput
                                    value={this.state.price}
                                    keyboardType='number-pad'
                                    selectionColor={'#e373ff'}
                                    placeholderTextColor='#d1cfd1'
                                    style={styles.priceinp}
                                    onChangeText={(text) => this.setState({ price: text })} />
                                <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 20, color: 'white', textShadowColor: 'white' }} >تومان</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row-reverse', flex: 0.3, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.incbtn}>
                                <Text style={{ fontFamily: 'IRANSansMobile_Bold' }}>افزایش موجودی</Text>
                                <Icon name='plus' type='FontAwesome5' style={{ fontSize: 18 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={styles.mainview}>
                            <View style={{width:'100%', justifyContent:'center', alignItems:'center' , paddingTop:20}}>
                                <Text style={{fontFamily: 'IRANSansMobile_Bold' , color:'white'}}>اعتبار قابل برداشت :  30000 تومان</Text>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', flex: 0.3, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.incbtn}>
                                <Text style={{ fontFamily: 'IRANSansMobile_Bold' }}>درخواست واریز</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainview: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    offerview: {
        flexDirection: 'row-reverse',
        width: '100%',
        flex: 0.3,
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    sugbtn: {
        width: '20%',
        height: 50,
        backgroundColor: '#e373ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        elevation: 2,
    },
    incbtn: {
        width: '40%',
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fc9003',
        flexDirection: 'row-reverse',
        borderRadius: 10
    },
    priceinp: {
        width: '70%',
        height: 50,
        textAlign: 'center',
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        fontSize: 18,
        fontFamily: 'IRANSansMobile_Light'
    }

})
export { CashScreen }
