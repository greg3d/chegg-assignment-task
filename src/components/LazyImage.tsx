
interface ImageProps {
    src: string,
    fallback: string,
    alt: string,
    size?: {
        w: number,
        h: number
    }
}

const LazyImage = ({src, alt, fallback}: ImageProps) => {
    return (
        <img
            src={src}
            alt={alt}
            loading={"lazy"}
            onError={e => {
                const img = e.target as HTMLImageElement
                img.onerror = null
                img.src = fallback
            }}
        />
    )
}

export default LazyImage