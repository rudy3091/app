export function bootstrapCss(strings: TemplateStringsArray, ...values: (string | (() => string))[]) {
  const style = Array.from(strings).reduce((acc, cur, i) => {
    const value = values[i];
    if (typeof value === 'function') {
      return acc + cur + value();
    }
    return acc + cur + (value ?? '');
  }, '');
  const styleTag = document.querySelector('style');
  if (styleTag && style) styleTag.innerHTML += style + '\n';
  else {
    const styleTag = document.createElement('style');
    styleTag.innerHTML += style + '\n';
    document.head.appendChild(styleTag);
  }
}

export interface Clonable<T> {
  clone(): T;
}
