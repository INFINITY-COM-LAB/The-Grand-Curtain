import { useState, useCallback } from 'react';

export interface EmailSubmitState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useEmailSubmit() {
  const [state, setState] = useState<EmailSubmitState>({
    isLoading: false,
    error: null,
    success: false,
  });

  const validateEmail = useCallback((email: string): boolean => {
    if (!email.trim()) {
      setState(prev => ({ ...prev, error: 'Email is required' }));
      return false;
    }
    if (!EMAIL_REGEX.test(email)) {
      setState(prev => ({ ...prev, error: 'Please enter a valid email address' }));
      return false;
    }
    return true;
  }, []);

  const submitEmail = useCallback(async (email: string): Promise<boolean> => {
    if (!validateEmail(email)) {
      return false;
    }

    setState({ isLoading: true, error: null, success: false });

    try {
      // TODO: Connect to real backend
      // const res = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      // if (!res.ok) throw new Error('Failed to subscribe');

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      setState({ isLoading: false, error: null, success: true });
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      setState({ isLoading: false, error: errorMsg, success: false });
      return false;
    }
  }, [validateEmail]);

  const reset = useCallback(() => {
    setState({ isLoading: false, error: null, success: false });
  }, []);

  return { ...state, submitEmail, validateEmail, reset };
}
