'use client';

import { useState, useCallback, useRef } from 'react';
import { z } from 'zod';
import { openWhatsApp } from '@/lib/whatsapp';
import { FORM_SETTINGS } from '@/lib/config/ui.constants';
import { formatZodErrors } from '@/lib/utils';

export interface UseWhatsAppFormOptions<TValues, TSchema extends z.ZodTypeAny> {
  /** Initial form values */
  initialValues: TValues;
  /** Zod validation schema */
  schema: TSchema;
  /** WhatsApp destination phone number */
  phone: string;
  /** Builder function returning the formatted WhatsApp message string */
  buildMessage: (values: z.infer<TSchema>) => string;
  /** Optional server action to persist leads and execute server-side validation/webhook */
  serverAction?: (
    values: z.infer<TSchema>
  ) => Promise<{ success: boolean; whatsappUrl?: string; message?: string; fieldErrors?: Record<string, string> } | void>;
  /** Optional custom success callback */
  onSuccess?: (values: z.infer<TSchema>) => void;
  /** Optional transform before validation if needed */
  transformValues?: (values: TValues) => Record<string, unknown>;
  /** Cooldown time in ms between submission attempts (default: FORM_SETTINGS.SUBMIT_COOLDOWN_MS) */
  cooldownMs?: number;
}

export function useWhatsAppForm<TValues extends Record<string, unknown>, TSchema extends z.ZodTypeAny>({
  initialValues,
  schema,
  phone,
  buildMessage,
  serverAction,
  onSuccess,
  transformValues,
  cooldownMs = FORM_SETTINGS.SUBMIT_COOLDOWN_MS,
}: UseWhatsAppFormOptions<TValues, TSchema>) {
  const [values, setValues] = useState<TValues>(initialValues);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastSubmitTimeRef = useRef<number>(0);

  const setValue = useCallback(<K extends keyof TValues>(key: K, value: TValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (prev[key as string]) {
        const next = { ...prev };
        delete next[key as string];
        return next;
      }
      return prev;
    });
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSuccess(false);
    setIsSubmitting(false);
    setHoneypot('');
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Throttling / anti-rapid clicking protection
      const now = Date.now();
      if (now - lastSubmitTimeRef.current < cooldownMs || isSubmitting) {
        return;
      }
      lastSubmitTimeRef.current = now;

      // Silent honeypot bot trap
      if (honeypot.trim() !== '') {
        setIsSuccess(true);
        return;
      }

      setErrors({});
      setIsSubmitting(true);

      try {
        const dataToValidate = transformValues ? transformValues(values) : values;
        const validation = schema.safeParse(dataToValidate);

        if (!validation.success) {
          setErrors(formatZodErrors(validation.error));
          setIsSubmitting(false);
          return;
        }

        let customWaUrl: string | undefined;

        // If server action provided, execute for audit logging, validation & lead persistence
        if (serverAction) {
          try {
            const result = await serverAction(validation.data);
            if (result && !result.success) {
              if (result.fieldErrors) {
                setErrors(result.fieldErrors);
                setIsSubmitting(false);
                return;
              }
            }
            if (result && result.whatsappUrl) {
              customWaUrl = result.whatsappUrl;
            }
          } catch (err) {
            console.warn('[useWhatsAppForm] Server action fallback:', err);
          }
        }

        setIsSuccess(true);

        if (customWaUrl && typeof window !== 'undefined') {
          window.open(customWaUrl, '_blank', 'noopener,noreferrer');
        } else {
          const message = buildMessage(validation.data);
          openWhatsApp({
            phone,
            message,
          });
        }

        if (onSuccess) {
          onSuccess(validation.data);
        }
      } finally {
        setTimeout(() => {
          setIsSubmitting(false);
        }, FORM_SETTINGS.SUBMIT_RESET_DELAY_MS);
      }
    },
    [honeypot, isSubmitting, cooldownMs, values, transformValues, schema, serverAction, buildMessage, phone, onSuccess]
  );

  return {
    values,
    setValues,
    setValue,
    honeypot,
    setHoneypot,
    errors,
    setErrors,
    isSuccess,
    setIsSuccess,
    isSubmitting,
    resetForm,
    handleSubmit,
  };
}
