import { StyleSheet } from 'react-native'
import { Text, View } from '../../components/Themed'

import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Video } from 'expo-av'

const WatchVideoScreen = () => {
    const { VideoToken } = useLocalSearchParams()
    return (
        <View style={styles.container}>
            <Video
                source={{ uri: `${process.env.EXPO_PUBLIC_VIDEO_SERVER_BACKEND}/video-manager/video-stream/${VideoToken}` }}
                className="w-full h-[26vh]"
                useNativeControls // Enable built-in player controls
                isLooping // Loop the video
            />
            <View className="w-full h-[10vh] bg-[#272727]"></View>
        </View>
    )
}

export default WatchVideoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})
