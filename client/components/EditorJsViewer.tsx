import React from 'react';

interface EditorJsBlock {
  id?: string;
  type: string;
  data: any;
}

interface EditorJsData {
  time?: number;
  blocks: EditorJsBlock[];
  version?: string;
}

interface EditorJsViewerProps {
  data: EditorJsData;
}

const EditorJsViewer: React.FC<EditorJsViewerProps> = ({ data }) => {
  const renderBlock = (block: EditorJsBlock, index: number) => {
    const { type, data: blockData } = block;

    switch (type) {
      case 'header':
        const HeadingTag = `h${blockData.level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag 
            key={index} 
            className={`font-bold mb-4 mt-6 text-gray-900 dark:text-white ${
              blockData.level === 1 ? 'text-3xl' :
              blockData.level === 2 ? 'text-2xl' :
              blockData.level === 3 ? 'text-xl' :
              blockData.level === 4 ? 'text-lg' :
              'text-base'
            }`}
          >
            {blockData.text}
          </HeadingTag>
        );

      case 'paragraph':
        return (
          <p 
            key={index} 
            className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: blockData.text }}
          />
        );

      case 'image':
        return (
          <figure key={index} className="my-8">
            <div className="rounded-lg overflow-hidden">
              <img
                src={blockData.file?.url || blockData.url}
                alt={blockData.caption || ''}
                className={`w-full h-auto ${
                  blockData.stretched ? 'max-w-none' : 'max-w-full'
                } ${
                  blockData.withBorder ? 'border border-gray-300 dark:border-gray-600' : ''
                } ${
                  blockData.withBackground ? 'bg-gray-100 dark:bg-gray-800 p-4' : ''
                }`}
              />
            </div>
            {blockData.caption && (
              <figcaption className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                {blockData.caption}
              </figcaption>
            )}
          </figure>
        );

      case 'list':
        const ListTag = blockData.style === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag 
            key={index} 
            className={`mb-4 text-gray-700 dark:text-gray-300 ${
              blockData.style === 'ordered' ? 'list-decimal list-inside' : 'list-disc list-inside'
            }`}
          >
            {blockData.items?.map((item: string, itemIndex: number) => (
              <li key={itemIndex} className="mb-1" dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ListTag>
        );

      case 'quote':
        return (
          <blockquote 
            key={index} 
            className={`border-l-4 border-purple-500 pl-6 my-6 ${
              blockData.alignment === 'center' ? 'text-center' : ''
            }`}
          >
            <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-2">
              "{blockData.text}"
            </p>
            {blockData.caption && (
              <cite className="text-sm text-gray-600 dark:text-gray-400">
                — {blockData.caption}
              </cite>
            )}
          </blockquote>
        );

      case 'code':
        return (
          <pre 
            key={index} 
            className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 my-6 overflow-x-auto"
          >
            <code className="text-green-400 text-sm">
              {blockData.code}
            </code>
          </pre>
        );

      case 'table':
        return (
          <div key={index} className="overflow-x-auto my-6">
            <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <tbody>
                {blockData.content?.map((row: string[], rowIndex: number) => (
                  <tr key={rowIndex} className={rowIndex === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}>
                    {row.map((cell: string, cellIndex: number) => {
                      const CellTag = rowIndex === 0 ? 'th' : 'td';
                      return (
                        <CellTag
                          key={cellIndex}
                          className={`px-4 py-3 text-left border-b border-gray-200 dark:border-gray-600 ${
                            rowIndex === 0 
                              ? 'text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider' 
                              : 'text-sm text-gray-900 dark:text-gray-100'
                          }`}
                        >
                          {cell}
                        </CellTag>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'delimiter':
        return (
          <div key={index} className="flex justify-center my-8">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        );

      case 'warning':
        return (
          <div key={index} className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 my-6 rounded-r-lg">
            <div className="flex items-center mb-2">
              <span className="text-yellow-600 dark:text-yellow-400 font-medium">⚠️ {blockData.title}</span>
            </div>
            <p className="text-yellow-800 dark:text-yellow-200">{blockData.message}</p>
          </div>
        );

      case 'embed':
        return (
          <div key={index} className="my-6">
            <div className="aspect-video">
              <iframe
                src={blockData.embed}
                title={blockData.caption || 'Embedded content'}
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>
            {blockData.caption && (
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                {blockData.caption}
              </p>
            )}
          </div>
        );

      case 'linkTool':
        return (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 my-6 hover:shadow-md transition-shadow">
            <a 
              href={blockData.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block hover:text-purple-600 dark:hover:text-purple-400"
            >
              {blockData.meta?.image && (
                <img 
                  src={blockData.meta.image} 
                  alt="" 
                  className="w-full h-32 object-cover rounded mb-3"
                />
              )}
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                {blockData.meta?.title || blockData.link}
              </h4>
              {blockData.meta?.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {blockData.meta.description}
                </p>
              )}
              <span className="text-xs text-purple-600 dark:text-purple-400">
                {blockData.link}
              </span>
            </a>
          </div>
        );

      default:
        // For unknown block types, try to render as text if possible
        if (blockData.text) {
          return (
            <div key={index} className="my-4 p-3 bg-gray-100 dark:bg-gray-800 rounded border-l-4 border-gray-400">
              <small className="text-gray-500 dark:text-gray-400">Unknown block type: {type}</small>
              <p className="text-gray-700 dark:text-gray-300">{blockData.text}</p>
            </div>
          );
        }
        return (
          <div key={index} className="my-4 p-3 bg-gray-100 dark:bg-gray-800 rounded border-l-4 border-gray-400">
            <small className="text-gray-500 dark:text-gray-400">
              Unsupported block type: {type}
            </small>
          </div>
        );
    }
  };

  if (!data || !data.blocks) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No content available</p>
      </div>
    );
  }

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {data.blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default EditorJsViewer;
