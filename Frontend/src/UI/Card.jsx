function Card (props){

    return(
        <div className= {`  ${props.width} ${props.height} rounded-md shadow-md  bg-sky-50 flex justify-center `}>
            <body>
                {props.children}
            </body>
        </div>
    )
}
export default Card;