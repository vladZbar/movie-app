export const genresFilter = (ids, genres) => genres.filter((obj) => ids.includes(obj.id))

export const formatDesc = (desc, title, genres) => {
  const arr = desc.split(' ')
  const titleAtt = title.split(' ')

  let result = ''

  if (window.innerWidth < 1120) {
    result =
      arr
        .slice(0, 35)
        .join(' ')
        .replace(/[,.!?]$/, '') + '...'
    return result
  }

  if (titleAtt.length > 4) {
    result =
      arr
        .slice(0, 15)
        .join(' ')
        .replace(/[,.!?]$/, '') + '...'
    return result
  }

  if (genres.length >= 4) {
    result =
      arr
        .slice(0, 20)
        .join(' ')
        .replace(/[,.!?]$/, '') + '...'
    return result
  }

  result =
    arr
      .slice(0, 25)
      .join(' ')
      .replace(/[,.!?]$/, '') + '...'
  return result
}
