"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Edit2, Grip, Pen, PenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChapterListProps {
  OnEdit: (id: string) => void;
  onReorder: (updatedData: { id: string; position: number }[]) => void;
  chapters: Chapter[];
}
const ChapterList = ({ OnEdit, onReorder, chapters }: ChapterListProps) => {
  const [isMount, setIsMount] = useState(false);
  const [chaptersData, setChapterData] = useState(chapters);

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    setChapterData(chapters);
  }, [chapters]);

  if (!isMount) return null;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(chaptersData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);
    const updatedChapters = items.slice(startIndex, endIndex + 1);
    setChapterData(items);

    const bulkChapterUpdate = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onReorder(bulkChapterUpdate);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chaptersData">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chaptersData.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className={cn(
                      "flex gap-2  items-center  font-medium text-md bg-gray-300 rounded-sm mb-4 py-3 px-2",
                      chapter.isPublished && "bg-slate-300"
                    )}
                  >
                    <div {...provided.dragHandleProps}>
                      <Grip size={20} />
                    </div>
                    {chapter.title}
                    <div className="ml-auto flex items-center gap-1">
                      {chapter.isFree && <Badge>Free</Badge>}
                      <Badge
                        className={cn(
                          "bg-slate-700",
                          chapter.isPublished && "bg-sky-700"
                        )}
                      >
                        {chapter.isPublished ? "published" : "draft"}
                      </Badge>
                      <Edit2
                        onClick={() => OnEdit(chapter.id)}
                        size={20}
                        className="ml-2"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChapterList;
