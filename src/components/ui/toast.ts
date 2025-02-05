import toast from 'react-hot-toast';

export const ErrorToast = (message: string) => {
  return toast.error(message, {
    style: {
      border: '1px solid #d32f2f',
      padding: '16px',
      color: '#d32f2f',
    },
    iconTheme: {
      primary: '#d32f2f',
      secondary: '#FFFAEE',
    },
  });
};
