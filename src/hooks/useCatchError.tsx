import { useEffect } from 'react';
import { uploadError } from '../utils';

export function useCatchError() {
  useEffect(() => {
    const fn = (args: any) => {
      console.log('普通错误', args);
      uploadError(args);
    };
    // const promiseError = (args: PromiseRejectionEvent) => {
    //   // console.log('promise error', args);
    //   const tempError = new Error(args.reason.message);
    //   tempError.stack = args.reason.stack;
    //   throw tempError;
    // };
    window.addEventListener('error', fn);
    // window.addEventListener('unhandledrejection', promiseError);
    return () => {
      window.removeEventListener('error', fn);
      // window.removeEventListener('unhandledrejection', promiseError);
    };
  }, []);
}
