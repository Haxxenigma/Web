import styles from './settings.module.scss';
import prisma from '@/configs/prisma';
import SettingsNav from '@/components/Settings/settings-nav';

export default async function SettingsLayout({ children, params }) {
    const user = await prisma.Users.findUnique({
        where: {
            name: params.user,
        },
    });

    return (
        <div className={styles.settingsLayout}>
            <SettingsNav styles={styles} user={user} />
            <div className={styles.settingsCnt}>
                {children}
            </div>
        </div>
    );
}