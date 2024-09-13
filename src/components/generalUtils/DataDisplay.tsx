import React, { useState, useEffect } from 'react';
import { Box, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup,
  Tabs, TabList, TabPanels, Tab, TabPanel, useColorMode
 } from '@chakra-ui/react';
import { useBrandColors } from './theme';
import useCommissionsData from '../calculatorUtils/useCommissionsDataHook';

const DataDisplay: React.FC = () => {
  const { primary, background, accent, secondary, text } = useBrandColors();
  const { commissions } = useCommissionsData();
  
  const [totalPaidCommissions, setTotalPaidCommissions] = useState(0);
  const [totalUnpaidCommissions, setTotalUnpaidCommissions] = useState(0);
  const [paidPercentage, setPaidPercentage] = useState(0);
  const [unpaidPercentage, setUnpaidPercentage] = useState(0);
  const [totalInvoicedCommissions, setTotalInvoicedCommissions] = useState(0);
  const [invoicedPercentage, setInvoicedPercentage] = useState(0);
  const [totalPaidCommissionAmount, setTotalPaidCommissionAmount] = useState(0);
  const [totalUnpaidCommissionAmount, setTotalUnpaidCommissionAmount] = useState(0);
  const [totalPaidCommissionAmountPercent, setTotalPaidCommissionAmountPercent] = useState(0);
  const [totalUnpaidCommissionAmountPercent, setTotalUnpaidCommissionAmountPercent] = useState(0);
  
  const [totalCommissionRateAmount, setTotalCommissionRateAmount] = useState(0);
  const [totalCommissionAmount, setTotalCommissionAmount] = useState(0);
    
    useEffect(() => {
      const total = commissions.reduce((acc, commission) => acc + commission.commissionRateAmount, 0);
      setTotalCommissionRateAmount(total);
    }, [commissions]);

    useEffect(() => {
      const total = commissions.reduce((acc, commission) => acc + commission.commission, 0);
      setTotalCommissionAmount(total);
    }, [commissions]);

  useEffect(() => {
    // total paid commissions rate amount
    const totalPaid = commissions.reduce((sum, commission) => {
      if (commission.paid) {
        return sum + commission.commissionRateAmount;
      }
      return sum;
    }, 0);

    // total unpaid commissions rate amount
    const totalUnpaid = commissions.reduce((sum, commission) => {
      if (!commission.paid) {
        return sum + commission.commissionRateAmount;
      }
      return sum;
    }, 0);

    const totalCommissions = totalPaid + totalUnpaid;

    setTotalPaidCommissions(totalPaid);
    setTotalUnpaidCommissions(totalUnpaid);

    // percentages of paid and unpaid commissions rate amounts
    const paidPercent = totalCommissions > 0 ? (totalPaid / totalCommissions) * 100 : 0;
    const unpaidPercent = totalCommissions > 0 ? (totalUnpaid / totalCommissions) * 100 : 0;

    setPaidPercentage(paidPercent);
    setUnpaidPercentage(unpaidPercent);
  }, [commissions]);

  useEffect(() => {
    // total invoiced commissions rate amounts
    const totalInvoiced = commissions.reduce((sum, commission) => {
      if (commission.invoiced) {
        return sum + commission.commissionRateAmount;
      }
      return sum;
    }, 0);

    setTotalInvoicedCommissions(totalInvoiced);

    // percentage of invoiced commissions, relative to total commissions
    const totalCommissions = totalPaidCommissions + totalUnpaidCommissions; // total of all commissions
    const invoicedPercent = totalCommissions > 0 ? (totalInvoiced / totalCommissions) * 100 : 0;
    
    setInvoicedPercentage(invoicedPercent);
  }, [commissions, totalPaidCommissions, totalUnpaidCommissions]);

  //total paid commission amount
  useEffect(() => {
    const totalPaid = commissions.reduce((sum, commission) => {
      if (commission.paid) {
        return sum + commission.commission;
      }
      return sum;
    }, 0);

    setTotalPaidCommissionAmount(totalPaid);
  }, [commissions]);

  //total unpaid commission amount
  useEffect(() => {
    const totalUnpaid = commissions.reduce((sum, commission) => {
      if (!commission.paid) {
        return sum + commission.commission;
      }
      return sum;
    }, 0);

    setTotalUnpaidCommissionAmount(totalUnpaid);
  }, [commissions]);

  //total invoiced commission amount
  useEffect(() => {
    const totalInvoiced = commissions.reduce((sum, commission) => {
      if (commission.invoiced) {
        return sum + commission.commission;
      }
      return sum;
    }, 0);

    setTotalPaidCommissionAmount(totalInvoiced);
  }, [commissions]);

  useEffect(() => {
    const totalCommissionsAmount = totalPaidCommissionAmount + totalUnpaidCommissionAmount;
    const totalCommissionsAmountPercent = totalCommissionsAmount > 0 ? (totalPaidCommissionAmount / totalCommissionsAmount) * 100 : 0;
    const totalCommissionsAmountUnpaidPercent = totalCommissionsAmount > 0 ? (totalUnpaidCommissionAmount / totalCommissionsAmount) * 100 : 0;

    setTotalPaidCommissionAmountPercent(totalCommissionsAmountPercent);
    setTotalUnpaidCommissionAmountPercent(totalCommissionsAmountUnpaidPercent);
  }, [totalPaidCommissionAmount, totalUnpaidCommissionAmount]);


  const { colorMode } = useColorMode();
  return (
    <Tabs  boxShadow={'0px 0px 5px 2px gray'} borderRadius={'lg'}>
      <TabList>
        <Tab fontSize="2xl" color={secondary}>Commission Rate Amount Data</Tab>
        <Tab fontSize="2xl" color={secondary}>Total Commissions Amount Data</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
      <StatGroup mt={4} gap={2}>
        <Stat boxShadow={'inset 0px 0px 5px 2px gray'} borderRadius={'lg'} p={2}>
          <StatLabel>Invoiced Commissions</StatLabel>
          <StatNumber color={ colorMode === 'light' ? 'yellow.700' : 'yellow.300'}>${totalInvoicedCommissions.toFixed(2)}</StatNumber>
          <StatHelpText>
            
            {invoicedPercentage.toFixed(2)}%
          </StatHelpText>
        </Stat>

        <Stat boxShadow={'inset 0px 0px 5px 2px gray'} borderRadius={'lg'} p={2}>
          <StatLabel>Paid Commissions</StatLabel>
          <StatNumber color={ colorMode === 'light' ? 'green.500' : 'green.300'}>${totalPaidCommissions.toFixed(2)}</StatNumber>
          <StatHelpText>
            <StatArrow color={ colorMode === 'light' ? 'green.500' : 'green.300'} type='increase' />
            {paidPercentage.toFixed(2)}%
          </StatHelpText>
        </Stat>

        <Stat boxShadow={'inset 0px 0px 5px 2px gray'} borderRadius={'lg'} p={2}>
          <StatLabel>Unpaid Commissions</StatLabel>
          <StatNumber color={ colorMode === 'light' ? 'red.500' : 'red.300'}>${totalUnpaidCommissions.toFixed(2)}</StatNumber>
          <StatHelpText>
            <StatArrow color={ colorMode === 'light' ? 'red.500' : 'red.300'} type='decrease' />
            {unpaidPercentage.toFixed(2)}%
          </StatHelpText>
        </Stat>
      </StatGroup>
      <Box mt={10} w={'80%'} ml={'auto'} mr={'auto'} textAlign={{ base: 'center', md: 'right' }}>
        <Stat>
          <StatLabel>Collected Commission Amount Rate Fees</StatLabel>
          <StatNumber color={ colorMode === 'light' ? 'green.500' : 'green.300'}>$0.00</StatNumber>
          <StatHelpText>Feb 12 - Feb 28</StatHelpText>
        </Stat>
        <Text mt={4} fontSize="lg" color={accent}>
        Total Commission Rate Amount: <Text as="b" fontSize={"xl"} color={secondary}>${totalCommissionRateAmount.toFixed(2)}</Text>
        </Text>
      </Box>
      </TabPanel>
      <TabPanel>
        <StatGroup mt={4} gap={2} >
        <Stat boxShadow={'inset 0px 0px 5px 2px gray'} borderRadius={'lg'} p={2}>
          <StatLabel>Invoiced Commission Amounts</StatLabel>
          <StatNumber color={ colorMode === 'light' ? 'yellow.700' : 'yellow.300'}>$ </StatNumber>
          <StatHelpText>
            
            %
          </StatHelpText>
        </Stat>

        <Stat boxShadow={'inset 0px 0px 5px 2px gray'} borderRadius={'lg'} p={2}>
          <StatLabel>Paid Commission Amounts</StatLabel>
          <StatNumber color={ colorMode === 'light' ? 'green.500' : 'green.300'}>${totalPaidCommissionAmount.toFixed(2)} </StatNumber>
          <StatHelpText>
            <StatArrow color={ colorMode === 'light' ? 'green.500' : 'green.300'} type='increase' />
            %{totalPaidCommissionAmountPercent.toFixed(2)}
          </StatHelpText>
        </Stat>

        <Stat boxShadow={'inset 0px 0px 5px 2px gray'} borderRadius={'lg'} p={2}>
          <StatLabel>Unpaid Commission Amounts</StatLabel>
          <StatNumber color={ colorMode === 'light' ? 'red.500' : 'red.300'}>${totalUnpaidCommissionAmount.toFixed(2)} </StatNumber>
          <StatHelpText>
            <StatArrow color={ colorMode === 'light' ? 'red.500' : 'red.300'} type='decrease' />
            %{totalUnpaidCommissionAmountPercent.toFixed(2)}
          </StatHelpText>
        </Stat>
      </StatGroup>
      <Box mt={10} w={'80%'} ml={'auto'} mr={'auto'} textAlign={{ base: 'center', md: 'right' }}>
        <Stat>
          <StatLabel>Collected Total Commission Amount Fees</StatLabel>
          <StatNumber color={ colorMode === 'light' ? 'green.500' : 'green.300'}>$0.00</StatNumber>
          <StatHelpText>Feb 12 - Feb 28</StatHelpText>
        </Stat>
        <Text mt={4} fontSize="lg" color={accent}>
        Total Commissions Amount: <Text as="b" fontSize={"xl"} color={secondary}>${totalCommissionAmount.toFixed(2)}</Text>
        </Text>
      </Box>
      
      </TabPanel>
      </TabPanels>

      
    </Tabs>
  );
};

export default DataDisplay;
