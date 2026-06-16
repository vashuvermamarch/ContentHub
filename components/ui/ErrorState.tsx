'use client';

import { motion } from 'framer-motion';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ease: [0.2, 0, 0, 1] }}
      className="flex flex-col items-center justify-center rounded-[--radius-md-2xl] bg-md-error-container py-12"
    >
      <span className="mb-4 text-5xl">⚠️</span>
      <h3 className="mb-2 text-lg font-medium text-md-on-error">
        {title}
      </h3>
      <p className="mb-6 max-w-sm text-center text-sm text-md-on-error/80">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-full border border-md-error/30 bg-md-surface px-5 py-2.5 text-sm font-medium text-md-error transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-md-error/10 active:scale-95"
        >
          Try Again
        </button>
      )}
    </motion.div>
  );
}
