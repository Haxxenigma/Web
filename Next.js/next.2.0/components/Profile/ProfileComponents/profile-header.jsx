import Link from 'next/link';
import Image from 'next/image';
import { Mail, Settings, UserPlus } from 'lucide-react';

export default function ProfileHeader({ styles, user, state }) {
    return (
        <div className={styles.profileHeader}>
            <div className={styles.profileImage}>
                <Image src={user.image} alt='' width={60} height={60} />
            </div>
            <div className={styles.profileInfo}>
                <div className={styles.profileName}>
                    <span>{user.name}</span>
                </div>
                <div className={styles.profileBirth}>
                    <span>{user.birth}</span>
                </div>
            </div>
            {state.user && (
                <div className={styles.profileActions}>
                    <Link className={styles.profileMail} href={`/users/${user.name}/mail`}>
                        <Mail size={32} />
                    </Link>
                    {state.user.name === user.name && (
                        <Link className={styles.profileSettings} href={`/users/${user.name}/settings`}>
                            <Settings size={32} />
                        </Link>
                    )}
                    {state.user.name !== user.name && (
                        <Link className={styles.profileFriends} href={`/api/friends/${user.name}`}>
                            <UserPlus size={32} />
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}