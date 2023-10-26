import { useEffect, useState } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
// import MapView, { Marker } from 'react-native-maps';
export default function Footercomp()
{
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() =>
    {
        const iframeSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.5500847857707!2d76.18734297623438!3d31.48156044905749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391adb5aa39796f9%3A0x3d5e714694324768!2sIIIT%20Una%2C%20Academic%20Block!5e0!3m2!1sen!2sin!4v1695917877217!5m2!1sen!2sin";
        const latitudeRegex = /!3d([-0-9.]+)/;
        const longitudeRegex = /!2d([-0-9.]+)/;

        const latitudeMatch = iframeSrc.match(latitudeRegex);
        const longitudeMatch = iframeSrc.match(longitudeRegex);

        if (latitudeMatch && longitudeMatch) {
            const extractedLatitude = parseFloat(latitudeMatch[1]);
            const extractedLongitude = parseFloat(longitudeMatch[1]);
            setLatitude(extractedLatitude);
            setLongitude(extractedLongitude);
        }
    }, []);
    const sendEmail = () =>
    {
        const recipientEmail = 'shivshankarkushwaha0000@gmail.com';
        const subject = 'Regarding Health tracker';
        const body = '';

        const mailtoUri = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

        Linking.openURL(mailtoUri)
            .then(() =>
            {
                console.log('Email client opened successfully');
            })
            .catch((error) =>
            {
                console.error('Error opening email client', error);
            });
    };

    return (<View className="bg-slate-800 mt-5 py-3">
        {/* <MapView
            style={{ height: 200, marginTop: 1 }}
            initialRegion={{
                latitude: 31.48156044905749,
                longitude: 76.18734297623438,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <Marker
                coordinate={{ latitude: 31.48156044905749, longitude: 76.18734297623438 }}
                title="IIIT Una, Academic Block"
            />
        </MapView> */}
        <Text className="text-center text-white text-lg">Contact Us</Text>
        <Text className="text-center text-white">Una, Himachal Pradesh, India</Text>
        <Text className="text-center text-white">Shiv Shankar Kushwaha</Text>
        <TouchableOpacity onPress={() => { sendEmail() }}>
            <Text className="text-center underline text-green-600">shivshankarkushwaha0000@gmail.com</Text>
        </TouchableOpacity>
        <Text className="text-center text-white mb-5"> All rights reserved © MagicNote 2023</Text>
    </View>)
}