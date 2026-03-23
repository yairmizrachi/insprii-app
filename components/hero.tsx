'use client';

import { motion } from 'framer-motion';
import { H1, Lead, Label } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { containerVariants, itemVariants } from '@/lib/animation-variants';

export default function Hero() {
	const scrollToWaitlist = () => {
		document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-32 text-center">
			<motion.div className="flex flex-col items-center" variants={containerVariants} initial="hidden" animate="visible">
				<H1 className="mx-auto mb-8 max-w-3xl">Stop buying clothes you never wear.</H1>

				<Lead className="mx-auto mb-10 max-w-xl">
					Save your inspo from Instagram, Pinterest, or your camera roll. Discover exactly what your style is trying to tell you. No more
					guessing.
				</Lead>

				<motion.div variants={itemVariants} className="mb-20 flex flex-col items-center gap-4">
					<Button size="lg" onClick={scrollToWaitlist} className="shadow-lg hover:scale-[1.02]">
						Get Early Access
					</Button>
					<p className="text-xs font-medium text-muted-foreground">Join 100+ people on the waitlist</p>
				</motion.div>
			</motion.div>

			{/* Masonry Mood Board */}
			<motion.div
				className="relative w-full px-4"
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.6 }}>
				<div className="mx-auto grid max-w-5xl grid-cols-2 items-start gap-4 md:grid-cols-3 md:gap-6">
					<div className="space-y-4 md:space-y-6">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							alt="Woman in cream linen blazer"
							className="warm-grade aspect-[3/4] w-full rounded-2xl object-cover"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuClMKEj3jyC29cmseiWEDksstq7WzAt0LSI03Jm83O_btwMm1PXyopjplMwwDVAH47rsD73PXqO3IonOMZyw2BJ-RnKV2cmw9P2zXrNe-cA-rbpQaQYUnJ0SIPXlUYQm9McFQLQpBdYVXLqRTp6DqWy1sFjsIYj7URxin2rU4D4_qTCejytYDPx0KEPfrb-LUG40DABrtzmwAr2s8W-xdPYvuS_Of-W-_TkaK3ITV-GkxnVPO-8KkbwFP3YMhM9nIzNdMPwRs10QVcI"
						/>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							alt="Flat lay beige clothing"
							className="warm-grade aspect-square w-full rounded-2xl object-cover"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2zoh97K4MMxqgq9Sw2RkYPKL_9BJxYsAIL19mEBET3KAzcVMq8AZsCNloV37lgFlPr9CJHFbD9vtYhveBj905_9bbosBuYIYVhDNGkT1AJmEq3_xiV1o86_yOyPGOkGB1TEcqna6bHSk0nBBNPTizy09eP7S5az0qgpkUClKlRcvsV7ApKT-DjpcHadL4j-ie2cAxU4qB3prTy7Z-jAsdlms_nRREN_0v56RK-hLUMi63Ft7D2kokORc5y9wW-wPTmKeDXSD6dwRT"
						/>
					</div>
					<div className="space-y-4 pt-8 md:space-y-6 md:pt-12">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							alt="Clothing rack neutrals"
							className="warm-grade aspect-[4/3] w-full rounded-2xl object-cover"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHcbmGB5OO1_xf9qxUI0tGr4RALCiez0_9rEgl9RzjIHTxSmof0rc8oNXHikxhbJv9NnWphysEO-qfut2-uy6tt6JT7OM7vJGZX7mULhQsBi9Ckt6KBHR76-Bc2AH3uDotjajy_ZNcVtFjpJ4w1UMLsyZ_nYEHrvWeVCRa4JYdDnh69nQwym1wiV7jNmiDP6grkWaBp8S5xTo0akQO5hGU1BmNlpieM8FAlIFPDsMOg-odYfJd_pMRv8UwgeL4Nsm0f08wPRSHXQ9u"
						/>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							alt="Woman in camel coat urban"
							className="warm-grade aspect-[3/4] w-full rounded-2xl object-cover"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmmVTomaIZRuHGqVmoNzo2IlTkT4jV0rWh5lBixrXhbIKyxbRby_3Zz6JviaxU9iQsrnzXdNp-ucgg6oHgApeBGz1golL5NOIg8EQA5a5TfAWqHY4RyJYIG1z15AzXZA88zmFWgWpnM4_o1zHt9zJ2X-NvCQX715fzuo8s9Gi3StaI4M29Ye5jjv1d_5dQh7fUNd16Bu3vwnz1D0jpJR2z_7Uv-k9HpoN5zEYhM0JKVZp_LsAP7vD93CRBbCHxM2_IKVtmhNkEP4nf"
						/>
					</div>
					<div className="hidden space-y-4 md:block md:space-y-6">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							alt="Earth tone accessories"
							className="warm-grade aspect-square w-full rounded-2xl object-cover"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbrTjX2i8Rs_V0y6w9vjJ-dwXlkAj655PkmkLPNfIzTDpEJ3RkBfIKH0_I2z4hGYEds9DDW-mkdAYo52L60xXI-I-d7i4xrTfvxwOMdt8wNr2ipVgFZgbeaHi-L9rgM4ZVibZPVCfG61NS-TG9nZdeFEPggSteyPw97DooQG2LQr9NtgMhseUTP9BIj4KOqH_h_8zErlRBAuHzDE54qhK8PhnbfvWb-IbboGnvvyVV9sp1Yepwi6r6b3FUwbR3OAP-9lG5OrtSSneB"
						/>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							alt="Woman in olive trousers"
							className="warm-grade aspect-[3/4] w-full rounded-2xl object-cover"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH72k5tY_c6_bsXUD4epUqlXPRAmogBT_pexpZSc-YAlX57cECaZfmVyfCiJsQgKY7NRPFSRoSFWIPbaE7JeyWQZx2eJ9d8n9eq8r1RnUezOyYDK71koVHQzKGCt_QQWP_-cmwz8C4PNwT3Gcj8F89k6gSgDmw7ZetG4H9UOddVvHhE6Mc0YobrNNtKOneEkh3HVqoFCObBoZgMXkM24sk_zsbNPn1xyRdnOvg51ZITKTsUqCI-Bn9fG87cJ3HcTMlQE87WQqASRe7"
						/>
					</div>
				</div>

				{/* Tags overlaid on grid */}
				{/* <div className="pointer-events-none absolute bottom-0 left-0 flex w-full flex-wrap justify-center gap-2 px-4 pb-8 md:gap-3">
					<span className="rounded-full bg-secondary-container/90 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-secondary-container-foreground shadow-lg backdrop-blur-sm md:px-5 md:py-2.5 md:text-[11px]">
						Analysis: Earth Tones
					</span>
					<span className="rounded-full bg-card/90 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground shadow-lg backdrop-blur-sm md:px-5 md:py-2.5 md:text-[11px]">
						94% Silhouette Match
					</span>
					<span className="rounded-full bg-card/90 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground shadow-lg backdrop-blur-sm md:px-5 md:py-2.5 md:text-[11px]">
						Minimalist DNA
					</span>
				</div> */}
			</motion.div>

			{/* Trust Signals */}
			{/* <motion.div
				className="mt-12 flex flex-wrap justify-center gap-6 text-[0.6875rem] font-bold uppercase tracking-widest text-muted-foreground"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1 }}>
				<div className="flex items-center gap-2">📱 Works with IG &amp; Pinterest</div>
				<div className="flex items-center gap-2">📲 Designed for iOS</div>
			</motion.div> */}
		</section>
	);
}
