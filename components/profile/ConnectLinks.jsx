import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkIcon from '@mui/icons-material/Link';

const ConnectLinks = ({ user }) => {
    return (
        <div>
            {user?.personal && (
                <div className="mb-2" style={{ fontSize: "0.9rem", color: '#4a5159' }}>
                    <b>
                        <LinkIcon style={{ marginBottom: "4px" }} /> &nbsp;
                        <u>
                            <Link href={user?.personal} passHref={true}>{user?.personal}</Link>
                        </u>
                    </b>
                </div>
            )}

            {user?.github && (
                <div className="mb-2" style={{ fontSize: "0.9rem", color: '#4a5159' }}>
                    <b>
                        <GitHubIcon style={{ marginBottom: "4px" }} /> &nbsp;
                        <u>
                            <Link href={user?.github} passHref={true}>{user?.github}</Link>
                        </u>
                    </b>
                </div>
            )}

            {user?.twitter && (
                <div className="mb-2" style={{ fontSize: "0.9rem", color: '#4a5159' }}>
                    <b>
                        <TwitterIcon style={{ marginBottom: "4px" }} /> &nbsp;
                        <u>
                            <Link href={user?.twitter} passHref={true}>{user?.twitter}</Link>
                        </u>
                    </b>
                </div>
            )}
        </div>
    );
}

export default ConnectLinks;