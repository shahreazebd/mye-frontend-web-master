import React, { useCallback, useEffect } from "react";
import { UploadCloud } from "lucide-react";
import { useDropzone, type DropzoneOptions, type FileWithPath } from "react-dropzone";
import { useFormContext } from "react-hook-form";

interface IFileInputProps
  extends React.DetailedHTMLProps<
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "accept">,
    HTMLInputElement
  > {
  label?: string;
  accept: DropzoneOptions["accept"];
  setFiles?: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
  isImageUpload?: boolean;
  className?: string;
}

export default function FileInput(props: IFileInputProps) {
  const { accept, isImageUpload = false, className, ...rest } = props;

  const { register, unregister, setValue, watch, formState } = useFormContext();

  const errorMessage = formState.errors[props.name as string]?.message;

  const files: FileWithPath[] = watch(props.name as string);

  // @ts-ignore
  const onDrop = useCallback<DropzoneOptions["onDrop"]>(
    (droppedFiles) => {
      setValue(props.name as string, droppedFiles, { shouldValidate: true });
      props.setFiles?.(droppedFiles);
    },
    [setValue, props.name]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept,
    multiple: false,
  });

  useEffect(() => {
    register(props.name as string, {
      required: "Please input",
    });
    return () => {
      unregister(props.name);
    };
  }, [register, unregister, props.name]);

  return (
    <section>
      {props.label && (
        <label
          className="mb-2 block text-sm font-bold capitalize text-gray-700"
          htmlFor={props.name}
        >
          {props.label}
        </label>
      )}

      <div {...getRootProps()}>
        <input {...rest} id={props.name} {...getInputProps()} />

        <section
          className={`flex h-[52] w-full cursor-pointer flex-col items-center justify-center rounded border border-dashed border-[#384EB7] ${
            isDragActive ? "bg-[#e8e8fa]" : "bg-[#F8F8FF]"
          } ${className ? className : "py-6"}`}
        >
          <UploadCloud color="#483EA8" strokeWidth={1} size={40} />
          <p className="m-0 text-base font-semibold">
            Drag & drop files or <span className="text-[#483EA8] underline">Browse</span>
          </p>
          {!isImageUpload && (
            <p className="mt-2 text-xs font-normal text-[#676767]">
              Supported formats: Only .csv
            </p>
          )}
        </section>

        {errorMessage && (
          <p className="mt-2 text-sm font-medium text-destructive">
            {errorMessage as string}
          </p>
        )}

        {!isImageUpload && (
          <section className="mt-2">
            {files?.length > 0 && (
              <ul>
                {files.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </section>
  );
}
