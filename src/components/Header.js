import { useLocation } from 'react-router';
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {
    const location = useLocation()
    return(
        <header className='header'>
            <h1>{ title }</h1>
            { location.pathname === '/' && <Button 
                color={showAdd ? 'black' : 'green'} 
                text={showAdd? 'Close' : 'Add New'} 
                onClick={onAdd} />}
            {/* <Button color='blue' text='Add New'/> */}
        </header>
    )
}

// default props
// Header.defaultProps = {
//     title: 'Task Manager'
// }


export default Header;