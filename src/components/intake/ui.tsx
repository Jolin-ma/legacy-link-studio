"use client";

import type { ChangeEvent, ReactNode } from "react";

export function FieldShell({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/60">
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </span>
      {hint ? (
        <span className="mt-1 block font-sans text-[13px] italic text-charcoal/40">
          {hint}
        </span>
      ) : null}
      <div className="mt-3">{children}</div>
    </label>
  );
}

const inputBase =
  "w-full border-0 border-b hairline bg-transparent pb-3 font-display text-2xl md:text-3xl text-charcoal placeholder:text-charcoal/25 focus:outline-none focus:border-gold transition-colors duration-300";

export function TextField({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      className={inputBase}
    />
  );
}

export function TextAreaField({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      className="w-full resize-none border-0 border-b hairline bg-transparent pb-3 font-sans text-lg leading-relaxed text-charcoal placeholder:text-charcoal/25 focus:outline-none focus:border-gold transition-colors duration-300"
    />
  );
}

export function SelectField({
  value,
  onChange,
  options,
  placeholder = "Select one",
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputBase} appearance-none cursor-pointer bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23AD8A56%22 stroke-width=%221.5%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:20px] bg-[right_0.25rem_center] bg-no-repeat pr-8`}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function RadioGroup({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; description?: string }[];
}) {
  return (
    <div className="space-y-4">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            type="button"
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`block w-full border-b hairline pb-4 pt-1 text-left transition-colors duration-300 ${
              active ? "border-gold" : ""
            }`}
          >
            <span className="flex items-center gap-3">
              <span
                className={`h-2.5 w-2.5 rounded-full border transition-colors duration-300 ${
                  active ? "border-gold bg-gold" : "border-charcoal/30"
                }`}
              />
              <span className="font-display text-xl text-charcoal">
                {opt.label}
              </span>
            </span>
            {opt.description ? (
              <span className="mt-1 block pl-[22px] font-sans text-sm text-charcoal/60">
                {opt.description}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export function FileDropField({
  label,
  hint,
  accept,
  multiple = true,
  files,
  onChange,
}: {
  label: string;
  hint?: string;
  accept?: string;
  multiple?: boolean;
  files: File[];
  onChange: (files: File[]) => void;
}) {
  return (
    <FieldShell label={label} hint={hint}>
      <label className="flex cursor-pointer flex-col items-start border-b hairline pb-6 pt-2 transition-colors duration-300 hover:border-gold">
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => onChange(Array.from(e.target.files ?? []))}
        />
        <span className="font-sans text-[13px] uppercase tracking-wider2 text-gold">
          {files.length > 0 ? "Add more" : "Choose files"}
        </span>
        <span className="mt-2 font-sans text-sm text-charcoal/60">
          {files.length > 0
            ? `${files.length} file${files.length === 1 ? "" : "s"} selected`
            : "Nothing selected yet"}
        </span>
      </label>
    </FieldShell>
  );
}
