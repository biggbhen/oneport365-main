import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const originCharges = [
  {
    basis: "Freight Charges",
    unitOfMeasure: "Per Kilogram",
    unit: "610.00",
    rate: "$3.00",
    amount: "$1,830.00",
  },
  {
    basis: "Screening",
    unitOfMeasure: "Per Kilogram",
    unit: "610.00",
    rate: "$3.00",
    amount: "$1,830.00",
  },
  {
    basis: "Handling Charges",
    unitOfMeasure: "Per Shipment",
    unit: "1.00",
    rate: "$55.00",
    amount: "$55.00",
  },
  {
    basis: "Documentation",
    unitOfMeasure: "Per Shipment",
    unit: "1.00",
    rate: "$55.00",
    amount: "$55.00",
  },
  {
    basis: "Transfer fee",
    unitOfMeasure: "Per Shipment",
    unit: "1.00",
    rate: "$175.00",
    amount: "$175.00",
  },
  {
    basis: "Pickup fee",
    unitOfMeasure: "Per Shipment",
    unit: "1.00",
    rate: "$255.00",
    amount: "$255.00",
  },
];

export function OrignHandlingChargesTable() {
  return (
    <Table>
      {/* <TableCaption>A list of origin handling charges.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="py-6">Bank</TableHead>
          <TableHead>Unit of Measure</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Rate(USD)</TableHead>
          <TableHead className="text-right">Amount (USD)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {originCharges.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.basis}</TableCell>
            <TableCell>{item.unitOfMeasure}</TableCell>
            <TableCell>{item.unit}</TableCell>
            <TableCell>{item.rate}</TableCell>
            <TableCell className="text-right">{item.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="!bg-white">
          <TableCell colSpan={4} className="text-end text-gray-400 text-lg">
            Sub Total:{" "}
          </TableCell>
          <TableCell className="text-right text-lg">$2,472.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

const destinationCharges = [
  {
    basis: "Estimate duty",
    unitOfMeasure: "Per Kilogram",
    unit: "610.00",
    rate: "N3.00",
    amount: "N1,830.00",
  },
  {
    basis: "Custom Clearance Valuation",
    unitOfMeasure: "Per Kilogram",
    unit: "610.00",
    rate: "N3.00",
    amount: "N1,830.00",
  },
  {
    basis: "Stamp Duty",
    unitOfMeasure: "Per Consignment",
    unit: "1.00",
    rate: "N55.00",
    amount: "N55.00",
  },
  {
    basis: "Welfare",
    unitOfMeasure: "Per Consignment",
    unit: "1.00",
    rate: "N55.00",
    amount: "N55.00",
  },
  {
    basis: "Handling Charges",
    unitOfMeasure: "Per Consignment",
    unit: "1.00",
    rate: "N175.00",
    amount: "N175.00",
  },
  {
    basis: "FAAN",
    unitOfMeasure: "Per Consignment",
    unit: "1.00",
    rate: "N255.00",
    amount: "N255.00",
  },
  {
    basis: "Airline charges",
    unitOfMeasure: "Per Consignment",
    unit: "1.00",
    rate: "N255.00",
    amount: "N255.00",
  },
  {
    basis: "Transport to PH",
    unitOfMeasure: "Per Consignment",
    unit: "1.00",
    rate: "N255.00",
    amount: "N255.00",
  },
  {
    basis: "SON",
    unitOfMeasure: "Per Consignment",
    unit: "1.00",
    rate: "N255.00",
    amount: "N255.00",
  },
];

export function DestinationHandlingChargesTable() {
  return (
    <Table>
      {/* <TableCaption>A list of origin handling charges.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="py-6">Bank</TableHead>
          <TableHead>Unit of Measure</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Rate(USD)</TableHead>
          <TableHead className="text-right">Amount (USD)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {destinationCharges.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.basis}</TableCell>
            <TableCell>{item.unitOfMeasure}</TableCell>
            <TableCell>{item.unit}</TableCell>
            <TableCell>{item.rate}</TableCell>
            <TableCell className="text-right">{item.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="!bg-white">
          <TableCell
            colSpan={4}
            className="text-end text-gray-400 text-lg pb-1 pt-6"
          >
            Total LOS airport to Client Door:{" "}
          </TableCell>
          <TableCell className="text-right text-lg pb-1 pt-6">
            N877,150.00
          </TableCell>
        </TableRow>
        <TableRow className="!bg-white">
          <TableCell
            colSpan={4}
            className="text-end text-lg pt-2 text-gray-400"
          >
            ALL-IN Door to Door (NGN):{" "}
          </TableCell>
          <TableCell className="text-right text-lg pt-2">
            N4,090,750.00
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
