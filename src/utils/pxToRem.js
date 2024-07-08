function pxToRem(px) {
  const rootValue = 192 // 与postCssPxToRem配置中的rootValue保持一致
  return `${px / rootValue}rem`
}

// 计算 rem 值
export function remToPx(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

export default pxToRem
