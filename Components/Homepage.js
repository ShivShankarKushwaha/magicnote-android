
import { Button, Image, ScrollView, Text, View } from "react-native";
import { Rating, AirbnbRating } from 'react-native-ratings';
// import Header from "./Header";
import Footercomp from "./Footer";
import Header1 from "./Header1";
import { useNavigation } from "@react-navigation/native";

export default function Homepage({ loggedin })
{
    const navigate = useNavigation();
    return (<ScrollView>
        <Header1></Header1>
        <View className="m-4">
            <Text className="text-center text-lg text-black font-semibold">Save and Organize Your Notes with</Text>
            <Text className="text-center text-lg text-black font-semibold"> MagicNote</Text>
        </View>
        <Text className="p-5 text-justify">
            Never forget important information again with our simple and easy-to-use note storage website.
        </Text>
        <Text className="p-5 pb-1 font-bold text-black text-justify">
            “NoteKeeper has made my life so much easier. I can easily jot down important information and access it whenever I need. Highly recommended!”
        </Text>
        <Text className="text-center">Shiv Shankar Kushwaha</Text>
        <View className="flex flex-row justify-center items-center my-4">
            <View className="w-[30%] bg-none">
                {/* <Text className="text-center">*****</Text> */}
                <Rating
                    type='star'
                    ratingCount={5}
                    startingValue={4.5}
                    imageSize={15}
                    onFinishRating={4}
                    readonly
                />
            </View>
            <View className="w-[30%]">
                <Text className="text-center">Easy-to-use</Text>
            </View>
            <View className="w-[30%] text-center">
                <Text className="text-center">Sync across devices</Text>
            </View>
        </View>
        <Image className="w-[90%] h-60 ml-auto rounded-l-xl" source={require('../public/first.jpeg')} alt="Image"></Image>
        <View className="my-5">
            <Text className="font-bold text-center text-black">Store and access your notes easily</Text>
            <Text className="p-5 pt-1 text-justify">NoteKeeper allows you to store and access your notes easily. Whether it's a to-do list, important reminders, or random thoughts, you can keep them all in one place and access them whenever you need.</Text>
        </View>
        <Image className="w-[90%] h-60 mr-auto rounded-r-xl" source={require('../public/second.jpeg')} alt="Image"></Image>
        <View className="my-5">
            <Text className="font-bold text-center text-black">Stay organized and never miss a thing</Text>
            <Text className="p-5 pt-1 text-justify">With NoteKeeper, you can stay organized and never miss a thing. Categorize your notes, add tags, and use the search function to quickly find the information you need. Say goodbye to scattered sticky notes and messy notebooks.</Text>
        </View>
        <Image className="w-[90%] h-60 ml-auto rounded-l-xl" source={require('../public/third.jpeg')} alt="image"></Image>
        <View className="mt-5">
            <Text className="font-bold text-center text-black">Sync across devices for convenience</Text>
            <Text className=" px-5 text-justify">NoteKeeper syncs seamlessly across all your devices, so you can access your notes anytime, anywhere. Whether you're on your computer, smartphone, or tablet, your notes will always be at your fingertips.</Text>
        </View>
        <Text className="m-5 text-center text-black">Join Our Community</Text>
        <View className="flex justify-center items-center">
            <Button title="Get Started" 
            onPress={() => { loggedin ? (navigate.navigate('Notes')) : (navigate.navigate('Login')) }}
            ></Button>
        </View>
        <Footercomp></Footercomp>
    </ScrollView>)
}