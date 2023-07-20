import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Grid } from "lucide-react";

const sizes = [
  {
    sizeOption: "US",
    sizeA: "7",
    sizeB: "7.5",
    sizeC: "8",
    sizeD: "9",
    sizeE: "9.5",
    sizeF: "10",
    sizeG: "11",
  },
  {
    sizeOption: "EU",
    sizeA: "39",
    sizeB: "40",
    sizeC: "41",
    sizeD: "42",
    sizeE: "42.5",
    sizeF: "43",
    sizeG: "44",
  },
  {
    sizeOption: "CM",
    sizeA: "25.33",
    sizeB: "26",
    sizeC: "26.66",
    sizeD: "27.33",
    sizeE: "28",
    sizeF: "28.66",
  },
];

export function SizeGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Grid className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Size Chart</DialogTitle>
          <DialogDescription>Shoes Sizing</DialogDescription>
        </DialogHeader>
        <Table>
          {/* <TableCaption>Shoes Size</TableCaption> */}
          {/* <TableHeader>
            <TableRow>
              <TableHead>{""}</TableHead>
              <TableHead>S</TableHead>
              <TableHead>M</TableHead>
              <TableHead>L</TableHead>
              <TableHead>XL</TableHead>
            </TableRow>
          </TableHeader> */}
          <TableBody>
            {sizes.map((size) => (
              <TableRow key={size.sizeOption}>
                <TableCell className="font-medium">{size.sizeOption}</TableCell>
                <TableCell className="font-medium">{size.sizeA}</TableCell>
                <TableCell>{size.sizeB}</TableCell>
                <TableCell>{size.sizeC}</TableCell>
                <TableCell>{size.sizeD}</TableCell>
                <TableCell>{size.sizeE}</TableCell>
                <TableCell>{size.sizeF}</TableCell>
                <TableCell>{size.sizeG}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <DialogDescription>Clothes Sizing</DialogDescription>
        <Table>
          <TableCaption>Shoes Size</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{""}</TableHead>
              <TableHead>S</TableHead>
              <TableHead>M</TableHead>
              <TableHead>L</TableHead>
              <TableHead>XL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sizes.map((size) => (
              <TableRow key={size.sizeOption}>
                <TableCell className="font-medium">{size.sizeOption}</TableCell>
                <TableCell className="font-medium">{size.sizeA}</TableCell>
                <TableCell>{size.sizeB}</TableCell>
                <TableCell>{size.sizeC}</TableCell>
                <TableCell>{size.sizeD}</TableCell>
                <TableCell>{size.sizeE}</TableCell>
                <TableCell>{size.sizeF}</TableCell>
                <TableCell>{size.sizeG}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
