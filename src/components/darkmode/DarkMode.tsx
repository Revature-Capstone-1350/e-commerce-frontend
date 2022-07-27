import '../../css/DarkMode.css';
import Switch from '@mui/material/Switch';
import { ChangeEventHandler } from 'react';

/**
 *Sets 'theme' to 'dark' in localStorage,
 *Updates 'data-theme' attribute to dark
 */
const setDark = () => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
};

/**
 *Sets 'theme' to 'light' in localStorage
 *Updates 'data-theme' attribute to dark
 */
const setLight = () => {
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
};

// Retrieves 'theme' from localStorage
const storedTheme = localStorage.getItem('theme');

// If theme is 'dark', setDark function is called
if (storedTheme === 'dark') {
    setDark();
}

/**
 * Toggles 'theme' between 'dark' and 'light'
 *
 * @param {ChangeEventHandler} e event listener 
 */
const toggleTheme: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
        setDark(); // If toggle is checked, setDark function is called
    } else {
        setLight(); // If toggle is unchecked, setLight function is called
    }
};

const DarkMode = () => {
    return (
        <div className='toggle-theme-wrapper'>
            <span>☀️</span>
            {/* Toggle switch */}
            <Switch
                role='switch'
                defaultChecked={storedTheme === 'dark' ? true : false} // If theme is 'dark', set defaultChecked to true
                onChange={toggleTheme} // Toggles 'theme' between 'dark' and 'light'
                inputProps={{ 'aria-label': 'controlled' }}
            />
            <span>🌑</span>
        </div>
    );
};

export default DarkMode;
