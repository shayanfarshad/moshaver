import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet,Dimensions, ImageBackground, ScrollView, Image, FlatList , BackHandler,Animated } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from "native-base";
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-community/async-storage';
import { PersianNumber } from '../../PersianNumber.js';

let {width, height} = Dimensions.get('window');
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(100) ;
        this.state = {
            backClickCount: 0,
            request: false,
            isModalVisible: false,
            user: {
                name: 'شایان',
                cash: '45000',
                age: 24,
                avatar: 'https://cdn2.f-cdn.com/contestentries/1316431/24595406/5ae8a3f2e4e98_thumb900.jpg'
            },
            roll: this.props.navigation.state.params.roll,
            archive: [
                {
                    id: 0,
                    subject: 'طلاق',
                    date: '98/11/23',
                    time: '20دقیقه',
                    price: 20000
                },
                {
                    id: 1,
                    subject: 'ازدواج',
                    date: '98/11/20',
                    time: '25دقیقه',
                    price: 24000
                },
                {
                    id: 2,
                    subject: 'ازدواج',
                    date: '98/11/20',
                    time: '25دقیقه',
                    price: 24000
                },
                {
                    id: 3,
                    subject: 'ازدواج',
                    date: '98/11/20',
                    time: '25دقیقه',
                    price: 24000
                },
                {
                    id: 4,
                    subject: 'ازدواج',
                    date: '98/11/20',
                    time: '25دقیقه',
                    price: 24000
                },
            ]
        }
        AsyncStorage.getItem('@roll').then((value) => {
            this.setState({roll : value});
        })
        .then(res => {
            //do something else
        });
    }


componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    setTimeout(() => {
        this.getData(),
            this.setState({ isModalVisible: true, request: true });
    }, 5000);
}

componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
}

_spring() {
    this.setState({backClickCount: 1}, () => {
        Animated.sequence([
            Animated.spring(
                this.springValue,
                {
                    toValue: -.15 * height,
                    friction: 5,
                    duration: 300,
                    useNativeDriver: true,
                }
            ),
            Animated.timing(
                this.springValue,
                {
                    toValue: 100,
                    duration: 300,
                    useNativeDriver: true,
                }
            ),

        ]).start(() => {
            this.setState({backClickCount: 0});
        });
    });

}

handleBackButton = () => {
    this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();

    return true;
};

getData = () => {
    console.log('get request')
}

