import { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import gsap from 'gsap'
import { pauseImg, playImg, replayImg } from '../utils'
import { useGSAP } from '@gsap/react'

function VideoCarousel() {
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        isLastVideo: false,
        isPlaying: false,
        videoId: 0,
    })
    const [loadedData, setLoadedData] = useState([])

    const { isEnd, startPlay, isLastVideo, isPlaying, videoId } = video


    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause()
            } else {
                startPlay && videoRef.current[videoId].play()
            }
        }
    }, [startPlay, isPlaying, videoId, loadedData])

    const handleLoadedMetadata = (index, event) => setLoadedData(prev => [...prev, event])

    useEffect(() => {
        let currentProgress = 0
        let span = videoSpanRef.current

        if (span[videoId]) {
            // animate the progress of the video
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100)
                    if (progress !== currentProgress) {
                        currentProgress = progress
                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760 
                                ? '10vw'
                                : window.innerWidth < 1200
                                    ? '10vw'
                                    : '4vw'
                        })
                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: "white"
                        })
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: "12px"
                        })
                        gsap.to(span[videoId], {
                            backgroundColor: "#afafaf"
                        })
                    }
                }
            })
            if(videoId === 0) {
                anim.restart()
            }
            const animUpdate = () => {
                anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
            }
            if (isPlaying) {
                gsap.ticker.add(animUpdate)
            } else gsap.ticker.remove(animUpdate)
        }
    }, [videoId, startPlay])



    const handleProcess = (type, index) => {
        switch (type) {
            case 'video-end':
                setVideo(prevVideo => ({ ...prevVideo, isEnd: true, videoId: index + 1 }))
                break;
            case 'video-last':
                setVideo(prevVideo => ({ ...prevVideo, isLastVideo: true }))
                break;
            case 'video-reset':
                setVideo(prevVideo => ({ ...prevVideo, isLastVideo: false, videoId: 0 }))
                break;
            case 'play':
                setVideo(prevVideo => ({ ...prevVideo, isPlaying: !prevVideo.isPlaying }))
                break;
            case 'pause':
                setVideo(prevVideo => ({ ...prevVideo, isPlaying: !prevVideo.isPlaying }))
                break;
            default:
                return video
        }
    }

    useGSAP(() => {
        gsap.to("#slider", {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: "power2.inOut"
        })
        gsap.to("#video", {
            scrollTrigger: {
                trigger: "#video",
                toggleActions: "restart none none none"
            },
            onComplete: () => setVideo(prev => ({ ...prev, startPlay: true, isPlaying: true }))
        })
    }, [isEnd, videoId])

    return (
        <>
            <div className='flex items-center'>
                {hightlightsSlides.map((list, index) => (
                    <div className='sm:pr-20 pr-10' key={list.id} id='slider'>
                        <div className='video-carousel_container'>
                            <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                                <video
                                    id='video'
                                    playsInline={true}
                                    preload='auto'
                                    muted
                                    ref={el => videoRef.current[index] = el}
                                    onPlay={() => setVideo(prevVideo => ({ ...prevVideo, isPlaying: true }))}
                                    onLoadedMetadata={e => handleLoadedMetadata(e, index)}
                                    onEnded={() => index !== 3 ? handleProcess('video-end', index) : handleProcess('video-last')}
                                >
                                    <source src={list.video} type='video/mp4' />
                                </video>
                            </div>
                            <div className='absolute top-12 left-[5%] z-10'>
                                {list.textLists.map((text, index) => (
                                    <p key={index} className='text-xl md:text-2xl font-medium'>
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='relative flex-center mt-10'>
                <div className='flex-center py-5 px-7 bg-gray-300 rounded-full backdrop-blur'>
                    {
                        videoRef.current.map((_, index) => (
                            <span
                                key={index}
                                ref={el => videoDivRef.current[index] = el}
                                className='mx-2 w-3 h-3 rounded-full relative cursor-pointer bg-gray-200'
                            >
                                <span
                                    ref={el => videoSpanRef.current[index] = el}
                                    className='absolute h-full w-full rounded-full'
                                ></span>
                            </span>
                        ))
                    }
                </div>
                <button className='control-btn'>
                    <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
                        onClick={isLastVideo ? () => handleProcess('video-reset') : !isPlaying ? () => handleProcess('play') : () => handleProcess('pause')}
                    />
                </button>
            </div>
        </>
    )
}

export default VideoCarousel