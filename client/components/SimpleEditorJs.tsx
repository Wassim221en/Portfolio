import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';

interface SimpleEditorJsProps {
  data?: any;
  onChange?: (data: any) => void;
  placeholder?: string;
  readOnly?: boolean;
}

const SimpleEditorJs: React.FC<SimpleEditorJsProps> = ({
  data,
  onChange,
  placeholder = "اكتب مقالك هنا...",
  readOnly = false
}) => {
  const editorRef = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!holderRef.current) return;

    // Initialize Editor.js with basic tools
    const editor = new EditorJS({
      holder: holderRef.current,
      readOnly,
      placeholder,
      data: data || {
        blocks: [
          {
            type: "paragraph",
            data: {
              text: "ابدأ بكتابة مقالك هنا..."
            }
          }
        ]
      },
      tools: {
        // Basic tools that come with Editor.js
        header: {
          class: require('@editorjs/header'),
          config: {
            placeholder: 'اكتب عنوان...',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 2
          }
        },
        list: {
          class: require('@editorjs/list'),
          inlineToolbar: true
        },
        quote: {
          class: require('@editorjs/quote'),
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'اكتب اقتباس...',
            captionPlaceholder: 'مصدر الاقتباس'
          }
        },
        delimiter: require('@editorjs/delimiter'),
        warning: {
          class: require('@editorjs/warning'),
          inlineToolbar: true,
          config: {
            titlePlaceholder: 'عنوان التحذير',
            messagePlaceholder: 'رسالة التحذير'
          }
        },
        code: {
          class: require('@editorjs/code'),
          config: {
            placeholder: 'اكتب الكود هنا...'
          }
        },
        table: {
          class: require('@editorjs/table'),
          inlineToolbar: true
        }
      },
      onChange: async () => {
        if (onChange && editor) {
          try {
            const outputData = await editor.save();
            onChange(outputData);
          } catch (error) {
            console.error('Error saving editor data:', error);
          }
        }
      }
    });

    editorRef.current = editor;

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [data, readOnly]);

  const save = async () => {
    if (editorRef.current) {
      try {
        const outputData = await editorRef.current.save();
        return outputData;
      } catch (error) {
        console.error('Saving failed:', error);
        throw error;
      }
    }
    throw new Error('Editor not initialized');
  };

  const clear = () => {
    if (editorRef.current) {
      editorRef.current.clear();
    }
  };

  // Expose save and clear methods
  React.useImperativeHandle(editorRef, () => ({
    save,
    clear
  }));

  return (
    <div className="w-full">
      <div
        ref={holderRef}
        className="min-h-[400px] prose prose-lg max-w-none dark:prose-invert border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800"
      />
    </div>
  );
};

export default SimpleEditorJs;
