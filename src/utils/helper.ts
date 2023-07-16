import { LoggedAdmin, LoggedUser } from '../types/types';

type storageField = 'user' | 'admin';

function addToLocalStorage(
  field: storageField,
  data: LoggedUser | LoggedAdmin,
) {
  localStorage.setItem(field, JSON.stringify(data));
}

function removeFromLocalStorage(field: storageField) {
  localStorage.removeItem(field);
}

function getFromLocalStorage(
  field: 'user' | 'admin',
): LoggedUser | LoggedAdmin | null {
  //@ts-ignore
  return JSON.parse(localStorage.getItem(field));
}

function isInViewport(element: Element, offset?: number) {
  if (!element) {
    return false;
  }
  let rec = element.getBoundingClientRect();
  return rec.top - (offset || 50) < window.innerHeight;
}

export function showElement(element: Element, offset?: number) {
  if (!element) return;
  if (isInViewport(element, offset)) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}

export function scrollListenerAndCleanUp(func: () => void) {
  document.addEventListener('scroll', func);
  return () => {
    document.removeEventListener('scroll', func);
  };
}

export { addToLocalStorage, removeFromLocalStorage, getFromLocalStorage };
