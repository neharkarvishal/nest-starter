/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,no-param-reassign */
import * as moment from 'moment'
import * as timezone from 'moment-timezone'

export function toUTC(data: string | Date | moment.Moment): moment.Moment {
    return moment(data).utc()
}

export function toLocal(data: string | Date | moment.Moment): moment.Moment {
    return moment.utc(data).local()
}

// convert local time to another timezone
export function convertLocalToTimezone(
    localDt: string | Date,
    localDtFormat: string,
    timeZone: string,
    format = 'YYYY-MM-DD hh:mm:ss',
) {
    return timezone(localDt, localDtFormat).tz(timeZone).format(format)
}

export function getContrastColor(hex: string) {
    const threshold = 130
    const hexToRGB = (h) => {
        const hexValue = h.charAt(0) === '#' ? h.substring(1, 7) : h // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        return {
            red: parseInt(hexValue.substring(0, 2), 16),
            blue: parseInt(hexValue.substring(2, 4), 16),
            green: parseInt(hexValue.substring(4, 6), 16),
        }
    }
    const { red, green, blue } = hexToRGB(hex)
    const cBrightness = (red * 299 + green * 587 + blue * 114) / 1000

    return cBrightness > threshold ? '#000000' : '#ffffff'
}

// It will use when file uploading from angular, just pass object of with file it will convert it to from data
export function toFormData(obj: any, form?: any, namespace?: any) {
    const fd = form || new FormData() // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    let formKey

    // eslint-disable-next-line no-restricted-syntax
    for (const property in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(property) && obj[property]) {
            if (namespace) {
                formKey = `${namespace}[${property}]` // eslint-disable-line @typescript-eslint/restrict-template-expressions
            } else {
                formKey = property
            }

            // if the property is an object, but not a File, use recursively.
            if (obj[property] instanceof Date) {
                fd.append(formKey, obj[property].toISOString())
            } else if (
                typeof obj[property] === 'object' &&
                !(obj[property] instanceof File)
            ) {
                toFormData(obj[property], fd, formKey)
            } else {
                // if it's a string or a File object
                fd.append(formKey, obj[property])
            }
        }
    }
    return fd // eslint-disable-line @typescript-eslint/no-unsafe-return
}

export function progressStatus(value) {
    if (value >= 75) {
        return 'success'
    }
    if (value >= 50) {
        return 'warning'
    }
    if (value >= 25) {
        return 'info'
    }
    return 'danger'
}

export function isJsObject(object: any) {
    return object !== null && object !== undefined && typeof object === 'object'
}

export function isEmpty(value: any) {
    if (value instanceof Array) {
        value = value.filter((val) => !isEmpty(val))
        return value.length === 0
    }
    if (value && typeof value === 'object') {
        return Object.keys(value).length === 0
    }
    return (
        !value ||
        `${value}`.toLocaleLowerCase() === 'null' || // eslint-disable-line @typescript-eslint/restrict-template-expressions
        `${value}`.toLocaleLowerCase() === 'undefined' // eslint-disable-line @typescript-eslint/restrict-template-expressions
    )
}

/*
 * Get average value column in array object
 */
export function average(items: any, column: string) {
    let sum = 0
    if (items.length > 0) {
        items.forEach((item) => {
            sum += parseFloat(item[column])
        })
    }
    return sum / items.length
}

/**
 * The precision for a decimal (exact numeric applies only for decimal column), which is the maximum
 * number of digits that are stored.
 */
export function convertPrecisionFloatDigit(val: number, digit = 6) {
    return parseFloat(parseFloat(val.toString()).toFixed(digit))
}
