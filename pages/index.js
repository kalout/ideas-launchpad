import { Container } from '@material-ui/core';
import Head from 'next/head';

const Index = () => {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Container maxWidth="lg" className="p-3">
                <h1>Home</h1>
            </Container>
        </>
    );
}

export default Index;