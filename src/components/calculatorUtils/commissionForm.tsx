import { useState } from 'react'
import { Box, FormControl, FormLabel, Input, Checkbox, Button, SimpleGrid, NumberInput, NumberInputField } from '@chakra-ui/react'
import { useBrandColors } from '../generalUtils/theme'

// Interface for the commission form data
interface commissionFormData {
  clientName: string
  supplier: string
  bookingNumber: number
  finalPaymentDate: string
  rate: number
  commission: number
  commissionRateAmount: number
  invoiced: boolean
  paid: boolean
  paymentDate: string
}

const commissionForm = () => {
  const { brand700, brand900, brand800, brand600 } = useBrandColors()

  // Initialize state with the commissionFormData interface
  const [formData, setFormData] = useState<commissionFormData>({
    clientName: '',
    supplier: '',
    bookingNumber: 0,
    finalPaymentDate: '',
    rate: 0,
    commission: 0,
    commissionRateAmount: 0,
    invoiced: false,
    paid: false,
    paymentDate: ''
  })

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process or validate formData here
    console.log('Form Data Submitted:', formData)
  }

  return (
    <Box
      p={10}
      mt={4}
      borderRadius="lg"
      outline="2px solid"
      outlineColor="white"
      bg={brand800}
    >
      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <FormControl color={brand900}>
            <FormLabel htmlFor='clientName'>Client Name</FormLabel>
            <Input id='clientName' type='text' value={formData.clientName} onChange={handleChange} />
          </FormControl>

          <FormControl color={brand900}>
            <FormLabel htmlFor='supplier'>Supplier</FormLabel>
            <Input id='supplier' type='text' value={formData.supplier} onChange={handleChange} />
          </FormControl>

          <FormControl color={brand900}>
            <FormLabel htmlFor='bookingNumber'>Booking Number</FormLabel>
            <NumberInput defaultValue={0} precision={0}>
              <NumberInputField id='bookingNumber' value={formData.bookingNumber} onChange={handleChange} />
            </NumberInput>
          </FormControl>

          <FormControl color={brand900}>
            <FormLabel htmlFor='finalPaymentDate'>Final Payment Date</FormLabel>
            <Input id='finalPaymentDate' type='date' value={formData.finalPaymentDate} onChange={handleChange} />
          </FormControl>

          <FormControl color={brand900}>
            <FormLabel htmlFor='rate'>Commission Rate Percentage: %</FormLabel>
            <NumberInput defaultValue={0} precision={2}>
              <NumberInputField id='rate' value={formData.rate} onChange={handleChange} />
            </NumberInput>
          </FormControl>

          <FormControl color={brand900}>
          <FormLabel htmlFor='commission'>Total Commission Amount: $</FormLabel>
          <NumberInput defaultValue={0} precision={2}>
            <NumberInputField id='commission' value={formData.commission} onChange={handleChange} />
          </NumberInput>
          </FormControl>

          <FormControl color={brand900}>
            <FormLabel htmlFor='commissionRateAmount'>Commission Rate Amount</FormLabel>
            <NumberInput defaultValue={0} precision={2}>
              <NumberInputField id='commissionRateAmount' value={formData.commissionRateAmount} onChange={handleChange} />
            </NumberInput>
          </FormControl>

          <FormControl color={brand900}>
            <FormLabel htmlFor='invoiced'>Invoiced?</FormLabel>
            <Checkbox id='invoiced' isChecked={formData.invoiced} onChange={handleChange} />
          </FormControl>

          <FormControl color={brand900}>
            <FormLabel htmlFor='paid'>Paid?</FormLabel>
            <Checkbox id='paid' isChecked={formData.paid} onChange={handleChange} />
          </FormControl>

          <FormControl color={brand900}>
            <FormLabel htmlFor='paymentDate'>Payment Date</FormLabel>
            <Input id='paymentDate' type='date' value={formData.paymentDate} onChange={handleChange} />
          </FormControl>
          
         
        </SimpleGrid>

        <Button mt={4} bg={brand600} color={brand900} type='submit'>
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default commissionForm