closeRequest = () => {
    this.setState({ isModalVisible: false, request: false })
}
acceptRequest = () => {
    this.setState({isModalVisible: false})
    this.props.navigation.navigate('Found')
}
render() {
    console.log('Home roll', this.state.roll)
    return (
        <View style={styles.homeMain}>
            <StatusBar translucent backgroundColor="transparent" />
            <Animated.View style={[styles.animatedView, {transform: [{translateY: this.springValue}]}]}>
                    <Text style={styles.exitTitleText}>برای خروج دوباره ضربه بزنید </Text>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => BackHandler.exitApp()}
                    >
                        <Text style={styles.exitText}>خروج</Text>
                    </TouchableOpacity>

                </Animated.View>
            <View style={{ flex: 1, width: '100%', backgroundColor: 'white' }}>
                <View style={{
                    flexDirection: 'row',
                    flex: 0.25,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    overflow: 'hidden'
                }}>
                    <LinearGradient colors={['#d9d9d9', '#cfcfcf', '#b5b5b5']} style={{
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
                                    : {this.state.user.cash} تومان </PersianNumber>
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
                {this.state.roll == 'client' ? (
                    <View style={{ width: '100%', flex: 1 }}>
                        <View style={{ flexDirection: 'row', flex: 0.45, justifyContent: 'space-between' }}>
                            <View style={{ width: '48%', marginTop: -10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Finder')}
                                    style={[styles.menuitem, {
                                        width: '90%',
                                        marginLeft: '10%',
                                        flex: 0.4,
                                        flexDirection:'row',
                                        backgroundColor:'#afcd5a'
                                    }]}>
                                    <Image source={require('../../assets/img/icon-black-01.png')}
                                        style={{width:80 , height:80}} />
                                    <Text style={{
                                        fontSize: 22,
                                        color: '#072e52',
                                    }}>طلاق</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('')}
                                    style={[styles.menuitem, {
                                        width: '90%',
                                        marginLeft: '10%',
                                        flex: 0.6,
                                        backgroundColor:'#64cd5a'
                                    }]}>
                                    <Image source={require('../../assets/img/icon-black-02.png')}
                                        style={{width:80 , height:80}} />

                                    <Text style={{
                                        fontSize: 22,
                                        color: '#072e52',

                                    }}>ازدواج</Text>

                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '48%', marginTop: -10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('')}
                                    style={[styles.menuitem, {
                                        width: '90%',
                                        flex: 0.6,
                                        marginBottom: 15,
                                        backgroundColor:'#cde65a'
                                    }]}>
                                     <Image source={require('../../assets/img/icon-black-03.png')}
                                        style={{width:80 , height:80}} />

                                    <Text style={{
                                        fontSize: 22,
                                        color: '#072e52',
                                    }}>مسائل جنسی</Text>

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('')}
                                    style={[styles.menuitem, {
                                        width: '90%',
                                        flex: 0.4,
                                        flexDirection:'row',
                                        backgroundColor:'#f5dc5a'
                                    }]}>
                                     <Image source={require('../../assets/img/icon-black-04.png')}
                                        style={{width:80 , height:80}} />
                                    <Text style={{
                                        fontSize: 22,
                                        color: '#072e52',
                                    }}>مشاوره فردی</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 0.55, justifyContent: 'space-between' }}>
                            <View style={{ width: '48%', marginTop: 5 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('')}
                                    style={[styles.menuitem, {
                                        width: '90%',
                                        marginLeft: '10%',
                                        flex: 0.4,
                                        flexDirection:'row',
                                        backgroundColor:'#afcd5a'
                                    }]}>
                                    <Image source={require('../../assets/img/icon-black-05.png')}
                                        style={{width:80 , height:80}} />
                                    <Text style={{
                                        fontSize: 22,
                                        color: '#072e52',
                                    }}>اعتیاد</Text>

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('')}
                                    style={[styles.menuitem, {
                                        width: '90%',
                                        marginLeft: '10%',
                                        flex: 0.6,
                                        backgroundColor:'#64cd5a'
                                    }]}>
                                   <Image source={require('../../assets/img/icon-black-06.png')}
                                        style={{width:80 , height:80}} />
                                    <Text style={{
                                        fontSize: 22,
                                        color: '#072e52',
                                    }}>مشاوره خانواده</Text>

                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '48%', marginTop: 5 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('')}
                                    style={[styles.menuitem, {
                                        width: '90%',
                                        flex: 0.6,
                                        backgroundColor:'#cde65a'
                                    }]}>
                                   <Image source={require('../../assets/img/icon-black-08.png')}
                                        style={{width:80 , height:80}} />
                                    <Text style={{

                                        fontSize: 22,
                                        color: '#072e52',
                                    }}>خیانت</Text>

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('')}
                                    style={[styles.menuitem, { flex: 0.4, width: '90%' , flexDirection:'row' ,backgroundColor:'#f5dc5a'}]}>
                                    <Image source={require('../../assets/img/icon-black-07.png')}
                                        style={{width:80 , height:80}} />
                                    <Text style={{
                                        fontSize: 22,
                                        color: '#072e52',
                                    }}>مشاوره تحصیلی</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : (
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 0.6, marginBottom: 20 }}>
                                <FlatList
                                    numColumns={2}
                                    data={this.state.archive}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) =>
                                        <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10 }}>
                                            <View style={{ flex: 1, width: '45%', backgroundColor: 'white', marginHorizontal: '2.5%', borderRadius: 10, elevation: 2 }}>
                                                <Text> موضوع مشاوره : {item.subject}</Text>
                                                <Text> تاریخ : {item.date}</Text>
                                                <Text> زمان مشاوره : {item.time}</Text>
                                                <Text> هزینه : {item.price}</Text>
                                            </View>
                                        </View>
                                    }
                                />

                            </View>
                            {this.state.request ?
                                <View style={styles.maindown}>
                                    <Modal
                                        isVisible={this.state.isModalVisible}
                                        animationIn='fadeInRight'
                                        animationOut='fadeOutLeft'
                                    >
                                        <View style={{ flex: 0.4, justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white', width: '100%', paddingHorizontal: '5%', borderRadius: 10 }}>
                                            <Text style={{ fontSize: 18, fontFamily: 'IRANSansMobile_Bold' }}>درخواست مشاوره</Text>
                                            <Text style={{ fontSize: 16, textAlign: 'center' }}>در صورتی که تمایل به مشاوره دارید درخواست را قبول کنید و در غیر این صورت آن را رد کنید</Text>
                                            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: '5%', alignItems: 'center', flex: 0.4 }}>
                                                <TouchableOpacity onPress={this.acceptRequest} style={[styles.reqbtn, { backgroundColor: '#0e8a2d' }]}>
                                                    <Text style={{ color: 'white', fontSize: 14 }}>تایید برای مشاوره</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={this.closeRequest} style={[styles.reqbtn, { backgroundColor: '#bd1e0f' }]}>
                                                    <Text style={{ color: 'white', fontSize: 14 }}>رد کردن درخواست</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </Modal>
                                </View>
                                :
                                <View style={styles.maindown}>
                                    <LottieView source={require('../../assets/anim/finder3.json')} autoPlay loop />
                                    <Text>منتطر درخواست مشاوره هستید ... صبور باشید</Text>
                                </View>}
                        </View>
                    )}

            </View>
        </View>
    )
}
}

const styles = StyleSheet.create({
    homeMain: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        // flexWrap: 'nowrap',
    },
    menuitem: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 15,
        elevation: 2,
        overflow: 'hidden'
    },
    maindown: {
        flex: 0.4,
        backgroundColor: 'white',
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        elevation: 5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20
    },
    reqbtn: {
        width: '40%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 2
    },
    animatedView: {
        width,
        backgroundColor: "#0a5386",
        elevation: 2,
        position: "absolute",
        bottom: 0,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    exitTitleText: {
        textAlign: "center",
        color: "#ffffff",
        marginRight: 10,
    },
    exitText: {
        color: "#e5933a",
        paddingHorizontal: 10,
        paddingVertical: 3
    }
});

export { HomeScreen }
