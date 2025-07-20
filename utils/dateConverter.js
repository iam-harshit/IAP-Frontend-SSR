export const getMonthAndYear = (dateString) => {
    // Convert the date string to a Date object
    const dateObj = new Date(dateString)
    // Get month name and year from the date object
    const month = dateObj.toLocaleString('default', { month: 'short' })
    const year = dateObj.getFullYear()
    return [month, year]
  }

  