interface IToastProps {
  toastlist: Array<IToast>;
  setList: any;
}
interface IToast {
  id: number;
  type: 'warn' | 'success' | 'error';
  title: string;
  description: string;
}
