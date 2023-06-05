import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Mail } from "lucide-react";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/Sheet";

export function SheetDemo() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button>
					{" "}
					<Mail className="mr-2 h-4 w-4" /> Subscribe Email
				</Button>
			</SheetTrigger>
			<SheetContent position="left" size="sm">
				<SheetHeader>
					<SheetTitle>Subscribe</SheetTitle>
					<SheetDescription>
						Be the first to hear about product launches, collaborations, and
						more when you sign up for our emails.
					</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input id="name" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							Email
						</Label>
						<Input id="email" className="col-span-3" />
					</div>
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button type="submit">Subscribe</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
