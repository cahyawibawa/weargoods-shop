import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Command } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import { UserAuthForm } from "@/components/SignInAuthForm";

export const metadata: Metadata = {
	title: "Authentication",
	description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
	return (
		<>
			<div className="md:hidden">
				<Image
					src="/examples/authentication-light.png"
					width={1280}
					height={843}
					alt="Authentication"
					className="block dark:hidden"
				/>
				<Image
					src="/examples/authentication-dark.png"
					width={1280}
					height={843}
					alt="Authentication"
					className="hidden dark:block"
				/>
			</div>
			<div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<Link
					href="/signup"
					className={cn(
						buttonVariants({ variant: "ghost", size: "sm" }),
						"absolute right-4 top-4 md:right-8 md:top-8",
					)}
				>
					Sign Up
				</Link>
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
					<div
						className="absolute inset-0 bg-cover"
						style={{
							backgroundImage:
								"url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)",
						}}
					/>
					<div className="relative z-20 flex items-center text-lg font-medium">
						<Command className="mr-2 h-6 w-6" /> Weargoods
					</div>
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2">
							<p className="text-lg">
								&ldquo; If you want to find something that looks like a
								different type of clothing you can find on Weargoods &rdquo;
							</p>
							<footer className="text-sm">Cahya</footer>
						</blockquote>
					</div>
				</div>
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">
								Login to your account
							</h1>
							<p className="text-sm text-muted-foreground">
								Enter your credentials below to continue.
							</p>
						</div>
						<UserAuthForm />
						<p className="px-8 text-center text-sm text-muted-foreground">
							Don&apos;t have an account?{" "}
							<Link
								href="/signup"
								className="underline underline-offset-4 hover:text-primary"
							>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
