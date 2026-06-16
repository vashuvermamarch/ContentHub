'use client';

import { motion } from 'framer-motion';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({
  title,
  description,
  icon = '📭',
  action,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ease: [0.2, 0, 0, 1] }}
      className="flex flex-col items-center justify-center rounded-[--radius-md-2xl] bg-md-surface-container py-16"
    >
      <span className="mb-4 text-5xl">{icon}</span>
      <h3 className="mb-2 text-lg font-medium text-md-on-surface">
        {title}
      </h3>
      <p className="mb-6 max-w-sm text-center text-sm text-md-on-surface-variant">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="rounded-full bg-md-primary px-6 py-2.5 text-sm font-medium text-md-on-primary shadow-sm transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-md-primary/90 hover:shadow-md active:scale-95"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
}
