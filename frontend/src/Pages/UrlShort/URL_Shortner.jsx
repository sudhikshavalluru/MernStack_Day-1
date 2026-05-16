import { Button, Stack } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { TextInput } from '@mantine/core';
import Service from "../../utils/http";

export const URL_Shortner = () => {
    const [data, setData] = useState({});
    const [shortUrl, setShortUrl] = useState("");
    const service = new Service();
    const handleSubmit = async () => {
        try {
            const response = await service.post("s", data);
            const base = service.getBaseURL();
            setShortUrl(`${base}/api/s/${response.shortCode}`);
        }
        catch (error) {
            console.error('Error creating short URL:', error.message);
        }
    }
    useEffect(() => {
        console.log("Short URL created:", {shortUrl});
    }, [shortUrl]);
  return (
    <> {(shortUrl && shortUrl.length > 0) ? <p>{shortUrl}</p> :
    <Stack>
       <TextInput
      size="lg"
      label="Original URL"
      withAsterisk
      placeholder="paste your original url"
      onChange = {(event) =>
      {
        setData(prev => ({...prev, originalUrl: event.target.value}));
      }}
     
    />
       <TextInput
        size="lg"
      label="Custom URL (optional)"
      placeholder="Customize your short URL"
      onChange = {(event) =>
      {
        setData(prev => ({...prev, customUrl: event.target.value}));
      }}
      
    />
       <TextInput
      size="lg"
      label="Title (optional)"
      placeholder="Add a title for your URL"
      onChange = {(event) =>
      {
        setData(prev => ({...prev, title: event.target.value}));
      }}
      
    />
    <Button variant="filled" size="lg" onClick={handleSubmit}>
      Submit
    </Button>
  </Stack>
}
    </>
  )
}

export default URL_Shortner;