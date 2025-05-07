import { getCookie } from 'cookies-next';

export function getCookiesClient() {
  if (typeof window !== 'undefined') {
    return getCookie("session");
  }
  return null;
}
