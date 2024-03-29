import axios from 'axios'
import { Video } from 'expo-av'
import { RefObject } from 'react'

interface IVideoData {
    error: boolean
    VideoFound: boolean
    VideoTitle: string
    VideoDescription: string
    PublishDate: string
    OwnerToken: string
    AccountName: string
    AccountFolowers: string
    UserFollwsAccount: boolean
    VideoLikes: number
    VideoDislikes: number
    UserLikedVideo: boolean
    UserLikedOrDislikedVideo: number
}

const getVideoData = async (VideoToken: string | null, userToken: string) => {
    const videoData = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_BACKEND}/videos-manager/get-video-data/${VideoToken}/${userToken}`)
    return {
        error: false,
        VideoFound: true,
        VideoTitle: videoData.data.VideoTitle,
        VideoDescription: videoData.data.VideoDescription,
        PublishDate: videoData.data.PublishDate,
        OwnerToken: videoData.data.OwnerToken,
        AccountName: videoData.data.AccountName,
        AccountFolowers: videoData.data.AccountFolowers,
        UserFollwsAccount: videoData.data.UserFollwsAccount,
        VideoLikes: videoData.data.VideoLikes,
        VideoDislikes: videoData.data.VideoDislikes,
        UserLikedVideo: videoData.data.UserLikedVideo,
        UserLikedOrDislikedVideo: videoData.data.UserLikedOrDislikedVideo
    }
}

//* Play/Pause
const playOrPauseVideo = (VideoState: any, videoRef: RefObject<Video>): void => {
    if (VideoState === 'Paused') {
        videoRef?.current?.playAsync()
    } else if (VideoState === 'Playing') {
        videoRef?.current?.pauseAsync()
    }
}


const followAccount = async (usrToken: string, ownerToken: string, userFollwsAccount: boolean) => {
    if (usrToken === ownerToken || usrToken == undefined || ownerToken == undefined) {
        return false
    }
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_BACKEND}/user-account/follow`, { userToken: usrToken, accountToken: ownerToken })
    return !userFollwsAccount
}

const likeVideo = async (usrToken: string, videoToken: string | null, userLikedVideo: boolean, userDisLikedVideo: boolean) => {
    if (videoToken == null) {
        return false
    }

    if ((!userLikedVideo && !userDisLikedVideo) || (!userLikedVideo && userDisLikedVideo)) {
        await axios.post(`${process.env.EXPO_PUBLIC_SERVER_BACKEND}/videos-manager/like-dislike-video`, { userToken: usrToken, videoToken: videoToken, likeOrDislike: 1 })
    } else if (userLikedVideo) {
        await axios.post(`${process.env.EXPO_PUBLIC_SERVER_BACKEND}/videos-manager/like-dislike-video`, { userToken: usrToken, videoToken: videoToken, likeOrDislike: 0 })
    }

    return !userLikedVideo
}

const dislikeVideo = async (usrToken: string, videoToken: string | null, userLikedVideo: boolean, userDisLikedVideo: boolean) => {
    if (videoToken == null) {
        return false
    }

    if ((!userLikedVideo && !userDisLikedVideo) || (userLikedVideo && !userDisLikedVideo)) {
        await axios.post(`${process.env.EXPO_PUBLIC_SERVER_BACKEND}/videos-manager/like-dislike-video`, { userToken: usrToken, videoToken: videoToken, likeOrDislike: 2 })
    } else if (userDisLikedVideo) {
        await axios.post(`${process.env.EXPO_PUBLIC_SERVER_BACKEND}/videos-manager/like-dislike-video`, { userToken: usrToken, videoToken: videoToken, likeOrDislike: 0 })
    }

    return !userDisLikedVideo
}

export type { IVideoData }
export { getVideoData, playOrPauseVideo, followAccount, likeVideo, dislikeVideo }
