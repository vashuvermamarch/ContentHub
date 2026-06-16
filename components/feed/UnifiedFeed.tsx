'use client';

import { useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppDispatch } from '@/redux/hooks';
import { reorderItems } from '@/redux/slices/feedSlice';
import { FeedItem } from '@/types';
import DraggableCard from '@/components/cards/DraggableCard';
import DndProviderWrapper from '@/components/providers/DndProviderWrapper';
import { SkeletonGrid } from '@/components/ui/SkeletonCard';
import EmptyState from '@/components/ui/EmptyState';

interface UnifiedFeedProps {
  items: FeedItem[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: string;
}

export default function UnifiedFeed({
  items,
  isLoading = false,
  hasMore = false,
  onLoadMore,
  emptyTitle = 'No content found',
  emptyDescription = 'Try adjusting your categories or search query.',
  emptyIcon = '🔍',
}: UnifiedFeedProps) {
  const dispatch = useAppDispatch();

  // Infinite scroll sentinel
  const { ref: sentinelRef } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasMore && !isLoading && onLoadMore) {
        onLoadMore();
      }
    },
  });

  const handleMoveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(reorderItems({ dragIndex, hoverIndex }));
    },
    [dispatch]
  );

  if (!isLoading && items.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        icon={emptyIcon}
      />
    );
  }

  return (
    <DndProviderWrapper>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance] w-full">
        {items.map((item, index) => (
          <div key={item.id} className="break-inside-avoid mb-6">
            <DraggableCard
              item={item}
              index={index}
              onMoveCard={handleMoveCard}
            />
          </div>
        ))}
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="mt-5">
          <SkeletonGrid count={3} />
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !isLoading && onLoadMore && (
        <div className="mt-8 flex justify-center pb-6">
          <button
            onClick={onLoadMore}
            className="flex items-center gap-2 rounded-full bg-md-primary px-6 py-3 text-sm font-semibold text-md-on-primary shadow-sm hover:shadow-md hover:bg-md-primary/90 transition-all active:scale-95 duration-200 cursor-pointer"
          >
            Load More Content
          </button>
        </div>
      )}
    </DndProviderWrapper>
  );
}
