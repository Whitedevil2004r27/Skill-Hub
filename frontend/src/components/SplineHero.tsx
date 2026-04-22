import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background/5 animate-pulse" />
});

export default function SplineHero() {
  return (
    <div className="relative w-full h-[600px] md:h-[800px] overflow-hidden">
      {/* Fallback while loading or if it fails */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 pointer-events-none z-10" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="w-full h-full"
      >
        <Spline scene="https://prod.spline.design/S8o9DE-254xyJ0lv/scene.splinecode" />
      </motion.div>
    </div>
  );
}

