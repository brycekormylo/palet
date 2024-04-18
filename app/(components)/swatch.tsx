
type SwatchProps = {
    color: string
}

const Swatch = (props: SwatchProps) => {
    return (
        <div 
            className={`z-10 h-10 w-10 rounded-md`}
            style={{
                background: `${props.color}`
            }}
        ></div>
    )
}

export default Swatch