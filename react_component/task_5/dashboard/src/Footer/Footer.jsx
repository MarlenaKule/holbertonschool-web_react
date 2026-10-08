import React from 'react'
import { getCurrentYear, getFooterCopy } from '../utils/utils'
import './Footer.css'

const Footer = () => {
    return (
        <div className="App-footer">
            <p>
                Copyright {getCurrentYear()} - {getFooterCopy(true)}
            </p>
        </div>
    )
}

export default Footer;