"use client";
import { useState } from "react";
import { ChevronRight, ChevronDown, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryTreeDto } from "../types/category.type";

interface CategoryItemProps {
  category: CategoryTreeDto;
  level?: number;
  onSelect: (id: string) => void;
  selectedId?: string;
}

export function CategoryItem({ 
  category, 
  level = 0, 
  onSelect, 
  selectedId 
}: CategoryItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const isSelected = selectedId === category.id;

  return (
    <div className="w-full">
      {/* Menu Item */}
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors hover:bg-slate-100",
          isSelected && "bg-blue-50 text-blue-600 font-medium",
          level > 0 && "ml-4 border-l border-slate-200"
        )}
        onClick={() => onSelect(category.id)}
      >
        {/* Nút đóng mở icon */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="p-1 hover:bg-slate-200 rounded"
        >
          {hasChildren ? (
            isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          ) : (
            <div className="w-[14px]" />
          )}
        </div>

        <Folder size={16} className={cn(isSelected ? "text-blue-500" : "text-slate-400")} />
        <span className="text-sm truncate">{category.name}</span>
      </div>

      {/* Render đệ quy các con */}
      {hasChildren && isOpen && (
        <div className="mt-1">
          {category.children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              level={level + 1}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}