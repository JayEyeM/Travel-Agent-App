import React, { useState, useEffect } from 'react';
import { Box, Text, Heading, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup, useColorMode, ResponsiveValue } from '@chakra-ui/react';
import { useBrandColors } from './theme';
import useCommissionsData from '../calculatorUtils/useCommissionsDataHook';

interface CommissionRateAmountDataDisplayProps {
  width?: ResponsiveValue<string>; // This allows both strings and responsive objects
  marginLeft?: ResponsiveValue<string>;
  marginRight?: ResponsiveValue<string>;
  marginTop?: ResponsiveValue<string>;
  marginBottom?: ResponsiveValue<string>;
}

const CommissionRateAmountDataDisplay: React.FC<CommissionRateAmountDataDisplayProps> = ({
  width = '100%',
  marginLeft = 'auto',
  marginRight = 'auto',
  marginTop = '0',
  marginBottom = '0',
}) => {
  const { primary, background, accent, secondary, text } = useBrandColors();
  const { commissions } = useCommissionsData();
  
  const [totalPaidCommissions, setTotalPaidCommissions] = useState(0);
  const [totalUnpaidCommissions, setTotalUnpaidCommissions] = useState(0);
  const [paidPercentage, setPaidPercentage] = useState(0);
  const [unpaidPercentage, setUnpaidPercentage] = useState(0);
  const [totalInvoicedCommissions, setTotalInvoicedCommissions] = useState(0);
  const [invoicedPercentage, setInvoicedPercentage] = useState(0);
  const [totalCommissionRateAmount, setTotalCommissionRateAmount] = useState(0);

  useEffect(() => {
    const totalPaid = commissions.reduce((sum, commission) => commission.paid ? sum + commission.commissionRateAmount : sum, 0);
    const totalUnpaid = commissions.reduce((sum, commission) => !commission.paid ? sum + commission.commissionRateAmount : sum, 0);
    const totalInvoiced = commissions.reduce((sum, commission) => commission.invoiced ? sum + commission.commissionRateAmount : sum, 0);
    
    setTotalPaidCommissions(totalPaid);
    setTotalUnpaidCommissions(totalUnpaid);
    setTotalInvoicedCommissions(totalInvoiced);

    const totalCommissions = totalPaid + totalUnpaid;
    setPaidPercentage(totalCommissions > 0 ? (totalPaid / totalCommissions) * 100 : 0);
    setUnpaidPercentage(totalCommissions > 0 ? (totalUnpaid / totalCommissions) * 100 : 0);
    setInvoicedPercentage(totalCommissions > 0 ? (totalInvoiced / totalCommissions) * 100 : 0);

    const totalCommissionRateAmount = commissions.reduce((sum, commission) => sum + commission.commissionRateAmount, 0);

    setTotalCommissionRateAmount(totalCommissionRateAmount);
  }, [commissions]);

  const { colorMode } = useColorMode();

  const safeToFixed = (value: number, decimals: number = 2) => {
    return Number.isFinite(value) ? value.toFixed(decimals) : '0.00';
  };

  return (
    <Box
      w={width}
      ml={marginLeft}
      mr={marginRight}
      mt={marginTop}
      mb={marginBottom}
      boxShadow={'0px 0px 5px 2px gray'}
      p={2}
      borderRadius={'lg'}
    >
      <Heading color={accent} as="h1" size="lg" mb={4}>
        Commission Rate Amount Summary
      </Heading>
      <Text color={text} fontSize={'lg'}>
        Commission Rate Amount Summary of all existing commissions.
      </Text>
      <StatGroup mt={4} gap={2}>
        <Stat boxShadow={'inset 0px 0px 5px 2px gray'} borderRadius={'lg'} p={2}>
          <StatLabel>Invoiced</StatLabel>
          <StatNumber color={colorMode === 'light' ? 'yellow.700' : 'yellow.300'}>
            ${safeToFixed(totalInvoicedCommissions)}
          </StatNumber>
          <StatHelpText>{safeToFixed(invoicedPercentage)}%</StatHelpText>
        </Stat>
        <Stat boxShadow={'inset 0px 0px 5px 2px gray'} borderRadius={'lg'} p={2}>
          <StatLabel>Paid</StatLabel>
          <StatNumber color={colorMode === 'light' ? 'green.500' : 'green.300'}>
            ${safeToFixed(totalPaidCommissions)}
          </StatNumber>
          <StatHelpText>
            <StatArrow color={colorMode === 'light' ? 'green.500' : 'green.300'} type="increase" />
            {safeToFixed(paidPercentage)}%
          </StatHelpText>
        </Stat>
        <Stat boxShadow={'inset 0px 0px 5px 2px gray'} borderRadius={'lg'} p={2}>
          <StatLabel>Unpaid</StatLabel>
          <StatNumber color={colorMode === 'light' ? 'red.500' : 'red.300'}>
            ${safeToFixed(totalUnpaidCommissions)}
          </StatNumber>
          <StatHelpText>
            <StatArrow color={colorMode === 'light' ? 'red.500' : 'red.300'} type="decrease" />
            {safeToFixed(unpaidPercentage)}%
          </StatHelpText>
        </Stat>
      </StatGroup>
      <Box mt={10} w={'80%'} ml={'auto'} mr={'auto'} textAlign={{ base: 'center', md: 'right' }}>
        <Text mt={4} fontSize="lg" color={accent}>
          Total Commission Rate Amount:{' '}
          <Text as="b" fontSize="xl" color={secondary}>
            ${safeToFixed(totalCommissionRateAmount)}
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default CommissionRateAmountDataDisplay;
