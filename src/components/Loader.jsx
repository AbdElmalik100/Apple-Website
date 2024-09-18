import { Html } from "@react-three/drei"

function Loader() {
    return (
        <Html>
            <div className="absolute top-0 left-0 w-full h-full grid place-items-center">
                <div className="rounded-full w-[10vw] h-[10vw]">Loading...</div>
            </div>
        </Html>
    )
}

export default Loader