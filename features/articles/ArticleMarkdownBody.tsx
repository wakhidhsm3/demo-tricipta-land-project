import React from 'react';

export interface ArticleMarkdownBodyProps {
  content: string;
}

function renderFormattedText(text: string): React.ReactNode {
  // Regex to match **bold** and *italic*
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className="italic text-slate-800">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

export function ArticleMarkdownBody({ content }: ArticleMarkdownBodyProps) {
  // Split raw markdown into logical blocks by double newlines or lines
  const rawBlocks = content
    .split('\n\n')
    .map((b) => b.trim())
    .filter(Boolean);

  // Flatten blocks into logical elements (headings, paragraphs, lists, quotes)
  const blocks: { type: 'h2' | 'h3' | 'quote' | 'list' | 'paragraph'; content: string | string[] }[] = [];

  rawBlocks.forEach((block) => {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);

    let currentList: string[] = [];

    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        if (currentList.length > 0) {
          blocks.push({ type: 'list', content: currentList });
          currentList = [];
        }
        blocks.push({ type: 'h2', content: line.replace('## ', '').trim() });
      } else if (line.startsWith('### ')) {
        if (currentList.length > 0) {
          blocks.push({ type: 'list', content: currentList });
          currentList = [];
        }
        blocks.push({ type: 'h3', content: line.replace('### ', '').trim() });
      } else if (line.startsWith('> ')) {
        if (currentList.length > 0) {
          blocks.push({ type: 'list', content: currentList });
          currentList = [];
        }
        blocks.push({ type: 'quote', content: line.replace('> ', '').trim() });
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        currentList.push(line.replace(/^[-*]\s*/, '').trim());
      } else {
        if (currentList.length > 0) {
          blocks.push({ type: 'list', content: currentList });
          currentList = [];
        }
        blocks.push({ type: 'paragraph', content: line });
      }
    });

    if (currentList.length > 0) {
      blocks.push({ type: 'list', content: currentList });
    }
  });

  return (
    <div className="flex flex-col gap-4 text-base sm:text-lg text-slate-700 font-sans leading-relaxed">
      {blocks.map((block, idx) => {
        // H2 Section Heading
        if (block.type === 'h2') {
          return (
            <h2
              key={idx}
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-6 pt-4 border-t border-dashed border-slate-200"
            >
              {renderFormattedText(block.content as string)}
            </h2>
          );
        }

        // H3 Subheading
        if (block.type === 'h3') {
          return (
            <h3
              key={idx}
              className="font-serif text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-5 mb-1"
            >
              {renderFormattedText(block.content as string)}
            </h3>
          );
        }

        // Callout Blockquote
        if (block.type === 'quote') {
          return (
            <blockquote
              key={idx}
              className="border-l-4 border-emerald-700 pl-4 py-2 my-3 font-serif italic text-slate-800 text-base sm:text-lg bg-emerald-50/40 rounded-r-xl"
            >
              &ldquo;{renderFormattedText(block.content as string)}&rdquo;
            </blockquote>
          );
        }

        // Natural Clean Bullet List
        if (block.type === 'list') {
          const items = block.content as string[];
          return (
            <ul key={idx} className="list-disc list-outside pl-6 space-y-2 my-2 text-slate-700">
              {items.map((item, itemIdx) => (
                <li key={itemIdx} className="leading-relaxed pl-1 marker:text-emerald-700">
                  {renderFormattedText(item)}
                </li>
              ))}
            </ul>
          );
        }

        // Regular Natural Paragraph
        return (
          <p key={idx} className="text-slate-700 leading-relaxed">
            {renderFormattedText(block.content as string)}
          </p>
        );
      })}
    </div>
  );
}
