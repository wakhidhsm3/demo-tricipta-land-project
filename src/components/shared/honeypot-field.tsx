import React from 'react';

export interface HoneypotFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldName?: string;
}

/**
 * Invisible honeypot input field for detecting and mitigating automated bot form submissions.
 * Real users never see or fill this field; if filled, the submission is discarded silently.
 */
export function HoneypotField({
  value,
  onChange,
  fieldName = '_hp_verification',
}: HoneypotFieldProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        opacity: 0,
        pointerEvents: 'none',
        height: 0,
        width: 0,
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      <label htmlFor={fieldName}>Leave this field empty</label>
      <input
        type="text"
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={onChange}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
