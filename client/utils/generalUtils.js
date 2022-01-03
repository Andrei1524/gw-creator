import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const friendlyUrl = (url) => {
  return url.replace(/\s/g , "-")
}

export const computeTimeLeft = (endDate) => {
  console.log(endDate)
  return dayjs(endDate).fromNow()
}
