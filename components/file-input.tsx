import React, { useCallback, useEffect } from "react";
import { Plus, Upload } from "lucide-react";
import { useDropzone, type DropzoneOptions, type FileWithPath } from "react-dropzone";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

interface IFileInputProps
  extends React.DetailedHTMLProps<
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "accept">,
    HTMLInputElement
  > {
  label?: string;
  accept: DropzoneOptions["accept"];
  setFiles?: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
  required?: boolean;
  className?: string;
  innerText?: string;
  isShowFileName?: boolean;
  errorText?: string;
  defaultDesign?: boolean;
}

export function FileInput(props: IFileInputProps) {
  const {
    accept,
    isShowFileName = true,
    required = false,
    errorText,
    defaultDesign = true,
    ...rest
  } = props;

  const { register, unregister, setValue, watch, formState } = useFormContext();

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
    if (required) {
      register(props.name as string, {
        required: required && (errorText || "This field is required"),
      });
    } else {
      unregister(props.name);
    }
  }, [props.name, formState.errors[props.name as string]?.message, required]);

  return (
    <section className="size-full">
      {props.label && (
        <label
          className="mb-2 block text-sm font-bold capitalize text-gray-700"
          htmlFor={props.name}
        >
          {props.label}
        </label>
      )}

      <div {...getRootProps()} className="h-full">
        <input {...rest} id={props.name} {...getInputProps()} />
        {defaultDesign ? (
          <section
            className={cn(
              "flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-[5px] border border-[##DDDDDD]",
              isDragActive ? "bg-[#ebf1fd]" : "bg-white",
              props.className
            )}
          >
            <div className="flex flex-col items-center gap-y-3 text-xs  ">
              {props.innerText ? (
                <p className="text-sm text-gray-700">{props.innerText}</p>
              ) : (
                <>
                  <div className="flex size-[28px] items-center justify-center rounded-full bg-[#F5F5F5]">
                    <Upload className="size-4 text-[#A020F0]" />
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="text-[#A020F0]">Click to Upload</span> or drag and
                    drop
                  </p>
                </>
              )}
            </div>
          </section>
        ) : (
          <section
            className={cn(
              "flex size-full cursor-pointer flex-col items-center justify-center",
              isDragActive ? "bg-[#ebf1fd]" : "bg-[#f9f9f9]",
              props.className
            )}
          >
            <div className="flex flex-col items-center gap-y-3 text-xs  ">
              {props.innerText ? (
                <p className="text-sm text-gray-700">{props.innerText}</p>
              ) : (
                <>
                  <Plus className="size-10 text-zinc-400" />
                </>
              )}
            </div>
          </section>
        )}

        {formState.errors[props.name as string]?.message && (
          <p className="mt-2 text-xs font-normal text-rose-500">
            {formState.errors[props.name as string]?.message as string}
          </p>
        )}

        {isShowFileName ? (
          <section className="mt-2">
            {files?.length ? (
              <ul>
                {files.map((file) => {
                  return <li key={file.name}>{file.name}</li>;
                })}
              </ul>
            ) : (
              ""
            )}
          </section>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
