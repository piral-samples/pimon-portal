export function formatDate(date?: null | string | number | Date) {
  return format(date, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function formatDateTime(date?: null | string | number | Date) {
  return format(date, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function format(date: undefined | null | string | number | Date, options: Intl.DateTimeFormatOptions) {
  if (date === undefined || date === null) {
    return undefined;
  }

  return new Date(date).toLocaleString(undefined, options);
}
