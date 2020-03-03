import React , {Component} from 'react';
import {View , Text , TouchableOpacity, StyleSheet,StatusBar} from "react-native";
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
class RollScreen extends Component{
    constructor(props) {
        super(props);
        this.state={
        }
    }

    rollToLogin=(roll)=>{
        console.log(roll)
         AsyncStorage.setItem('@roll',roll)

        this.props.navigation.navigate('Login',{
            roll : roll
        })
    }

    render(){
        return(
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <StatusBar hidden={true} />
                <LottieView
                source={require('../../assets/anim/pass.json')}
                loop style={{width:200,height:200}}
                autoPlay
                >
                </LottieView>
                <Text style={{fontFamily:'IRANSansMobile_Bold' , fontSize:20}}>نوع کاربری خود را مشخص کنید</Text>
                <TouchableOpacity onPress={()=>this.rollToLogin('provider')} style={styles.rollbtn}>
                    <Text style={{color:'white', fontSize:20}}>مشاوره دهنده</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.rollToLogin('client')} style={styles.rollbtn}>
                    <Text style={{color:'white' , fontSize:20}}>مشاوره گیرنده</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles= StyleSheet.create({
    rollbtn:{
        width:'60%',
        height:60 ,
        justifyContent:'center',
        alignItems:'center',
        marginTop:50,
        borderRadius:10,
        backgroundColor:'#222d5e',
        elevation:2,
    }
})
export {RollScreen}
