import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/lib/animation-variants';

export function H1({ className, ...props }: HTMLMotionProps<'h1'>) {
	return (
		<motion.h1
			variants={itemVariants}
			className={cn('scroll-m-20 font-headline text-4xl font-bold leading-[1.05] md:text-5xl lg:text-[4rem]', className)}
			{...props}
		/>
	);
}

export function H2({ className, ...props }: HTMLMotionProps<'h2'>) {
	return (
		<motion.h2
			variants={itemVariants}
			className={cn('scroll-m-20 font-headline text-3xl font-semibold leading-tight first:mt-0 md:text-[2.75rem]', className)}
			{...props}
		/>
	);
}

export function H3({ className, ...props }: HTMLMotionProps<'h3'>) {
	return (
		<motion.h3 variants={itemVariants} className={cn('scroll-m-20 font-headline text-2xl font-semibold leading-tight md:text-3xl', className)} {...props} />
	);
}

export function H4({ className, ...props }: HTMLMotionProps<'h4'>) {
	return <motion.h4 variants={itemVariants} className={cn('scroll-m-20 font-headline text-xl font-semibold tracking-tight', className)} {...props} />;
}

export function P({ className, ...props }: HTMLMotionProps<'p'>) {
	return <motion.p variants={itemVariants} className={cn('font-body leading-relaxed [&:not(:first-child)]:mt-6', className)} {...props} />;
}

export function Lead({ className, ...props }: HTMLMotionProps<'p'>) {
	return <motion.p variants={itemVariants} className={cn('font-body text-lg leading-relaxed text-muted-foreground md:text-xl', className)} {...props} />;
}

export function Large({ className, ...props }: HTMLMotionProps<'div'>) {
	return <motion.div variants={itemVariants} className={cn('text-lg font-semibold', className)} {...props} />;
}

export function Small({ className, ...props }: HTMLMotionProps<'small'>) {
	return <motion.small variants={itemVariants} className={cn('text-sm font-medium leading-none', className)} {...props} />;
}

export function Muted({ className, ...props }: HTMLMotionProps<'p'>) {
	return <motion.p variants={itemVariants} className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

export function Label({ className, ...props }: HTMLMotionProps<'span'>) {
	return <motion.span variants={itemVariants} className={cn('font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em]', className)} {...props} />;
}

export function Blockquote({ className, ...props }: HTMLMotionProps<'blockquote'>) {
	return <motion.blockquote variants={itemVariants} className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props} />;
}

export function InlineCode({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
	return <code className={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold', className)} {...props} />;
}
