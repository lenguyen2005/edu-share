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
          "group flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-all duration-300",
          isSelected 
            ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-bold shadow-sm border border-indigo-100/50 dark:border-indigo-500/20" 
            : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900/50 hover:shadow-sm dark:hover:shadow-none hover:text-indigo-600 dark:hover:text-indigo-400 border border-transparent",
          level > 0 && "ml-2"
        )}
        onClick={() => onSelect(category.id)}
      >
        {/* Nút đóng mở icon */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className={cn(
            "p-1 rounded-md transition-colors duration-300",
            isSelected 
              ? "hover:bg-indigo-200/50 dark:hover:bg-indigo-800/50 text-indigo-500 dark:text-indigo-400" 
              : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:text-indigo-400"
          )}
        >
          {hasChildren ? (
            isOpen ? <ChevronDown size={14} className="stroke-[3]" /> : <ChevronRight size={14} className="stroke-[3]" />
          ) : (
            <div className="w-[14px]" />
          )}
        </div>

        {/* Icon thư mục */}
        <Folder 
          size={18}
          strokeWidth={2.5}
          className={cn(
            "transition-colors duration-300",
            isSelected 
              ? "text-indigo-600 dark:text-indigo-400 fill-indigo-100 dark:fill-indigo-900/50" 
              : "text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400"
          )} 
        />
        
        <span className="text-base font-bold truncate">{category.name}</span>
      </div>

      {/* Render đệ quy các con với đường viền dẫn hướng (Guide line) */}
      {hasChildren && isOpen && (
        <div className="mt-1 ml-5 pl-2 border-l-2 border-dashed border-indigo-100 dark:border-indigo-800 space-y-1 animate-in slide-in-from-top-1 fade-in duration-200">
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