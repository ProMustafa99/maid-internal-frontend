import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// Generic interfaces
export interface Tag {
  id: number;
  name: string;
  description?: string;
  agency_id?: number;
  record_status?: number;
  created_at?: string;
  created_by?: number;
  updated_at?: string;
  updated_by?: number;
  deleted_at?: string;
  deleted_by?: number;
}

export interface TagSelectorProps {
  selectedTags: number[];
  onTagsChange: (tags: number[]) => void;
  disabled?: boolean;
  title: string;
  placeholder: string;
  addButtonText: string;
  fetchTags: () => Promise<{ success: boolean; data: Tag[] }>;
  createTag: (data: { name: string; description?: string }) => Promise<{ success: boolean; data: Tag }>;
  queryKey: string[];
  allowCustomTags?: boolean;
  maxTags?: number;
}

export default function TagSelector({
  selectedTags,
  onTagsChange,
  disabled = false,
  title,
  placeholder,
  addButtonText,
  fetchTags,
  createTag,
  queryKey,
  allowCustomTags = true,
  maxTags
}: TagSelectorProps) {
  const [customTag, setCustomTag] = useState('');
  const queryClient = useQueryClient();

  // Fetch tags
  const { data: tagsData, isLoading } = useQuery({
    queryKey,
    queryFn: fetchTags,
  });

  // Create tag mutation
  const createTagMutation = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success(`${title.slice(0, -1)} added successfully!`);
      setCustomTag('');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || `Failed to add ${title.slice(0, -1).toLowerCase()}`);
    },
  });

  const tags = tagsData?.data || [];

  const handleTagToggle = (tagId: number) => {
    if (disabled) return;
    
    const isSelected = selectedTags.includes(tagId);
    if (isSelected) {
      onTagsChange(selectedTags.filter(id => id !== tagId));
    } else {
      // Check max tags limit
      if (maxTags && selectedTags.length >= maxTags) {
        toast.warning(`Maximum ${maxTags} ${title.toLowerCase()} allowed`);
        return;
      }
      onTagsChange([...selectedTags, tagId]);
    }
  };

  const handleAddCustomTag = async () => {
    if (!customTag.trim()) return;
    
    createTagMutation.mutate({
      name: customTag.trim(),
      description: `Custom ${title.slice(0, -1).toLowerCase()}: ${customTag.trim()}`,
    });
  };

  const getSelectedTags = () => {
    return tags.filter(tag => selectedTags.includes(tag.id));
  };

  const getAvailableTags = () => {
    return tags.filter(tag => !selectedTags.includes(tag.id));
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="text-sm font-medium text-gray-700">{title}</div>
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {title}
        </label>
        
        {/* Selected Tags */}
        {getSelectedTags().length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {getSelectedTags().map((tag) => (
              <div
                key={tag.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200"
              >
                <span>{tag.name}</span>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => handleTagToggle(tag.id)}
                    className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Available Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {getAvailableTags().map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => handleTagToggle(tag.id)}
              disabled={disabled || (maxTags ? selectedTags.length >= maxTags : false)}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + {tag.name}
            </button>
          ))}
        </div>

        {/* Add Custom Tag */}
        {allowCustomTags && (
          <div className="flex gap-2">
            <input
              type="text"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCustomTag()}
              placeholder={placeholder}
              disabled={disabled || createTagMutation.isPending}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={handleAddCustomTag}
              disabled={disabled || !customTag.trim() || createTagMutation.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createTagMutation.isPending ? 'Adding...' : addButtonText}
            </button>
          </div>
        )}

        {/* Max tags indicator */}
        {maxTags && (
          <div className="text-xs text-gray-500 mt-1">
            {selectedTags.length}/{maxTags} {title.toLowerCase()} selected
          </div>
        )}
      </div>
    </div>
  );
}
