import React, { useState } from 'react';
import { Box, Button, Heading, Text, Card, CardBody, CardFooter, CardHeader, SimpleGrid } from '@chakra-ui/react';
import useClientData from './UseClientDataHook';
import { useBrandColors } from '../generalUtils/theme';
import ClosableBox3 from '../generalUtils/ClosableBox3';
import ClosableBox from '../generalUtils/ClosableBox';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import SearchClients from './SearchClients';
import { newClientFormData } from '../generalUtils/interfaces';
import EditClientForm from './EditClientForm';
import CheckboxComponent from '../generalUtils/Checkboxes';
import BookingForm from './BookingForm';
import ClientBookings from '../bookingFormUtils/displayBookingsData';

const ViewClients: React.FC = () => {
    const { primary, background, secondary, accent } = useBrandColors();
    const { clientData, updateClientData } = useClientData();

    const [filteredClients, setFilteredClients] = useState<newClientFormData[]>(clientData);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [editingClient, setEditingClient] = useState<newClientFormData | null>(null);

    const handleSearch = (searchTerm: string, filtered: newClientFormData[]) => {
        setSearchTerm(searchTerm);
        setFilteredClients(filtered);
    };

    const handleEditClick = (client: newClientFormData) => {
        setEditingClient(client);
    };

    const handleCancelEdit = () => {
        setEditingClient(null);
    };

    const handleDeleteClick = (client: newClientFormData) => {
    if (window.confirm(`Are you sure you want to delete ${client.clientName}?`)) {
        const updatedClients = clientData.filter((c) => c.id !== client.id);
        localStorage.setItem('ClientList', JSON.stringify(updatedClients));
        updateClientData(updatedClients);
    }
};


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (editingClient) {
            const target = e.target as HTMLInputElement | HTMLTextAreaElement;
            const { id, value, type } = target;
            const checked = 'checked' in target ? (target as HTMLInputElement).checked : undefined;
            setEditingClient({
                ...editingClient,
                [id]: type === 'checkbox' ? checked : value
            });
        }
    };

    const handleSubmitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingClient) {
            const updatedClients = clientData.map(client =>
                client.id === editingClient.id ? editingClient : client
            );
            localStorage.setItem('ClientList', JSON.stringify(updatedClients));
            updateClientData(updatedClients);
            setEditingClient(null);
        }
    };

    const handleInvoicedChange = (id: number, isChecked: boolean) => {
        const updatedClients = clientData.map(client =>
            client.id === id ? { ...client, invoiced: isChecked } : client
        );
        localStorage.setItem('ClientList', JSON.stringify(updatedClients));
        updateClientData(updatedClients);
    };

    const handlePaidChange = (id: number, isChecked: boolean) => {
        const updatedClients = clientData.map(client =>
            client.id === id ? { ...client, paid: isChecked } : client
        );
        localStorage.setItem('ClientList', JSON.stringify(updatedClients));
        updateClientData(updatedClients);
    };

    const clientsToDisplay = searchTerm ? filteredClients : clientData;
    const reversedClientsToDisplay = [...clientsToDisplay].reverse();

    return (
        <Box>
            <SearchClients clientData={clientData} onSearch={handleSearch} />

            {reversedClientsToDisplay.map((client) => (
                <ClosableBox3
                    key={client.id}
                    title={client.clientName + "'s details"}
                    buttonText={` ${client.clientName}  | ${client.clientEmail} | ID: ${client.id} | Added on ${client.dateCreated}`}
                    onClose={() => console.log('Close button clicked')}
                    onOpen={() => console.log('Open button clicked')}
                    checkboxes={
                        <CheckboxComponent
                            id={client.id}
                            invoicedChecked={client.invoiced}
                            paidChecked={client.paid}
                            onInvoicedChange={handleInvoicedChange}
                            onPaidChange={handlePaidChange}
                            
                        />
                    }
                >
                    <Card
                        bg={background}
                        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                        borderRadius="lg"
                        p={4}
                        mt={4}
                        position="relative"
                        minW={'200px'}
                        maxW={'100%'}
                        w={'auto'}
                        ml={{ base: 'auto', md: 0 }}
                        mr={{ base: 'auto', md: 0 }}
                        display={'flex'}
                        flexDirection={{ base: 'column', md: 'column' }}
                        justifyContent={{ base: 'center', md: 'left' }}
                        alignItems={{ base: 'center', md: 'flex-start' }}
                    >
                        <CardHeader>
                            <Heading size="md">{client.clientName}</Heading>
                        </CardHeader>
                        <CardBody
                            display={'flex'}
                            flexDirection={{ base: 'column', md: 'column' }}
                            justifyContent={{ base: 'center', md: 'left' }}
                            alignItems={{ base: 'center', md: 'flex-start' }}
                        >
                            <BookingForm clientId={client.id} />
                            <ClientBookings clientId={client.id} />

                            <ClosableBox
                                title={client.clientName + "'s details"}
                                onClose={() => console.log('Close button clicked')}
                                onOpen={() => console.log('Open button clicked')}
                                buttonText={` View More Details `}
                            >
                                
                                <SimpleGrid mt={4} 
                                columns={{ base: 1, md: 2 }}
                                textAlign={"left"}
                                >
                                    <Text fontSize={"xl"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}>
                                        <Text as={"span"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Name:</Text> {client.clientName}
                                    </Text>

                                    <Text fontSize={"xl"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}>
                                        <Text as={"span"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Email:</Text> {client.clientEmail}
                                    </Text>
                                    <Text fontSize={"xl"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}>
                                        <Text as={"span"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Phone #:</Text> {client.clientPhone}
                                    </Text>
                                    <Text fontSize={"xl"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}>
                                        <Text as={"span"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Postal Code:</Text> {client.clientPostalCode}
                                    </Text>
                                    <Text fontSize={"xl"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}>
                                        <Text as={"span"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Street Address:</Text> {client.clientStreetAddress}
                                    </Text>
                                    <Text fontSize={"xl"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}>
                                        <Text as={"span"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>City:</Text> {client.clientCity}
                                    </Text>
                                    <Text fontSize={"xl"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}>
                                        <Text as={"span"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Province:</Text> {client.clientProvince}
                                    </Text>
                                    <Text fontSize={"xl"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}>
                                        <Text as={"span"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Country:</Text> {client.clientCountry}
                                    </Text>
                                    
                                    <Text fontSize={"2xl"} color={'blue.300'} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}>
                                        <Text as={"span"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Notes:</Text> {client.notes}
                                    </Text>
                                    <Text fontSize={"2xl"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}>
                                        <Text as={"span"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Invoiced?</Text> {client.invoiced ? "Yes" : "No"}
                                    </Text>
                                    <Text fontSize={"2xl"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}>
                                        <Text as={"span"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Final Payment Date:</Text> {client.finalPaymentDate}
                                    </Text>
                                    <Text fontSize={"2xl"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}>
                                        <Text as={"span"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Paid?</Text> {client.paid ? "Yes" : "No"}
                                    </Text>
                                    <Text fontSize={"2xl"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}>
                                        <Text as={"span"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Payment Date:</Text> {client.paymentDate}
                                    </Text>
                                    <Text color={accent} fontSize={"lg"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}>
                                        <Text as={"span"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={accent}>Client Creation Date:</Text> {client.dateCreated}
                                    </Text>
                                    <Text color={accent} fontSize={"lg"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}>
                                        <Text as={"span"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={accent}>id:</Text> {client.id}
                                    </Text>
                                    <Box
                                display={"flex"}
                                flexDirection={{ base: "column", md: "row" }}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                gap={{ base: 4, md: 4 }}
                                
                                
                            >
                                <Button
                                    variant={"outline"}
                                    color={accent}
                                    outlineColor={accent}
                                    onClick={() => handleEditClick(client)}
                                    leftIcon={<EditIcon />}
                                    m={2}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant={"outline"}
                                    color={"red.400"}
                                    outlineColor={"red.400"}
                                    onClick={() => handleDeleteClick(client)}
                                    leftIcon={<DeleteIcon />}
                                    m={2}
                                >
                                    Delete Client
                                </Button>
                            </Box>
                                </SimpleGrid>
                                
                                {editingClient && editingClient.id === client.id && (
                                <EditClientForm
                                    client={editingClient}
                                    onChange={handleChange}
                                    onSubmit={handleSubmitEdit}
                                    onCancel={handleCancelEdit}
                                />
                            )}
                            </ClosableBox>
                            
                        </CardBody>
                        <CardFooter w={"100%"} p={4} display={"flex"} flexDirection={{ base: "column", md: "row" }} justifyContent={{ base: "center", md: "left" }} alignItems={{ base: "center", md: "flex-start" }} gap={{ base: 4, md: 0 }}>
                            <Box
                                display={"flex"}
                                flexDirection={{ base: "column", md: "row" }}
                                justifyContent={{ base: "center", md: "left" }}
                                alignItems={"center"}
                                gap={{ base: 2, md: 4 }}
                                
                                w={"100%"}

                            >
                                
                                

                                <Button
                                    bg={secondary}
                                    color={primary}
                                    _hover={{ bg: primary, color: accent}}
                                >
                                    Commission Calculator
                                </Button>
                            </Box>
                            
                        </CardFooter>
                    </Card>
                </ClosableBox3>
            ))}
        </Box>
    );
};

export default ViewClients;
