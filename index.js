function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    const record = {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };

    // Bind methods to the record
    record.createTimeInEvent = createTimeInEvent;
    record.createTimeOutEvent = createTimeOutEvent;
    record.hoursWorkedOnDate = hoursWorkedOnDate;
    record.wagesEarnedOnDate = wagesEarnedOnDate;
    record.allWagesFor = allWagesFor;

    return record;
}

function createEmployeeRecords(arrOfArr) {
    return arrOfArr.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date
    });
    return this;
}

function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date
    });
    return this;
}

function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
    const hoursWorked = this.hoursWorkedOnDate(date);
    return hoursWorked * this.payPerHour;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

function calculatePayroll(arrEmployees) {
    return arrEmployees.reduce((total, employee) => {
        return total + employee.allWagesFor();
    }, 0);
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + this.wagesEarnedOnDate(d)
    }.bind(this), 0)

    return payable
}