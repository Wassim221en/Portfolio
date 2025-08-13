import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';

// Import Editor.js tools - with dynamic imports for better compatibility
import('@editorjs/header');
import('@editorjs/list');
import('@editorjs/quote');
import('@editorjs/delimiter');
import('@editorjs/table');
import('@editorjs/warning');
import('@editorjs/code');
import('@editorjs/embed');
import('@editorjs/link');
import('@editorjs/image');
import('@editorjs/marker');
import('@editorjs/inline-code');

interface EditorJsEditorProps {
  data?: any;
  onChange?: (data: any) => void;
  placeholder?: string;
  readOnly?: boolean;
}

const EditorJsEditor: React.FC<EditorJsEditorProps> = ({
  data,
  onChange,
  placeholder = "اكتب مقالك هنا...",
  readOnly = false
}) => {
  const editorRef = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!holderRef.current) return;

    // Initialize Editor.js
    const editor = new EditorJS({
      holder: holderRef.current,
      readOnly,
      placeholder,
      data: data || {
        blocks: [
          {
            type: "header",
            data: {
              text: "عنوان المقال",
              level: 1
            }
          },
          {
            type: "paragraph",
            data: {
              text: "ابدأ بكتابة مقالك هنا..."
            }
          }
        ]
      },
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'اكتب عنوان...',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 2
          }
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          }
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'اكتب اقتباس...',
            captionPlaceholder: 'مصدر الاقتباس'
          }
        },
        delimiter: Delimiter,
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3
          }
        },
        warning: {
          class: Warning,
          inlineToolbar: true,
          config: {
            titlePlaceholder: 'عنوان التحذير',
            messagePlaceholder: 'رسالة التحذير'
          }
        },
        code: {
          class: Code,
          config: {
            placeholder: 'اكتب الكود هنا...'
          }
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true,
              codepen: true,
              twitter: true,
              instagram: true,
              facebook: true
            }
          }
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: '/api/fetchUrl' // You would need to implement this endpoint
          }
        },
        image: {
          class: Image,
          config: {
            endpoints: {
              byFile: '/api/uploadFile', // You would need to implement this endpoint
              byUrl: '/api/fetchUrl'
            }
          }
        },
        marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M'
        },
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+C'
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
      },
      i18n: {
        direction: 'rtl',
        messages: {
          ui: {
            "blockTunes": {
              "toggler": {
                "Click to tune": "انقر للتخصيص",
                "or drag to move": "أو اسحب للنقل"
              }
            },
            "inlineToolbar": {
              "converter": {
                "Convert to": "تحويل إلى"
              }
            },
            "toolbar": {
              "toolbox": {
                "Add": "إضافة",
                "Filter": "فلتر",
                "Nothing found": "لم يتم العثور على شيء"
              }
            },
            "popover": {
              "Filter": "فلتر",
              "Nothing found": "لم يتم العثور على شيء"
            }
          },
          toolNames: {
            "Text": "نص",
            "Heading": "عنوان",
            "List": "قائمة",
            "Warning": "تحذير",
            "Checklist": "قائمة مهام",
            "Quote": "اقتباس",
            "Code": "كود",
            "Delimiter": "فاصل",
            "Table": "جدول",
            "Link": "رابط",
            "Marker": "تمييز",
            "Bold": "عريض",
            "Italic": "مائل",
            "InlineCode": "كود مضمن",
            "Image": "صورة",
            "Embed": "تضمين"
          },
          tools: {
            "warning": {
              "Title": "العنوان",
              "Message": "الرسالة"
            },
            "link": {
              "Add a link": "إضافة رابط"
            },
            "stub": {
              'The block can not be displayed correctly.': 'لا يمكن عرض هذا العنصر بشكل صحيح.'
            },
            "image": {
              "Caption": "التسمية التوضيحية",
              "Select an Image": "اختر صورة",
              "With border": "مع حدود",
              "Stretch image": "تمديد الصورة",
              "With background": "مع خلفية"
            },
            "code": {
              "Enter a code": "أدخل الكود"
            },
            "linkTool": {
              "Link": "رابط",
              "Couldn't fetch the link data": "لم يتم جلب بيانات الرابط",
              "Couldn't get this link data, try the other one": "لم يتم جلب بيانات هذا الرابط، جرب رابط آخر",
              "Wrong response format from the server": "صيغة استجابة خاطئة من الخادم"
            },
            "header": {
              "Header": "عنوان"
            },
            "paragraph": {
              "Enter something": "اكتب شيئاً"
            },
            "list": {
              "Ordered": "مرقم",
              "Unordered": "غير مرقم"
            },
            "table": {
              "Heading": "عنوان",
              "Add column to left": "إضافة عمود لليسار",
              "Add column to right": "إضافة عمود لليمين", 
              "Delete column": "حذف عمود",
              "Add row above": "إضافة صف أعلى",
              "Add row below": "إضافة صف أسفل",
              "Delete row": "حذف صف",
              "With headings": "مع عناوين",
              "Without headings": "بدون عناوين"
            },
            "quote": {
              "Align Left": "محاذاة لليسار",
              "Align Center": "محاذاة للوسط"
            }
          },
          blockTunes: {
            "delete": {
              "Delete": "حذف",
              "Click to delete": "انقر للحذف"
            },
            "moveUp": {
              "Move up": "نقل لأعلى"
            },
            "moveDown": {
              "Move down": "نقل لأسفل"
            }
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
        style={{ direction: 'rtl' }}
      />
    </div>
  );
};

export default EditorJsEditor;
