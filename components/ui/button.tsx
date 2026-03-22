import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap font-label font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground rounded-full text-[0.6875rem] uppercase tracking-[0.1em] hover:opacity-90',
				destructive: 'bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90',
				outline: 'border border-border/15 bg-background rounded-full hover:bg-accent hover:text-accent-foreground',
				secondary: 'bg-secondary-container text-secondary-container-foreground rounded-full hover:opacity-90',
				ghost: 'hover:bg-accent hover:text-accent-foreground rounded-full',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-6 py-2.5',
				sm: 'h-9 px-4',
				lg: 'h-12 px-10 py-4 text-[0.75rem] tracking-widest font-bold',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button';
	return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
