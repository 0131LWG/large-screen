export const sortArray = (array, index) => {
  // 将数组分成两部分
  const firstPart = array.slice(0, index)
  const secondPart = array.slice(index)

  // 合并数组，将点击的值移到中间
  const midIndex = Math.floor(array.length / 2) + 1
  const newArray = secondPart.concat(firstPart)
  console.log("---------", newArray.slice(midIndex).concat(newArray.slice(0, midIndex)))

  // 旋转数组，使点击的值在中间位置
  return newArray.slice(midIndex).concat(newArray.slice(0, midIndex))
}
