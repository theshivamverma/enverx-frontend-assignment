export const formatDate = (inputDate: Date) => {
  let date: string | number = inputDate.getDate();
  let month: string | number = inputDate.getMonth() + 1;
  let year: string | number = inputDate.getFullYear();

  if (date < 10) {
    date = "0" + date;
  }

  if (month < 10) {
    month = "0" + month;
  }

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");

  return `${date}/${month}/${year}`;
}