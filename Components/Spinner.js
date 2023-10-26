import { ActivityIndicator, View } from 'react-native';

export default function Spinner()
{
    return (<View className="fixed flex justify-center items-center">
        <ActivityIndicator size={50} color={'blue'} ></ActivityIndicator>
    </View>)
}