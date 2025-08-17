// File: TempCommissionCalc.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  SimpleGrid,
  Checkbox,
  Textarea,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { saveAs } from "file-saver";
import { useBrandColors } from "../components/generalUtils/theme";

export interface BasicCommissionData {
  commission_rate: number;
  client_name?: string;
  supplier_name?: string;
  booking_number?: string;
  final_payment_date?: string;
  invoiced?: boolean;
  commission_amount?: number;
  calculated_commission?: number;
  paid?: boolean;
  month_paid?: string;
  year_paid?: string;
  notes?: string;
  id: string;
}

const TempCommissionCalc: React.FC = () => {
  const [commissions, setCommissions] = useState<BasicCommissionData[]>([]);
  const [form, setForm] = useState<Partial<BasicCommissionData>>({});
  const { primary, background, accent, secondary, text } = useBrandColors();

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add commission
  const addCommission = () => {
    if (
      !form.client_name ||
      !form.supplier_name ||
      !form.booking_number ||
      !form.final_payment_date ||
      form.commission_rate === undefined ||
      form.commission_amount === undefined
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const newCommission: BasicCommissionData = {
      ...form,
      commission_rate: Number(form.commission_rate),
      commission_amount: Number(form.commission_amount),
      calculated_commission:
        (Number(form.commission_rate) / 100) * Number(form.commission_amount),
      id: Date.now().toString(), // Unix timestamp
    } as BasicCommissionData;

    setCommissions((prev) => [newCommission, ...prev]);
    setForm({}); // reset all fields including checkboxes
  };

  // Export JSON
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(commissions, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "commissions.json");
  };

  // Export CSV
  const exportCSV = () => {
    if (commissions.length === 0) return;
    const headers = Object.keys(commissions[0]).join(",");
    const rows = commissions.map((c) => Object.values(c).join(",")).join("\n");
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "commissions.csv");
  };

  // Print / PDF
  const printData = () => {
    window.print();
  };

  return (
    <Box
      w={{ base: "100%", md: "80%" }}
      maxW={"960px"}
      m={"auto"}
      p={5}
      bg={primary}
      borderRadius="md"
      boxShadow="md"
      color={secondary}
      border="1px solid"
      borderColor={secondary}
      // Apply styles to all nested inputs/textarea
      sx={{
        "input, textarea": {
          bg: primary,
          borderColor: secondary,
          color: text,
          _placeholder: { color: "gray.500" },
          _focus: {
            borderColor: background,
            boxShadow: "0 0 0 10px" + background,
          },
        },
        "input[type='number']": {
          // optional: ensure number inputs look consistent
          bg: primary,
        },
      }}
    >
      <Text fontSize="3xl" fontWeight={"bold"} mb={4} textAlign={"center"}>
        Commission Calculator
      </Text>
      <Box
        bg={primary}
        p={4}
        borderRadius={"md"}
        w={"100%"}
        maxW={"960px"}
        m="auto"
        mb={8}
        border={"1px solid"}
        borderColor={accent}
      >
        <Text fontSize="lg" mt={4} color={text} textAlign="center">
          Try out the commission calculator below to get a taste of Globeeta.
        </Text>
        <Text
          fontSize=""
          fontStyle={"italic"}
          mt={2}
          color={secondary}
          textShadow={"0 0 10px black"}
          textAlign="center"
          bg={primary}
          p={4}
        >
          Your calculated commissions will be displayed in a table below when
          you submit the form via the "Add Commission" button. When you are done
          calculating commissions, you have the option to export the table data
          in .csv and/or JSON, or page print via buttons below the table. Data
          will be cleared upon page refresh or new browser session.
          <br /> <b>No data storage available.</b>
        </Text>
      </Box>

      {/* Input Form */}
      <VStack spacing={3} align="stretch" mb={6}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <FormControl isRequired>
            <FormLabel>Client Name</FormLabel>
            <Input
              placeholder="Client Name"
              name="client_name"
              value={form.client_name || ""}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Supplier Name</FormLabel>
            <Input
              placeholder="Supplier Name"
              name="supplier_name"
              value={form.supplier_name || ""}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Booking Number</FormLabel>
            <Input
              placeholder="Booking Number"
              name="booking_number"
              value={form.booking_number || ""}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Final Payment Date</FormLabel>
            <Input
              type="date"
              name="final_payment_date"
              value={form.final_payment_date || ""}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Commission Rate (%)</FormLabel>
            <Input
              type="number"
              placeholder="Commission Rate"
              name="commission_rate"
              value={form.commission_rate || ""}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Commission Amount</FormLabel>
            <Input
              type="number"
              placeholder="Commission Amount"
              name="commission_amount"
              value={form.commission_amount || ""}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <Checkbox
              name="invoiced"
              isChecked={form.invoiced || false}
              onChange={handleChange}
            >
              Invoiced
            </Checkbox>
          </FormControl>

          <FormControl>
            <Checkbox
              name="paid"
              isChecked={form.paid || false}
              onChange={handleChange}
            >
              Paid
            </Checkbox>
          </FormControl>

          <FormControl>
            <FormLabel>Month Paid</FormLabel>
            <Input
              type="number"
              placeholder="Month Paid"
              name="month_paid"
              value={form.month_paid || ""}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Year Paid</FormLabel>
            <Input
              type="number"
              placeholder="Year Paid"
              name="year_paid"
              value={form.year_paid || ""}
              onChange={handleChange}
            />
          </FormControl>
        </SimpleGrid>

        <FormControl>
          <FormLabel>Notes</FormLabel>
          <Textarea
            placeholder="Notes"
            name="notes"
            value={form.notes || ""}
            onChange={handleChange}
          />
        </FormControl>

        <Button
          bg={"none"}
          boxShadow={`0 0 5px 2px black`}
          m={"20px"}
          maxW={"400px"}
          ml={"auto"}
          mr={"auto"}
          onClick={addCommission}
          _hover={{
            boxShadow: `0 0 15px 5px black`,
          }}
        >
          Add Commission
        </Button>
      </VStack>

      {/* Table */}
      {commissions.length > 0 && (
        <>
          <Box overflowX="auto" mb={6}>
            <Table variant="striped" size="sm">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Client</Th>
                  <Th>Supplier</Th>
                  <Th>Booking #</Th>
                  <Th>Final Payment</Th>
                  <Th>Rate (%)</Th>
                  <Th>Amount</Th>
                  <Th>Calculated</Th>
                  <Th>Invoiced</Th>
                  <Th>Paid</Th>
                  <Th>Month Paid</Th>
                  <Th>Year Paid</Th>
                  <Th>Notes</Th>
                </Tr>
              </Thead>
              <Tbody>
                {commissions.map((c) => (
                  <Tr key={c.id}>
                    <Td>{c.id}</Td>
                    <Td>{c.client_name}</Td>
                    <Td>{c.supplier_name}</Td>
                    <Td>{c.booking_number}</Td>
                    <Td>{c.final_payment_date}</Td>
                    <Td>{c.commission_rate}</Td>
                    <Td>{c.commission_amount}</Td>
                    <Td>{c.calculated_commission?.toFixed(2)}</Td>
                    <Td>{c.invoiced ? "Yes" : "No"}</Td>
                    <Td>{c.paid ? "Yes" : "No"}</Td>
                    <Td>{c.month_paid || ""}</Td>
                    <Td>{c.year_paid || ""}</Td>
                    <Td>{c.notes || ""}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <HStack spacing={4}>
            <Button onClick={exportJSON}>Export JSON</Button>
            <Button onClick={exportCSV}>Export CSV</Button>
            <Button onClick={printData}>Print / PDF</Button>
          </HStack>
        </>
      )}
    </Box>
  );
};

export default TempCommissionCalc;
