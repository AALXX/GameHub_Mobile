import React, { useRef, useState } from 'react'
import { View, Text } from '../../components/Themed'
import { ScrollView, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Video } from 'expo-av'
import { Image } from 'expo-image'
import { TextInput } from 'react-native-gesture-handler'
import { Picker } from '@react-native-picker/picker'
import * as VideoThumbnails from 'expo-video-thumbnails'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const AddPost = () => {
    const [media, setMedia] = useState<ImagePicker.ImagePickerResult | null>(null)

    //* Video attributes states
    const [videoTitle, setvideoTitle] = useState<string>('')
    const [videoVisibility, setvideoVisibility] = useState<string>('public')

    const [thumbnail, setThumbnail] = useState<string>('')

    const videoRef = useRef(null)

    //* Upload Progress State
    const [progress, setProgress] = useState(0)

    const pickMedia = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
            alert('Permission to access media library denied!')
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        })

        if (!result.canceled) {
            setMedia(result)
        }
    }

    const captureVideoFrame = async () => {
        try {
            if (media != null) {
                if (media.assets![0].type === 'video') {
                    console.log(media.assets![0])
                    const { uri } = await VideoThumbnails.getThumbnailAsync('http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', {
                        time: 15000
                    })
                    setThumbnail(uri)
                } else {
                    // If it's not a video, set thumbnail to null
                    setThumbnail('')
                }
            }
        } catch (error) {
            console.error('Error capturing video frame:', error)
        }
    }

    //* Uploads Video to server
    const uploadFile = async () => {
        const userToken = (await AsyncStorage.getItem('userToken')) as string

        if (!media) {
            alert('No video file selected')
            return
        }
        const videoUri = media.assets![0].uri // Get the URI of the video

        let formData = new FormData()
        formData.append('VideoFile', { uri: videoUri, name: 'video.mp4', type: 'video/mp4' })
        formData.append('VideoThumbnail', { uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', name: 'thumbnail.jpg', type: 'image/jpeg' })
        formData.append('VideoTitle', videoTitle)
        formData.append('VideoVisibility', videoVisibility)
        formData.append('UserPrivateToken', userToken)

        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_BACKEND}/videos-manager/upload-video`, formData, {
                headers: { 'content-type': 'multipart/form-data' },
                onUploadProgress: progressEvent => {
                    let percent = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
                    setProgress(percent)
                }
            })
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <ScrollView className="w-full h-full flex bg-[#333333]">
            <View className="w-full h-[25vh] flex">
                {media ? (
                    <View className="w-full h-full flex ">
                        {media.assets![0].type === 'video' ? (
                            <Video
                                ref={videoRef}
                                useNativeControls={true}
                                source={{ uri: media.assets![0].uri }}
                                className="w-full h-[20vh]"
                                onLoad={() => captureVideoFrame()} // Capture the frame when the video is loaded
                            />
                        ) : (
                            <Image source={{ uri: media.assets![0].uri }} style={{ height: 300 }} className="w-full h-[20vh]" />
                        )}
                        <TouchableOpacity onPress={pickMedia} className="flex w-full h-[5vh] justify-center items-center bg-[#3b3b3b]">
                            <Text>Change Media</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity onPress={pickMedia} className="flex w-full h-full justify-center items-center border-white border">
                        <Image source={require('../../assets/UploadPageIcons/VideoUploadIcon.svg')} className="w-[10vw] h-[6vh]" />
                    </TouchableOpacity>
                )}
            </View>
            <TextInput className="text-white bg-[#3b3b3b] h-[6vh] mt-[3vh] indent-3" placeholder="Video Title" value={videoTitle} onChangeText={text => setvideoTitle(text)} />
            <Picker selectedValue={videoVisibility} onValueChange={itemValue => setvideoVisibility(itemValue)}>
                <Picker.Item label="Public" value="public" />
                <Picker.Item label="Private" value="private" />
            </Picker>

            {thumbnail && <Image source={{ uri: thumbnail }} style={{ width: 100, height: 100 }} />}

            <TouchableOpacity className="flex w-full h-[5vh] justify-center items-center bg-[#3b3b3b] text-lg" onPress={uploadFile}>
                <Text>Upload</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default AddPost
