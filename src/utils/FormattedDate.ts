const setFormattedDate = (date: Date) => {
  const formatDate = new Date(date);
  return new Intl.DateTimeFormat("ru", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(formatDate)
    .toString();
};

const formattedDateHeader = (date: Date) => {
  let month = date.toLocaleString('ru', {month: 'long'});
  
  if (date.getFullYear() !== new Date().getFullYear()) {
      month += ` ${date.getFullYear()}`;
  }

  return month;
};



const formattedDateText = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Сегодня';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Вчера';
  } else {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    const formatter = new Intl.DateTimeFormat('ru-RU', options);
    let result = formatter.format(date);

    result = result.charAt(0).toUpperCase() + result.slice(1);

    if (date.getFullYear() !== new Date().getFullYear()) {
        result += ` ${date.getFullYear()}`;
    }
    
    return result;
  }
}



export const toFormattedDate = { setFormattedDate, formattedDateHeader, formattedDateText };