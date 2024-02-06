import { View, Text } from '../components/Themed'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { ScrollView, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'
import VideoTamplate, { IVideoTemplateProps } from '../components/Creator/CreatorTemplates/VideoTemplate'

const search = () => {
    const [searchInput, setSearchInput] = useState<string>('')
    const [videosList, setVideoList] = useState<Array<IVideoTemplateProps>>([])

    const postSearch = async () => {
        if (searchInput == '') {
            setVideoList([])
        } else {
            const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_BACKEND}/videos-manager/search-video/${searchInput}`)
            setVideoList(res.data.Videos)
        }
    }

    return (
        <ScrollView className="h-full w-full flex flex-col bg-[#333333]">
            <View className="flex flex-row w-full h-[8vh] self-center bg-[#252525] ">
                <TextInput className="text-white bg-[#3b3b3b] h-[6vh] w-[80%] self-center ml-2" placeholder="Search" value={searchInput} onChangeText={text => setSearchInput(text)} />

                <TouchableOpacity onPress={postSearch} className="flex self-center w-12 h-12 ml-3 mt-2">
                    <View className="flex bg-[#373737] w-full h-full">
                        <Image source={require(`../assets/Search_Icon.svg`)} className="w-8 h-8 self-center mt-2" alt="sendSearch" />
                    </View>
                </TouchableOpacity>
            </View>
            <View className="flex w-full   self-center">
                {videosList.map((video: IVideoTemplateProps, index: number) => (
                    <VideoTamplate key={index} VideoTitle={video.VideoTitle} VideoToken={video.VideoToken} OwnerName={video.OwnerName} OwnerToken={video.OwnerToken} Likes={video.Likes} Dislikes={video.Dislikes} />
                ))}
            </View>
        </ScrollView>
    )
}

export default search
