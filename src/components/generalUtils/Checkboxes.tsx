// Checkboxes.tsx
import React from 'react';
import { Checkbox, Box } from '@chakra-ui/react';
import { useBrandColors } from '../generalUtils/theme';

//interface for the checkbox
interface CheckboxProps {
    id: number;
    invoicedChecked: boolean;
    paidChecked: boolean;
    onInvoicedChange: (id: number, isChecked: boolean) => void;
    onPaidChange: (id: number, isChecked: boolean) => void;
}

const CheckboxComponent: React.FC<CheckboxProps> = ({ id, invoicedChecked, paidChecked, onInvoicedChange, onPaidChange }) => {
    const { background, secondary } = useBrandColors();

    return (
        <Box
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems="center"
            justifyContent="center"
            gap={{ base: '2', md: '4' }}
        >
            <Checkbox
                id={`invoiced-${id}`}
                isChecked={invoicedChecked}
                onChange={(e) => onInvoicedChange(id, e.target.checked)}
                size="lg"
                borderColor={secondary}
                borderRadius={'full'}
                colorScheme={'green'}
                bg={background}
            >
                Invoiced
            </Checkbox>
            <Checkbox
                id={`paid-${id}`}
                isChecked={paidChecked}
                onChange={(e) => onPaidChange(id, e.target.checked)}
                size="lg"
                borderColor={secondary}
                borderRadius={'full'}
                colorScheme={'green'}
                bg={background}
            >
                Paid
            </Checkbox>
        </Box>
    );
};

export default CheckboxComponent;
