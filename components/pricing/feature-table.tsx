import { CheckCircle2, HelpCircle, Minus } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function FeatureTable() {
  return (
    <div className="container items-center">
      <div></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={5} className="rounded-lg bg-gray-300 text-[#18181B]">
              Task Management
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="flex w-auto gap-4">
              Customizable Workflows <HelpCircle size={18} color="#777" />
            </TableCell>
            <TableCell className="w-1/6">100</TableCell>
            <TableCell className="w-1/6">100</TableCell>
            <TableCell className="w-1/6">100</TableCell>
            <TableCell className="w-1/6 text-[#218347]">Unlimited</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex w-auto gap-4">
              Project Planning <HelpCircle size={18} color="#777" />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
            <TableCell>
              <Minus size={18} />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex w-auto gap-4">
              Time Tracking <HelpCircle size={18} color="#777" />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
          </TableRow>
        </TableBody>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={5} className="rounded-lg bg-gray-300 text-[#18181B]">
              Visualization
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="flex w-auto gap-4">
              Gantt Charts <HelpCircle size={18} color="#777" />
            </TableCell>
            <TableCell>
              <Minus size={18} />
            </TableCell>
            <TableCell>
              <Minus size={18} />
            </TableCell>
            <TableCell>
              <Minus size={18} />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex w-auto gap-4">
              Agile Methodology Support <HelpCircle size={18} color="#777" />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex w-auto gap-4">
              Reporting and Analytics <HelpCircle size={18} color="#777" />
            </TableCell>
            <TableCell>
              <Minus size={18} />
            </TableCell>
            <TableCell>
              <Minus size={18} />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex w-auto gap-4">
              Team and Individual Dashboards <HelpCircle size={18} color="#777" />
            </TableCell>
            <TableCell>
              <Minus size={18} />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
          </TableRow>
        </TableBody>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={5} className="rounded-lg bg-gray-300 text-[#18181B]">
              Integarations
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="flex w-auto gap-4">
              Document Management <HelpCircle size={18} color="#777" />
            </TableCell>
            <TableCell>
              <Minus size={18} />
            </TableCell>
            <TableCell>
              <Minus size={18} />
            </TableCell>
            <TableCell>
              <Minus size={18} />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex w-auto gap-4">
              Client Collaboration <HelpCircle size={18} color="#777" />
            </TableCell>
            <TableCell>
              <Minus size={18} />
            </TableCell>
            <TableCell>
              <Minus size={18} />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex w-auto gap-4">
              Mobile App Integration <HelpCircle size={18} color="#777" />
            </TableCell>
            <TableCell>
              <Minus size={18} />
            </TableCell>
            <TableCell>
              <Minus size={18} />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
            <TableCell>
              <CheckCircle2 size={18} color="#218347" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
