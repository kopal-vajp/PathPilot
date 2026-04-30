"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Document, Packer, Paragraph, TextRun } from "docx";

const CoverLetterPreview = ({ content }) => {
  const downloadAsWord = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: content.split("\n").map((line) => {
            return new Paragraph({
              children: [new TextRun(line)],
              spacing: { after: 120 },
            });
          }),
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cover-letter.docx";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-4 space-y-4">
      <div className="flex justify-end">
        <Button onClick={downloadAsWord}>
          <Download className="w-4 h-4 mr-2" />
          Download as Word (.docx)
        </Button>
      </div>
      <MDEditor value={content} preview="preview" height={700} />
    </div>
  );
};

export default CoverLetterPreview;
