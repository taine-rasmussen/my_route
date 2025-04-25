import { useToast } from 'react-native-toast-notifications';
import { useCallback } from 'react';

const DEFAULT_OPTIONS = {
  type: 'normal',
  placement: 'bottom',
  duration: 4000,
  offset: 30,
  animationType: 'slide-in',
} as const;

const useCustomToast = () => {
  const toast = useToast();

  const showToast = useCallback(
    (message: string, options = {}) => {
      return toast.show(message, {
        ...DEFAULT_OPTIONS,
        ...options,
      });
    },
    [toast],
  );

  const showSuccess = useCallback(
    (message: string, options = {}) => {
      return toast.show(message, {
        ...DEFAULT_OPTIONS,
        type: 'success',
        ...options,
      });
    },
    [toast],
  );

  const showError = useCallback(
    (message: string, options = {}) => {
      return toast.show(message, {
        ...DEFAULT_OPTIONS,
        type: 'danger',
        ...options,
      });
    },
    [toast],
  );

  const showWarning = useCallback(
    (message: string, options = {}) => {
      return toast.show(message, {
        ...DEFAULT_OPTIONS,
        type: 'warning',
        ...options,
      });
    },
    [toast],
  );

  const showCustom = useCallback(
    (message: string, data = {}, options = {}) => {
      return toast.show(message, {
        ...DEFAULT_OPTIONS,
        type: 'custom_type',
        data,
        ...options,
      });
    },
    [toast],
  );

  const updateToast = useCallback(
    (id: string, message: string, options = {}) => {
      toast.update(id, message, {
        ...DEFAULT_OPTIONS,
        ...options,
      });
    },
    [toast],
  );

  const hideToast = useCallback(
    (id: string) => {
      toast.hide(id);
    },
    [toast],
  );

  const hideAllToasts = useCallback(() => {
    toast.hideAll();
  }, [toast]);

  return {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showCustom,
    updateToast,
    hideToast,
    hideAllToasts,
  };
};

export default useCustomToast;
