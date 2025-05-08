"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const sampleData = [
  { id: "1", name: "Alpha Fund", category: "Equity", value: "S1,250,000", return: "+5.2%", risk: "Medium" },
  { id: "2", name: "Beta Bond Portfolio", category: "Fixed Income", value: "S800,000", return: "+2.1%", risk: "Low" },
  { id: "3", name: "Gamma Real Estate Trust", category: "Alternatives", value: "S500,000", return: "+7.8%", risk: "High" },
  { id: "4", name: "Delta Growth Stock", category: "Equity", value: "S150,000", return: "+12.5%", risk: "High" },
  { id: "5", name: "Epsilon Money Market", category: "Cash Equivalent", value: "S2,000,000", return: "+0.5%", risk: "Very Low" },
]

interface SampleDataTableProps {
  title: string;
  description?: string;
}

export function SampleDataTable({ title, description }: SampleDataTableProps) {
  return (
    <Card className="shadow-lg col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Return (YTD)</TableHead>
              <TableHead className="text-right">Risk Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell className={parseFloat(item.return) > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>{item.return}</TableCell>
                <TableCell className="text-right">{item.risk}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableCaption>A list of sample items.</TableCaption> */}
        </Table>
      </CardContent>
    </Card>
  )
}
