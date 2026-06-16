'use client';

import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FeedItem, DragItem } from '@/types';
import NewsCard from './NewsCard';
import MovieCard from './MovieCard';
import SocialCard from './SocialCard';

const ITEM_TYPE = 'FEED_CARD';

interface DraggableCardProps {
  item: FeedItem;
  index: number;
  onMoveCard: (dragIndex: number, hoverIndex: number) => void;
}

export default function DraggableCard({
  item,
  index,
  onMoveCard,
}: DraggableCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: (): DragItem => ({ index, id: item.id, type: ITEM_TYPE }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(draggedItem: DragItem) {
      if (!ref.current) return;
      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      onMoveCard(dragIndex, hoverIndex);
      draggedItem.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  const renderCard = () => {
    switch (item.type) {
      case 'news':
        return <NewsCard item={item} index={index} />;
      case 'movie':
        return <MovieCard item={item} index={index} />;
      case 'social':
        return <SocialCard item={item} index={index} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: 'grab',
      }}
      className={`transition-all duration-200 ${
        isOver ? 'scale-[1.02] ring-2 ring-violet-400/50 rounded-2xl' : ''
      } ${isDragging ? 'shadow-2xl shadow-violet-500/20 z-50' : ''}`}
      data-testid={`draggable-card-${index}`}
    >
      {renderCard()}
    </div>
  );
}
