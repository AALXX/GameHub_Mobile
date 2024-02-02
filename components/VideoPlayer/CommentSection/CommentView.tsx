import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'expo-image'
import { Link } from 'expo-router'

interface IVideoPlayerProps {
    VideoToken: string | null
}

const CommenView = (props: IVideoPlayerProps) => {
    const [commentInput, setCommentInput] = useState<string>('')
    const [hasComments, setHasComments] = useState<boolean>(false)

    const postComment = async () => {
        const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_BACKEND}/videos-manager/post-comment`, {
            UserToken: (await AsyncStorage.getItem('userToken')) as string,
            VideoToken: props.VideoToken,
            Comment: commentInput
        })
        alert('Comment Posted')

        if (hasComments == false) {
            setHasComments(true)
        }
    }

    return (
        <Link href={`/VideoComments/${props.VideoToken}`} asChild>
            <TouchableOpacity>
                <View className="flex flex-row h-[10vh] w-full bg-[#313131] ">
                    <TextInput className="text-white bg-[#373737] w-[82%] h-10 self-center ml-2 indent-3" placeholder="Comment..." value={commentInput} onChangeText={text => setCommentInput(text)} />

                    <TouchableOpacity
                        className="flex justify-center bg-[#2c2c2c] ml-3 w-10  h-10 mt-5 "
                        onPress={() => {
                            postComment()
                        }}
                    >
                        <Image source={require(`../../../assets/CommentsIcons/SendComment_icon.svg`)} className=" w-8 h-8 self-center " alt="SettingIcon" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export default CommenView
