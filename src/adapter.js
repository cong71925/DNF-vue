function BufferDataAdapter (buff, job, boost, favoritism) {
  var result = {}
  var buffer = {
    boost: 1,
    favoritism: 1
  }
  switch (job) {
    case '炽天使':
      buffer.boost = 1.3
      break
    case '神思者':
      buffer.boost = 1
      break
    case '冥月女神':
      buffer.boost = 1.25
      buffer.favoritism = 1.15
      break
  }
  if (!boost) {
    buffer.boost = 1
  }
  if (!favoritism) {
    buffer.favoritism = 1
  }
  result.buff_default = Number((Number(buff.buff_default) * buffer.boost * buffer.favoritism).toFixed(0))
  result.buff_atk = Number((Number(buff.buff_atk) * buffer.boost * buffer.favoritism).toFixed(0))
  return result
}
export default {
  BufferDataAdapter
}
