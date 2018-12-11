export function processContent(content) {
  switch (content.frequency) {
    case 'weekly' :
      return calculatePayment(content, 7);
    case 'fortnightly' :
      return calculatePayment(content, 14);
    case 'monthly' :
      return calculatePayment(content, 28);
    default :
      return [];
  }
}

function calculatePayment(content, periods) {

  let payment_slice = [];
  let period_start_date;
  let end_date;
  let number_of_days;
  let period_end_date;
  let rent;
  let rent_per_day;

  //Fisrt Period
  period_start_date = new Date(content.start_date);
  end_date = new Date(content.end_date);
  end_date.setHours(period_start_date.getHours());
  number_of_days = roundPaymentDays(weekdayToNumber(content.payment_day) - period_start_date.getDay() + 1);
  period_end_date = addDays(period_start_date, number_of_days - 1);
  rent_per_day = Math.round(content.rent / periods);
  rent = rent_per_day * number_of_days;
  payment_slice.push({period_start_date, period_end_date, number_of_days, rent});

  //Middle Period
  number_of_days = periods;
  while (end_date >= addDays(period_end_date, periods)) {
    period_start_date = addDays(period_end_date, 1);
    period_end_date = addDays(period_end_date, periods);
    rent = content.rent;
    payment_slice.push({period_start_date, period_end_date, number_of_days, rent});
  }

  //Last Period
  if (period_end_date.toDateString() !== end_date.toDateString()) {
    period_start_date = addDays(period_end_date, 1);
    period_end_date = end_date;
    number_of_days = minusDays(end_date, period_start_date);
    rent = rent_per_day * number_of_days;
    payment_slice.push({period_start_date, period_end_date, number_of_days, rent});
  }

  return payment_slice;
}

function roundPaymentDays(payment_days) {
  if (payment_days < 0)
    payment_days += 7;
  return payment_days;
}

function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function minusDays(end, start) {
  const one_day = 1000*60*60*24;
  return Math.round((end - start) / one_day);
}

function weekdayToNumber(daystring) {
  const days = {'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4, 'friday': 5, 'saturday': 6, 'sunday': 0};
  return days[daystring];
}