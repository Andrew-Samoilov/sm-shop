import packageJson from '../../package.json' assert { type: 'json' };
import { Logo } from './logo';
const version = packageJson.version;

export function Footer() {
    return (
        <footer className="flex justify-between bg-theme-light dark:bg-darkmode-theme-light">
            <Logo text={'Шина Мікс'}/>

            <div>
                ©&nbsp;{new Date().getFullYear()}<span className="hidden md:inline">. All rights reserved. {version}</span>
            </div>
        </footer>
    );
}
