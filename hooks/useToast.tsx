import { useToast } from 'react-native-toast-notifications';
import { useCallback } from 'react';

const DEFAULT_OPTIONS = {
  type: 'normal',
  placement: 'bottom',
  duration: 4000,
  offset: 30,
  animationType: 'slide-in',
};

const useCustomToast = () => {
  const toast = useToast();

  const showToast = useCallback(
    (message, options = {}) => {
      return toast.show(message, {
        ...DEFAULT_OPTIONS,
        ...options,
      });
    },
    [toast],
  );

  const showSuccess = useCallback(
    (message, options = {}) => {
      return toast.show(message, {
        ...DEFAULT_OPTIONS,
        type: 'success',
        ...options,
      });
    },
    [toast],
  );

  const showError = useCallback(
    (message, options = {}) => {
      return toast.show(message, {
        ...DEFAULT_OPTIONS,
        type: 'danger',
        ...options,
      });
    },
    [toast],
  );

  const showWarning = useCallback(
    (message, options = {}) => {
      return toast.show(message, {
        ...DEFAULT_OPTIONS,
        type: 'warning',
        ...options,
      });
    },
    [toast],
  );

  const showCustom = useCallback(
    (message, data = {}, options = {}) => {
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
    (id, message, options = {}) => {
      toast.update(id, message, {
        ...DEFAULT_OPTIONS,
        ...options,
      });
    },
    [toast],
  );

  const hideToast = useCallback(
    (id) => {
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
