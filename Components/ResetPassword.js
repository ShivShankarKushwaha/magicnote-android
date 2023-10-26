import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header1 from './Header1';
import axios from '../axios';
import Spinner from './Spinner';
const ResetPassword = () =>
{
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate =useNavigation();
    const [loading, setloading] = useState(false);
    const handleResetPassword = () =>
    {
        if (newPassword === confirmPassword) {
            if(newPassword.length<5)
            {
                Alert.alert('Password length','Password length must be 5 or more')
                return;
            }
            setloading(true);
            axios.post("/resetpassword",{password:newPassword})
            .then(result=>
                {
                    Alert.alert('Password Reset Successful ✅', 'Your password has been reset.');
                    navigate.navigate('Notes');
                })
                .catch(err=>
                {
                    Alert.alert('Password not reset ❌❌', 'YPassword did not changed');
                })
                .finally(()=>{setloading(false)})
            setNewPassword('');
            setConfirmPassword('');
        } else {
            Alert.alert('Password Mismatch', 'New password and confirmation do not match.');
        }
    };

    return (
        <View className="w-full h-full">
            <Header1></Header1>
            {loading && <Spinner></Spinner>}
            <Image className="w-full h-full absolute opacity-10 -z-10" source={{uri:'https://source.unsplash.com/random/?flowers'}}></Image>
            <View style={styles.container}>
                <Text style={styles.heading}>Reset Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
                <Button title="Reset Password" onPress={handleResetPassword} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        padding: 10,
    },
});

export default ResetPassword;
