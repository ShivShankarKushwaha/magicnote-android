import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import axios from '../axios';
import Header1 from './Header1';
import Footercomp from './Footer';
import Spinner from './Spinner';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile({ setLoggedin })
{
    const navigate = useNavigation();
    const [user, setUser] = useState({ name: '', email: '' });
    const [loading, setloading] = useState(false);
    const [userfound, setuserfound] = useState(false);
    useEffect(() =>
    {
        async function getuserdata()
        {
            setloading(true);
            let token = await AsyncStorage.getItem('token');
            axios.post('/userdata',{token:token})
                .then(result =>
                {
                    setuserfound(true);
                    setUser({ name: result.data.name, email: result.data.email });
                    setloading(false);
                })
                .catch(err =>
                {
                    setuserfound(false);
                    setloading(false);
                    setLoggedin(false);
                    AsyncStorage.removeItem('token').then(()=>{console.log('Jwt token removed from profile page');})
                    navigate.navigate('Login');
                });
            }
            getuserdata();
        }, []);
        function handlelogout()
        {
            axios.get("/logout")
            .then(result =>
                {
                AsyncStorage.removeItem('token').then(()=>{console.log('Jwt token removed from profile page');})
                console.log(result.data);
                setLoggedin(false);
                navigate.navigate('Login')
            })
        .catch(err=>{console.log(err);})
    }
    return (
        <ScrollView className="scroll-smooth">
            <Header1></Header1>
            {loading && <Spinner></Spinner>}
            {loading ? <Text className="text-center">Loading data</Text> : (userfound ? null : <Text className="text-center">User not found</Text>)}
            {(!loading && userfound) ? <View className='flex flex-col justify-around items-center w-full h-auto mb-52'>
                {/* <Image source={{ uri: 'https://scitechdaily.com/images/Massive-Galaxy.gif' }} style={styles.backgroundImage} /> */}
                {/* <Text  className='font-["Bricolage Grotesque"] text-3xl text-blue-700'>Welcome <Text  className='text-6xl font-extrabold m-10' style={styles.profileName}>{user.name}</Text></Text> */}
                <Text className='font-["Bricolage Grotesque"] text-lg text-black'>Welcome</Text>
                <Text className="text-xl text-blue-500 font-semibold m-4">{user.name}</Text>
                <View className='border-0 w-full flex flex-col justify-center'>
                    <Text className='w-full text-xl text-cyan-800 border-0 p-2 text-center my-5 bg-slate-400'>User Details</Text>
                    <View className='w-full flex flex-row justify-between  border-0 p-2'>
                        <Text>Name</Text>
                        <Text>{user.name}</Text>
                    </View>
                    <View className='w-full flex flex-row justify-between  border-0 p-2'>
                        <Text>Email</Text>
                        <Text>{user.email}</Text>
                    </View>
                    <TouchableOpacity className="m-5" onPress={() => { handlelogout() }}>
                        <Text className="mx-auto p-2 bg-red-700 text-white">Log Out</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>{navigate.navigate('ResetPassword')}}>
                    <Text className='shadow-sm p-2 text-lg cursor-pointer bg-slate-300'>Reset Password</Text>
                </TouchableOpacity>
            </View> : null}
            <Footercomp></Footercomp>
        </ScrollView>
    );
}


export default Profile;
