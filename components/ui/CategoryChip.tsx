'use client';

import { motion } from 'framer-motion';
import { CategoryType } from '@/types';

interface CategoryChipProps {
  category: CategoryType;
  label: string;
  selected: boolean;
  onToggle: (category: CategoryType) => void;
}

const categoryIcons: Record<CategoryType, string> = {
  technology: '💻',
  sports: '⚽',
  finance: '📈',
  ai: '🤖',
  entertainment: '🎬',
  general: '📰',
  science: '🔬',
  health: '🏥',
};

export default function CategoryChip({
  category,
  label,
  selected,
  onToggle,
}: CategoryChipProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onToggle(category)}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] active:scale-95 ${
        selected
          ? 'bg-md-primary text-md-on-primary shadow-sm hover:bg-md-primary/90'
          : 'bg-md-surface-container text-md-on-surface-variant hover:bg-md-surface-variant/40'
      }`}
      data-testid={`category-${category}`}
    >
      <span>{categoryIcons[category]}</span>
      <span>{label}</span>
      {selected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex h-4 w-4 items-center justify-center rounded-full bg-md-on-primary/20 text-[10px]"
        >
          ✓
        </motion.span>
      )}
    </motion.button>
  );
}
