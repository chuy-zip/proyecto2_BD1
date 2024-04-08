function ImageCard({source, alternative}) {
    return (
        <div className="imageBack">
            <img src={source} alt={alternative} id="mainLogo"/>
        </div>
    )
}

export default ImageCard