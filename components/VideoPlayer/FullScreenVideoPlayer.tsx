import { View, Text } from 'react-native'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Video } from 'expo-av'

const FullScreenVideoPlayer = (props: { VideoToken: string; setFullScreen: Dispatch<SetStateAction<boolean>> }) => {
    const VideoRef = useRef<Video>(null)

    const [playbackInstanceInfo, setPlaybackInstanceInfo] = useState({
        position: 0,
        duration: 0,
        state: 'Buffering'
    })
    
    const updatePlaybackCallback = (status: any) => {
        if (status.isLoaded) {
            console.log(status, 'status')
            setPlaybackInstanceInfo({
                position: status.positionMillis,
                duration: status.durationMillis || 0,
                state: status.didJustFinish ? 'Ended' : status.isBuffering ? 'Buffering' : status.shouldPlay ? 'Playing' : 'Paused'
            })
        } else {
            if (status.isLoaded === false && status.error) {
                const errorMsg = `Encountered a fatal error during playback: ${status.error}`
                console.log(errorMsg, 'error')
                // setErrorMessage(errorMsg)
            }
        }
    }

    return (
        <View className="flex w-[100%] h-[40vh] ">
            <Video
                // useNativeControls={false}
                ref={VideoRef}
                source={{ uri: `${process.env.EXPO_PUBLIC_VIDEO_SERVER_BACKEND}/video-manager/video-stream/${props.VideoToken}` }}
                className="w-full h-full"
                onPlaybackStatusUpdate={updatePlaybackCallback}
                onError={error => alert(`Video Error: ${error}`)}
                useNativeControls
            />
        </View>
    )
}

export default FullScreenVideoPlayer
