import { Browser, chromium } from 'playwright';

let browser: Browser | undefined = undefined;
/**
 * 获取chromium浏览器实例，如果存在，直接返回现有实例，否则创建新实例并返回
 * @returns chrominum浏览器实例
 */
export const getBrowser = async () => {
  if (!browser) {
    browser = await chromium.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
  return browser;
};
