import Service from '../../utils/http';
import { useState, useEffect } from 'react';
import { Avatar, Container, Stack, Text } from '@mantine/core';
export default function Profile_page() {
    const service = new Service();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
        try {
            const response = await service.get("user/me");
            setUser(response);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
            setLoading(false);
        }       

    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }


        return (
 <Container>
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                align="center"
                justify="center"
                gap="lg"
            >
                <Avatar src={user.avatar} size={150} radius={150} alt="it's me" />
                <Text> {user.name}</Text>
                <Text> {user.email}</Text>
                <Text>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</Text>
            </Stack>
        </Container>
    
    )
}

