import React, { useState } from 'react';
import { Box, Button, Heading, Text, Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/react';
import useClientData from './UseClientDataHook';
import { useBrandColors } from '../generalUtils/theme';
import ClosableBox2 from '../generalUtils/ClosableBox2';
import { EditIcon } from '@chakra-ui/icons';
import SearchClients from './SearchClients';
import { newClientFormData } from '../generalUtils/interfaces';

const ViewClients: React.FC = () => {
    const { primary, background, secondary, accent } = useBrandColors();
    const { clientData } = useClientData();

    const [filteredClients, setFilteredClients] = useState<newClientFormData[]>(clientData);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (searchTerm: string, filtered: newClientFormData[]) => {
        setSearchTerm(searchTerm);
        setFilteredClients(filtered);
    };

    const clientsToDisplay = searchTerm ? filteredClients : clientData;

    return (
        <Box>
            <SearchClients clientData={clientData} onSearch={handleSearch} />

            {clientsToDisplay.map((client) => (
                <ClosableBox2
                    key={client.id}
                    title={client.clientName + "'s details"}
                    buttonText={`${client.clientName} | Booking #: ${client.bookingNumber} | Date Created: ${client.dateCreated}`}
                    onClose={() => console.log('Close button clicked')}
                    onOpen={() => console.log('Open button clicked')}
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
                            <Text fontSize={"2xl"}  overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}><Text as={"span"}  overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Client:</Text> {client.clientName}</Text>
                            <Text fontSize={"2xl"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}><Text as={"span"} overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Supplier:</Text> {client.supplier}</Text>
                            <Text fontSize={"2xl"}  overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}><Text as={"span"}  overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Booking #:</Text> {client.bookingNumber}</Text>
                            <Text fontSize={"2xl"}  overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}><Text as={"span"}  overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Notes:</Text> {client.notes}</Text>
                            <Text fontSize={"2xl"}  overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}><Text as={"span"}  overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Invoiced?</Text> {client.invoiced ? "Yes" : "No"} </Text>
                            <Text fontSize={"2xl"}  overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}><Text as={"span"}  overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Final Payment Date:</Text> {client.finalPaymentDate}</Text>
                            <Text fontSize={"2xl"}  overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}><Text as={"span"}  overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Paid:</Text> {client.paid ? "Yes" : "No"}</Text>
                            <Text fontSize={"2xl"}  overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }}><Text as={"span"}  overflowWrap={"break-word"} wordBreak={"break-word"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={secondary}>Payment Date:</Text> {client.paymentDate}</Text>
                            <Text fontSize={"lg"}   display={{ base: 'block', md: 'inline' }} mt={10}><Text as={"span"} display={{ base: 'block', md: 'inline' }} fontSize={"lg"} color={accent}>Client Creation Date:</Text> {client.dateCreated}</Text>
                        </CardBody>
                        <CardFooter w={'100%'}>
                            <Box 
                                display={'flex'} 
                                w={'100%'}
                                flexDirection={{ base: 'column', md: 'row' }}
                                justifyContent={{ base: 'center', md: 'space-between' }}
                                alignItems={{ base: 'center', md: 'flex-start' }}
                                p={4}
                            >
                                <Button
                                    bg={primary}
                                    color={secondary}
                                    boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                                    _hover={{ bg: accent, color: primary }}
                                    _active={{ bg: accent }}
                                    position="relative"
                                    mb={{ base: 8, md: 0 }}
                                >
                                    Commission Calculator
                                </Button>
                                <Button
                                    bg={primary}
                                    color={secondary}
                                    boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                                    _hover={{ bg: accent, color: primary }}
                                    _active={{ bg: accent }}
                                    position="relative"
                                >
                                    <EditIcon />
                                </Button>
                            </Box>
                        </CardFooter>
                    </Card>
                </ClosableBox2>
            ))}
        </Box>
    );
};

export default ViewClients;
