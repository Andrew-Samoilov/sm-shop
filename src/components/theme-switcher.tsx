'use client'
import { useTheme } from ".";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    if (process.env.NODE_ENV === 'development') {
        console.info('ThemeSwitcher rendered', theme);
    }
    
    return (
        <button suppressHydrationWarning
            onClick={toggleTheme}
            aria-label={`Перемикач теми: ${theme === 'light' ? 'увімкнути темну тему' : 'увімкнути світлу тему'}`}
        >
            {theme === 'light' ?
                <MoonIcon className="h-5 w-5" /> :
                <SunIcon className="h-5 w-5" />
            }
        </button>
    );
};
