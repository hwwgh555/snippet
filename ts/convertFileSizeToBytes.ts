// 文件大小字符串（如"2.0MB"）转换为字节数
export const convertFileSizeToBytes = (sizeStr: string): number => {
  if (!sizeStr) return 0;

  // 尝试直接解析为数字
  const directParse = parseInt(sizeStr);
  if (!isNaN(directParse) && directParse.toString() === sizeStr) {
    return directParse;
  }

  // 定义单位映射
  const units: Record<string, number> = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024,
  };

  // 匹配数字和单位部分
  const match = sizeStr.match(/^([\d.]+)\s*([KMGT]?B)$/i);
  if (match) {
    const size = parseFloat(match[1]);
    const unit = match[2].toUpperCase();

    // 使用类型检查确保单位存在
    if (unit in units) {
      return Math.round(size * units[unit]);
    }
  }

  // 默认返回1MB
  return 1024 * 1024;
};

/**
 * 示例
 * ```ts
 * const size = convertFileSizeToBytes('2.0MB');
 * console.log(size); // 2097152
 * ```
 */