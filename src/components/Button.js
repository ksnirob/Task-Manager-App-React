const Button = ({ color, text,  onClick}) => {

    return (
        <button onClick={onClick} style={{ background: color, color: 'white' }} className='btn'>{text}</button>
    )
}

export default Button