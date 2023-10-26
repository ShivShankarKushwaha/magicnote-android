import { View, Text, Linking, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Header1 from './Header1'
import Footercomp from './Footer';

export default function About() {
    const sendEmail = () => {
        const recipientEmail = 'shivshankarkushwaha0000@gmail.com';
        const subject = 'Regarding Magic Note';
        const body = '';

        const mailtoUri = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

        Linking.openURL(mailtoUri)
            .then(() => {
                console.log('Email client opened successfully');
            })
            .catch((error) => {
                console.error('Error opening email client', error);
            });
    };

    return (
        <ScrollView>
            <Header1></Header1>
            <View>
                <View className=" w-full pb-5 lg:pb-0 border-0 mx-auto min-h-[25rem] rounded-bl-xl rounded-br-xl">
                    <Text className="w-full h-auto bg-blue-800 flex justify-center items-center  text-lg text-white text-center p-5" >Welcome to Magic Note</Text>
                    <Text className="m-2 text-justify text-sm p-5">MagicNote, your ultimate digital notepad and reminder app on the Android platform. We believe that everyone has a touch of magic within them, and our app is designed to help you unlock and express your unique creativity while also keeping your important notes and reminders at your fingertips.</Text>
                    <Text className="m-2 text-justify text-sm p-5">At Magic Note, we are committed to fostering a world where inspiration knows no boundaries, and where the hustle and bustle of life is made more manageable. We envision a universe where ideas flow freely and are complemented by the convenience of organized reminders. With Magic Note, we're striving to make this vision a reality.</Text>
                    <Text className="m-2 text-justify text-sm p-5">We are a team of passionate developers, artists, and visionaries who have come together to create an innovative space where your imagination takes center stage. Our combined expertise and dedication to user-friendly design have resulted in an Android app that empowers you to harness the potential of your mind while staying on top of your commitments.</Text>
                    <TouchableOpacity onPress={() => { sendEmail() }}>
                        <Text className="underline cursor-pointer text-blue-500 m-2 text-center" target="_blank" >Contact Us</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <Footercomp></Footercomp>
        </ScrollView>
    )
}