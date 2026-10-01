import './Notifications.css';
import closeIcon from '../assets/close-button.png';
import { getLatestNotification } from '../utils/utils';

function Notifications() {
    return (
        <div className='Notifications'>
            <button style={{
                background: 'transparent',
                position: 'absolute',
                right: 20,
                border: 'none'
            }} aria-label='Close' onClick={console.log('Close button has been clicked')}><img src={closeIcon} alt='Close icon' /></button>
            <p>Here is the list of notifications</p>
            <ul>
                <li data-priority='default'>New course available</li>
                <li data-priority='urgent'>New resume available</li>
                <li data-priority='urgent' dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
            </ul>
        </div>
    )
}

export default Notifications;