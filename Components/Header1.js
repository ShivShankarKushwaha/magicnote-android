import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { useDrawerStatus } from '@react-navigation/drawer'; // Import useDrawerStatus hook

export default function Header1()
{
    const navigation = useNavigation(); // Initialize navigation
    const isDrawerOpen = useDrawerStatus(); // Get the drawer's open state

    // Function to toggle the drawer
    function toggleDrawer()
    {
        if (isDrawerOpen === 'closed') {
            navigation.openDrawer(); // Open the drawer if it's closed
        } else {
            navigation.closeDrawer(); // Close the drawer if it's open
        }
    }
    return (
        <View className="w-full h-fit flex flex-row justify-between items-center px-5 m-2">
            <TouchableOpacity onPress={() => toggleDrawer()}>
                <View className="w-10 h-8 flex flex-col gap-1 my-auto z-10">
                    <Text className="w-5 h-[3px] bg-black"></Text>
                    <Text className="w-5 h-[3px] bg-black"></Text>
                    <Text className="w-5 h-[3px] bg-black"></Text>
                </View>
            </TouchableOpacity>
            <Text className="text-3xl font-bold border-0 p-2">Magic Notes</Text>
            <Image
                className="w-14 h-14 rounded-full border-2"
                source={require('../public/logo.jpg')}
                alt='LOGO'
            ></Image>
        </View>
    );
}
