import packageJson from '../../package.json' assert { type: 'json' };
const version = packageJson.version;

export function Footer() {
    return (
        <footer className="flex justify-between bg-theme-light dark:bg-darkmode-theme-light">
            Shina Mix
            <div>
                ©&nbsp;{new Date().getFullYear()}<span className="hidden md:inline">. All rights reserved. {version}</span>
            </div>
        </footer>  
    );
}
