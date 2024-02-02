import { TouchableOpacity } from 'react-native'
import { Text, View } from '../Themed'
import { Image } from 'expo-image'

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Video } from 'expo-av'
import { IVideoData, dislikeVideo, followAccount, getVideoData, likeVideo } from './UtilFunc'
import AsyncStorage from '@react-native-async-storage/async-storage'
import VideoPLayerOverlay from './VideoPLayerOverlay'

const VideoPlayer = (props: { VideoToken: string; setFullScreen: Dispatch<SetStateAction<boolean>> }) => {
    const VideoRef = useRef<Video>(null)
    const [showOverlay, setShowOverlay] = useState(false)

    const allTimeWatchRef = useRef<number>(0)

    const [VideoData, setVideoData] = useState<IVideoData>({
        error: false,
        VideoFound: false,
        OwnerToken: '',
        PublishDate: '',
        VideoDescription: '',
        VideoTitle: '',
        AccountName: '',
        AccountFolowers: '',
        UserFollwsAccount: false,
        VideoLikes: 0,
        VideoDislikes: 0,
        UserLikedVideo: false,
        UserLikedOrDislikedVideo: 0
    })

    const [userFollwsAccount, setUserFollwsAccount] = useState<boolean>(false)
    const [userLikedVideo, setUserLikedVideo] = useState<boolean>(false)
    const [userDisLikedVideo, setUserDisLikedVideo] = useState<boolean>(false)
    const [videoLikes, setVideoLikes] = useState<number>(0)
    const [videoDisLikes, setVideoDisLikes] = useState<number>(0)

    const [playbackInstanceInfo, setPlaybackInstanceInfo] = useState({
        position: 0,
        duration: 0,
        state: 'Buffering'
    })

    useEffect(() => {
        if (props.VideoToken == null || props.VideoToken === undefined) {
            // window.location.href = 'http://localhost:3000/'
            alert('video no found')
        }

        ;(async () => {
            const videoData = await getVideoData(props.VideoToken, (await AsyncStorage.getItem('userToken')) as string)
            setVideoData(videoData)
            setUserFollwsAccount(videoData.UserFollwsAccount)
            setUserLikedVideo(videoData.UserLikedVideo)
            if (videoData.UserLikedOrDislikedVideo.like_or_dislike === 1) {
                setUserLikedVideo(true)
            } else if (videoData.UserLikedOrDislikedVideo.like_or_dislike === 2) {
                setUserDisLikedVideo(true)
            }

            setVideoLikes(videoData.VideoLikes)
            setVideoDisLikes(videoData.VideoDislikes)
        })()

        // const sendVideoAnalitycs = async () => {
        //     if (Math.floor(allTimeWatchRef.current) > 3) {
        //         const resp = await axios.post(`${process.env.SERVER_BACKEND}/videos-manager/update-video-alalytics`, {
        //             WatchTime: allTimeWatchRef.current,
        //             UserPublicToken: getCookie('userToken'),
        //             VideoToken: props.VideoToken
        //         })
        //         console.log(resp)
        //     }
        // }

        return () => {
            // clearInterval(VideoChecks)
            // await sendVideoAnalitycs()
        }
    }, [props.VideoToken])

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
        <View className="w-full flex">
            <View>
                <TouchableOpacity
                    className="w-full h-[26vh] z-10"
                    onPress={() => {
                        setShowOverlay(!showOverlay)
                    }}
                >
                    {showOverlay ? (
                        <VideoPLayerOverlay VideoRef={VideoRef} playbackInstanceInfo={playbackInstanceInfo} setFullscreen={props.setFullScreen} />
                    ) : (
                        <View className="bg-red-700 h-[0.5vh]" style={{ width: `${(playbackInstanceInfo.position / playbackInstanceInfo.duration) * 100}%` }} />
                    )}

                    <Video
                        useNativeControls={false}
                        ref={VideoRef}
                        source={{ uri: `${process.env.EXPO_PUBLIC_VIDEO_SERVER_BACKEND}/video-manager/video-stream/${props.VideoToken}` }}
                        className="w-full h-[26vh]"
                        onPlaybackStatusUpdate={updatePlaybackCallback}
                        onError={error => alert(`Video Error: ${error}`)}
                    />
                </TouchableOpacity>
                <View className="flex flex-row w-full h-[12vh] bg-[#272727]">
                    <Image source={`${process.env.EXPO_PUBLIC_FILE_SERVER}/${VideoData.OwnerToken}/Main_Icon.png`} placeholder="acountImage" className="w-12 h-12 rounded-full mt-6 ml-2" />
                    <View className="flex flex-col ml-2 h-[8vh] self-center bg-[#272727] w-full">
                        <Text className="text-white text-lg">{VideoData.VideoTitle}</Text>
                        <View className="self-center h-[0.1vh] bg-white mt-[0.5vh] w-[80%] mr-auto" />
                        <View className="flex  flex-row bg-[#272727]">
                            <View className="flex flex-col bg-[#272727] ">
                                <Text className="text-white text-base">{VideoData.AccountName}</Text>
                                <Text className="text-white text-xs">{VideoData.AccountFolowers} followers</Text>
                            </View>
                            {userFollwsAccount ? (
                                <TouchableOpacity
                                    onPress={async () => {
                                        setUserFollwsAccount(await followAccount((await AsyncStorage.getItem('userToken')) as string, VideoData.OwnerToken, userFollwsAccount))
                                    }}
                                    className="ml-4"
                                >
                                    <View className="flex justify-center mt-3  bg-[#494949] h-[3vh] w-[20vw]">
                                        <Text className="self-center">UnFollow</Text>
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <>
                                    <TouchableOpacity
                                        onPress={async () => {
                                            setUserFollwsAccount(await followAccount((await AsyncStorage.getItem('userToken')) as string, VideoData.OwnerToken, userFollwsAccount))
                                        }}
                                        className="ml-4"
                                    >
                                        <View className="flex justify-center mt-3  bg-[#494949] h-[3vh] w-[20vw]">
                                            <Text className="self-center">Follow</Text>
                                        </View>
                                    </TouchableOpacity>
                                </>
                            )}
                            <View className="flex flex-row  bg-[#272727] w-[40%] mr-4 ml-auto">
                                {userLikedVideo ? (
                                    <>
                                        <TouchableOpacity
                                            onPress={async () => {
                                                setUserDisLikedVideo(false)
                                                setVideoLikes(videoLikes - 1)

                                                setUserLikedVideo(await likeVideo((await AsyncStorage.getItem('userToken')) as string, props.VideoToken, userLikedVideo, userDisLikedVideo))
                                            }}
                                            className="self-center mt-2"
                                        >
                                            <Image source={require('../../assets/PlayerIcons/Liked_icon.svg')} className="w-6 h-6 mr-1" alt="not muted image" />
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <TouchableOpacity
                                            onPress={async () => {
                                                setUserDisLikedVideo(false)
                                                setVideoLikes(videoLikes + 1)
                                                if (userDisLikedVideo) {
                                                    setVideoDisLikes(videoDisLikes - 1)
                                                }

                                                setUserLikedVideo(await likeVideo((await AsyncStorage.getItem('userToken')) as string, props.VideoToken, userLikedVideo, userDisLikedVideo))
                                            }}
                                            className="self-center mt-2"
                                        >
                                            <Image source={require('../../assets/PlayerIcons/Like_icon.svg')} className="w-6 h-6 mr-1" alt="not muted image" />
                                        </TouchableOpacity>
                                    </>
                                )}

                                <Text className="text-white self-center mt-2">{videoLikes}</Text>

                                {userDisLikedVideo ? (
                                    <>
                                        <TouchableOpacity
                                            onPress={async () => {
                                                setUserLikedVideo(false)
                                                setVideoDisLikes(videoDisLikes - 1)

                                                setUserDisLikedVideo(await dislikeVideo((await AsyncStorage.getItem('userToken')) as string, props.VideoToken, userLikedVideo, userDisLikedVideo))
                                            }}
                                            className="self-center mt-2"
                                        >
                                            <Image source={require('../../assets/PlayerIcons/Disliked_icon.svg')} className="w-6 h-6 mr-1 ml-3" alt="not muted image" />
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <TouchableOpacity
                                            onPress={async () => {
                                                setUserLikedVideo(false)
                                                setVideoDisLikes(videoDisLikes + 1)
                                                if (userLikedVideo) {
                                                    setVideoLikes(videoLikes - 1)
                                                }
                                                setUserDisLikedVideo(await dislikeVideo((await AsyncStorage.getItem('userToken')) as string, props.VideoToken, userLikedVideo, userDisLikedVideo))
                                            }}
                                            className="self-center mt-2"
                                        >
                                            <Image source={require('../../assets/PlayerIcons/Dislike_icon.svg')} className="w-6 h-6 mr-1 ml-3" alt="not muted image" />
                                        </TouchableOpacity>
                                    </>
                                )}
                                <Text className="text-white self-center  mt-2">{videoDisLikes}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default VideoPlayer
