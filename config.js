class AnonymousCalendar {
  get_name() {
    return "AnonymousCalendar";
  }

  define_css_classes() {
  }

  lookup_css_classes(box, today_date) {
    if (box.start_date < today_date)
        return "filled-box";
    else
        return "empty-box";
  }

  // If we're too lazy to do classes, just tack on an inline style.
  lookup_css_style(box) {
    if (box.fractional_years < 5.5) // early years
        return "rgba(173, 216, 230, 0.5)";
    if (box.fractional_years < 11.5) // elementary school
        return "rgba(0, 128, 0, 0.5)";
    if (box.fractional_years < 14.5) // middle school
        return "rgba(255, 255, 0, 0.5)";
    if (box.fractional_years < 18.5) // high school
        return "rgba(255, 165, 0, 0.5)";
    if (box.fractional_years < 22.5) // college
        return "rgba(255, 192, 203, 0.5)";
    if (box.fractional_years < 62) // career
        return "rgba(0, 128, 128, 0.4)";

    return "transparent";
  }

  start_date() {
    return new Date(Date.UTC(2000, 7, 22));
  }
};

class DaCalendar extends AnonymousCalendar {
  get_name() {
    return "Leonardo da Vinci";
  }

  lookup_css_style(box) {
    if (box.start_date >= new Date(1455, 3, 15)
    && box.start_date < new Date(1467, 0, 1)) // pre-apprenticeship life
        return "rgba(255, 255, 255, 0.6)";
    if (box.start_date >= new Date(1472, 7, 16)
    && box.start_date < new Date(1472, 10, 11)) // apprenticeship
        return "rgba(0, 128, 0, 0.5)";
    if (box.start_date >= new Date(1476, 3, 9)
    && box.start_date < new Date(1476, 5, 16)) // embarassing court case
        return "rgba(95, 37, 159, 0.5)";
    if (box.start_date < new Date(1482, 6, 23)) // florence => milan
        return "rgba(196, 18, 48, 0.3)";
    if (box.start_date >= new Date(1482, 6, 23)
    && box.start_date < new Date(1500, 11, 24)) // milan => florence
        return "rgba(0, 125, 196, 0.4)";

    return "transparent";
  }

  start_date() {
    return new Date(Date.UTC(1452, 3, 15));
  }

  end_date() {
    return new Date(Date.UTC(1519, 4, 2));
  }
};


/**
 * "Read" the query string for this static page,
 * and decide which (type) of calendar to instantiate.
 *
 * To do this, load the page URL as `index.html?config=davinci`
 */
const urlParams = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop,)
});

console.log(`Looking for calendar: ${urlParams.config}`);

let targetCalendar = new AnonymousCalendar();

if (urlParams.config == "davinci") {
  targetCalendar = new DaCalendar();
}
