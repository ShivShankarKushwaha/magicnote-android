
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import Header1 from './Header1';
import { ScrollView } from 'react-native-gesture-handler';
import Footercomp from './Footer';
import axios from '../axios';
import Spinner from './Spinner';
import OTP from './OTP';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({ setLoggedin }) =>
{
    const navigate = useNavigation();
    const [loading, setloading] = useState(false);
    const [user, setuser] = useState({ name: '', email: '', password: '', cnfrmpassword: '' });
    const [serror, setserror] = useState('');
    const [showotp, setshowotp] = useState(false);
    function dismiserror()
    {
        setTimeout(() =>
        {
            setserror('')
        }, 5000);
    }
    async function signupuser()
    {
        var regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(user.name) || user.name.length < 5 || user.name.length > 50) {
            setserror("*Username only can be alphabetic charcters and 6 to 50 character long");
            return;
        }
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!mailformat.test(user.email)) {
            setserror("*Enter a valid email address")
            return;
        }
        let reg1 = /[a-z]/;
        let reg2 = /[A-Z]/;
        let reg3 = /[0-9]/;
        var specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        let pass = user.password;
        if (pass.length < 6 || !reg1.test(pass) || !reg2.test(pass) || !reg3.test(pass) || !specialCharRegex.test(pass)) {
            setserror('*password must contain at least 1 upper,1 lower, 1 number , 1 special character and length more than 5')
            return;
        }
        if (user.password !== user.cnfrmpassword) {
            setserror("*password , confirm password did not match");
            return;
        }
        setloading(true);
        console.log('user', user);
        axios.post('/sign', user)
            .then((result =>
            {
                const token = result.data?.token;
                console.log('jwt token received', token);
                if (token) {
                    AsyncStorage.setItem('token', token).then(()=>{console.log('token saved');})
                }
                if (result.data.status === 401) {
                    setloading(false);
                    return Alert.alert('Email not accepted');
                }
                console.log(result.data);
                setshowotp(true);
                setloading(false);
            }))
            .catch(error =>
            {
                console.log('err in sign', error);
                if (error.response && error.response.status === 300) {
                    Alert.alert('User Already Exist! Please Login')
                }
                else if (error.response && error.response.status === 401) {
                    Alert.alert('Email not accepted');
                }
                else {
                    Alert.alert('Unsuccessfull', 'User not registered');
                }
                setloading(false);

            })
        // fetch( `https://healthtracker-jwpl.onrender.com/sign`, {
        //   method: 'POST',
        //   credentials: 'include',
        //   body: new URLSearchParams(user)
        // })
        //   .then(response =>
        //   {
        //     if (response.status === 200) {
        //     setshowotp(true);
        //     setloading(false);
        //     }
        //     return response.json();
        //   })
        //   .then(result =>
        //   {
        //     Alert.alert('User Already Exist! Please Login')
        //     console.log(result);
        //   });

    }
    return (
        <ScrollView>
            <Header1></Header1>
            {loading && <Spinner></Spinner>}
            {showotp && <OTP fun={setshowotp} setLoggedin={setLoggedin}></OTP>}
            {serror && <Text className="text-red-700 p-2 bg-red-200">
                {serror}
                {dismiserror()}
            </Text>}
            <View className=" border-0 m-1 h-[85vh]">
                <View className="w-full h-full flex flex-col justify-center items-center border-0 p-2">
                    <Text className="text-4xl text-center text-green-500 font-bold m-5">Sign Up</Text>
                    <TextInput className="border-2 border-gray-400 w-full m-1 p-2 rounded" inputMode='text' placeholder='Enter Name' value={user.name} onChangeText={(text) => { setuser({ ...user, name: text }); setserror('') }}></TextInput>
                    <TextInput className="border-2 border-gray-400 w-full m-1 p-2 rounded" inputMode='email' placeholder='Enter Email' value={user.email} onChangeText={(text) => { setuser({ ...user, email: text }); setserror('') }}></TextInput>
                    <TextInput className="border-2 border-gray-400 w-full m-1 p-2 rounded" secureTextEntry={true} placeholder='Enter Password' value={user.password} onChangeText={(text) => { setuser({ ...user, password: text }); setserror('') }} autoComplete='new-password' textContentType='newPassword'></TextInput>
                    <TextInput className="border-2 border-gray-400 w-full m-1 p-2 rounded" secureTextEntry={true} placeholder='Confirm Password' value={user.cnfrmpassword} onChangeText={(text) => { setuser({ ...user, cnfrmpassword: text }); setserror('') }}></TextInput>
                    <View className="w-fit p-2 m-5">
                        <Button title='Sign Up' onPress={() => { signupuser() }}></Button>
                    </View>
                    <TouchableOpacity style={styles.googleButton} onPress={() =>
                    {
                        // Linking.openURL('http://localhost:5500/auth/google') 
                        Alert.alert('Unavailable', 'try custom sign up')
                    }}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.iconText}>G</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.buttonText}>Sign Up with Google</Text>
                        </View>
                    </TouchableOpacity>
                    <Text className="m-10">Already have account?</Text>
                    <TouchableOpacity className="flex justify-center items-center flex-row" onPress={() => { navigate.navigate('Login') }}>
                        <Text className="text-blue-400 p-2">Log In</Text>
                        <Text>Here</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Footercomp></Footercomp>
        </ScrollView>
    )
}

export default SignUp;


const styles = StyleSheet.create({
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4285F4', // Google Blue
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 30
    },
    iconContainer: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        //   borderColor:'red',
        //   borderWidth:2,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    iconText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4285F4',
    },
    textContainer: {
        flex: 1,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
