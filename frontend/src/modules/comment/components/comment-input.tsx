import { useEffect, useState } from "react";

interface CommentInputProps {
  initialValue?: string;

  placeholder?: string;

  submitText?: string;

  loading?: boolean;

  autoFocus?: boolean;

  onSubmit(content: string): void;

  onCancel?(): void;
}

export function CommentInput({
  initialValue = "",
  placeholder = "Write a comment...",
  submitText = "Comment",
  loading = false,
  autoFocus = false,
  onSubmit,
  onCancel,
}: CommentInputProps) {
  const [content, setContent] = useState(initialValue);

  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  const handleSubmit = () => {
    const value = content.trim();

    if (!value) {
      return;
    }

    onSubmit(value);

    if (initialValue === "") {
      setContent("");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={content}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={loading}
        rows={3}
        className="w-full rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500"
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            disabled={loading}
            className="rounded-md border px-4 py-2"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}

        <button
          type="button"
          disabled={loading || content.trim().length === 0}
          className="rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : submitText}
        </button>
      </div>
    </div>
  );
}