import { ScrollView, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { View } from '../../components/Themed'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import Comment from '../../components/VideoPlayer/CommentSection/Comment'

interface ICommentProps {
    ownerToken: string
    videoToken: string
    comment: string
    ownerName: string
}

const VideoComment = () => {
    const { VideoToken }: { VideoToken: string } = useLocalSearchParams()
    const [videoComments, setVideoComments] = useState<Array<ICommentProps>>([])
    const [hasComments, setHasComments] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            const getCommentsForVideo = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_BACKEND}/videos-manager/get-video-comments/${VideoToken}`)
            if (getCommentsForVideo.data.CommentsFound === true) {
                setHasComments(true)
                setVideoComments(getCommentsForVideo.data.comments)
            }
        })()
    }, [])

    return (
        <ScrollView className="flex w-full h-full bg-[#333333]">
            {hasComments ? (
                <View>
                    {videoComments.map((comment: ICommentProps, index: number) => (
                        <Comment key={index} ownerToken={comment.ownerToken} comment={comment.comment} ownerName={comment.ownerName} />
                    ))}
                </View>
            ) : null}
        </ScrollView>
    )
}

export default VideoComment
