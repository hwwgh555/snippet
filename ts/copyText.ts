const copyTextInDom = (dom) => {
  const range = document.createRange();

  range.selectNode(dom);
  window?.getSelection().removeAllRanges();
  window?.getSelection().addRange(range);

  return new Promise((resolve) => {
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    resolve(dom.innerText);
  })
}

// 复制到剪切板
export const copyText = (text: string | HTMLElement) => {
  // 复制 dom 内文本
  if (typeof text !== 'string') return copyTextInDom(text)
  // 高级 API直接复制文本（需要 https 环境）
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
  }
  // 通过把文本写入 dom, 间接通过选中 dom 复制文本
  const areaDom = document.createElement("textarea");
  // 设置样式使其不在屏幕上显示
  areaDom.style.position = 'absolute';
  areaDom.style.left = '-9999px';
  areaDom.value = text;
  document.body.appendChild(areaDom);

  return copyTextInDom(areaDom).then((str) => {
    document.body.removeChild(areaDom);
  })
};