/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '@/components/ui/button';

function Uploader({setFiles}:any) {
  const { getRootProps, getInputProps } = useDropzone({
    // @ts-ignore
    accept: 'image/*',
    multiple: false,
    onDrop: async (acceptedFiles: any) => {
      setFiles(acceptedFiles);
    },
  });

  return (
    <div className="rounded-lg border border-solid p-4 border-gray-700 bg-light-dark sm:p-6">
      <div
        {...getRootProps({
          className:
            'border border-dashed relative border-gray-700 h-48 flex items-center justify-center rounded-lg',
        })}
      >
        <input {...getInputProps()} />
          <div className="text-center">
            <p className="mb-6 text-sm tracking-tighter text-gray-400">
              PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
            </p>
            <Button>CHOOSE FILE</Button>
          </div>
      </div>
    </div>
  );
}
export default Uploader;
