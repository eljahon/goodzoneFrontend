export function timeDiffCalc(dateFuture) {
    const dateNow = Math.abs(new Date())
    dateFuture = Date.parse(dateFuture)

    if (dateNow > dateFuture) {
        return {
            days: 0,
            hours: 0,
            minutes: 0
        }
    }

    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = {
        days,
        hours,
        minutes
    }

    return difference;
  }