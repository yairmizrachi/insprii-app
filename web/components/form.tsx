import { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRightLong } from 'react-icons/fa6';
import { EnhancedButton } from '@/components/ui/enhanced-btn';
import { containerVariants, itemVariants } from '@/lib/animation-variants';

interface FormProps {
	email: string;
	handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
	loading: boolean;
}

export default function Form({ email, handleEmailChange, handleSubmit, loading }: FormProps) {
	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSubmit();
		}
	};

	return (
		<motion.div className="mx-auto flex w-full max-w-md flex-col gap-4 sm:flex-row" variants={containerVariants} initial="hidden" animate="visible">
			<motion.div variants={itemVariants} className="w-full">
				<input
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={handleEmailChange}
					onKeyDown={onKeyDown}
					disabled={loading}
					className="flex h-12 w-full rounded-full border border-white/20 bg-white/5 px-6 py-3 font-body text-sm text-primary-foreground transition-colors placeholder:text-primary-foreground/40 focus:border-secondary-container focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				/>
			</motion.div>
			<motion.div variants={itemVariants}>
				<EnhancedButton
					variant="expandIcon"
					Icon={FaArrowRightLong}
					iconPlacement="right"
					onClick={handleSubmit}
					disabled={loading}
					className="h-12 w-full whitespace-nowrap bg-secondary-container text-[0.75rem] font-bold uppercase tracking-widest text-primary hover:bg-secondary-container/80 sm:w-[180px]">
					{loading ? 'Loading...' : 'Join Waitlist'}
				</EnhancedButton>
			</motion.div>
		</motion.div>
	);
}
