// 阿拉伯数字转中文数字（1-99）
function numberToChinese(num: number): string {
  const cnNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  if (num < 10) return cnNums[num];
  if (num < 20) return '十' + (num % 10 === 0 ? '' : cnNums[num % 10]);
  if (num < 100) {
    const tens = Math.floor(num / 10);
    const units = num % 10;
    return cnNums[tens] + '十' + (units === 0 ? '' : cnNums[units]);
  }
  return num.toString(); // 超过99直接返回原数字
}numberToChinesenumberToChinese