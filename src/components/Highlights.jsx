import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { rightImg, watchImg } from "../utils"
import VideoCarousel from "./VideoCarousel"

function Highlights() {
    useGSAP(() => {
        gsap.to("#title", {
            opacity: 1,
            y: 0
        })
        gsap.to(".link", {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.25
        })
    }, [])


    return (
        <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc">
            <div className="screen-max-width">
                <div className="mb-12 w-full md:flex items-end justify-between">
                    <h1 id="title" className="section-heading">Get the highlights.</h1>
                    <div className="flex flex-wrap items-end gap-5">
                        <a className="link" href="#">
                            Watch the film
                            <img src={watchImg} alt="watch" className="ms-2" />
                        </a>
                        <a className="link" href="#">
                            Watch the film
                            <img src={rightImg} alt="right" className="ms-2" />
                        </a>
                    </div>
                </div>
                <VideoCarousel></VideoCarousel>
            </div>
        </section>
    )
}

export default Highlights