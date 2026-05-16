import React, { useEffect, useState } from 'react'
import Service from '../../utils/http.js'
import { Button, Modal, Table, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
export const UrlHistory = () => {
   const service = new Service();
   const [opened, { open, close }] = useDisclosure(false);
   const [updatedData, setUpdatedData] = useState({});
   const [data, setData] = useState([]);
   const [shortCode, setShortCode] = useState("");

   const handleUpdate = (element) => {
       setShortCode(element.shortCode);
       setUpdatedData({
           originalUrl: element.originalUrl,
           title: element.title,
       });
       open();
   }
   const updateRecord = async (code, payload) => {
       try {
           const response = await service.patch(`s/${code}`, payload);
           console.log(response);
       } catch (error) {
           console.error(error.message);
       }
   }
   const handleSubmit = async () => {
       await updateRecord(shortCode, updatedData);
       close();
       await fetchHistory();
   }
   const fetchHistory = async () => {
       try {
           const response = await service.get("user/my/urls");
           console.log(response.shortURLs);
           setData(response.shortURLs);
       } catch (error) {
           console.error(error);
       }
   }




   useEffect(() => {
       fetchHistory();
   }, []);


   return (
       <div>
           <Table highlightOnHover >
               <Table.Thead>
                   <Table.Tr>
                       <Table.Th>Original URL</Table.Th>
                       <Table.Th>Short Code</Table.Th>
                       <Table.Th>Click Count</Table.Th>
                       <Table.Th>Created At</Table.Th>
                       <Table.Th>Expires At</Table.Th>
                       <Table.Th>Actions</Table.Th>
                   </Table.Tr>
               </Table.Thead>
               <Table.Tbody>{data.map((element) => (
               <Table.Tr key={element._id}>
                   <Table.Td>{element.originalUrl}</Table.Td>
                   <Table.Td>{element.shortCode}</Table.Td>
                   <Table.Td>{element.clickCount}</Table.Td>
                   <Table.Td>{element.createdAt}</Table.Td>
                   <Table.Td>{element.expiresAt}</Table.Td>
                   <Table.Td><Button variant="filled" size="xs" radius="sm" onClick={() => handleUpdate(element)}>Edit</Button></Table.Td>
               </Table.Tr>
           ))}</Table.Tbody>
           </Table>
           <Modal opened={opened} onClose={close} title="Edit URL : ">
               <TextInput
                   defaultValue={updatedData.originalUrl}
                   label="Enter new URL"
                   onChange={(e) => {
                       setUpdatedData({ ...updatedData, originalUrl: e.target.value });
                   }}
                   placeholder="Input placeholder"
               />
               <TextInput
                   defaultValue={updatedData.title}
                   label="Enter New Title"
                   placeholder="Input placeholder"
                   onChange={(e) => {
                       setUpdatedData({ ...updatedData, title: e.target.value });
                   }}
               />
               <Button variant="filled" onClick={handleSubmit}>Update</Button>
           </Modal>
       </div>
   )
}
