import React, { useEffect } from 'react';
import Router from 'next/router';

const Index = () => {
    useEffect(() => !localStorage?.getItem('profile') && Router.push('/auth'), []);

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}

export default Index;