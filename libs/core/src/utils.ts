/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access */
import { IUser } from '@app/interfaces'

import * as fs from 'fs'
import { sample } from 'lodash'
import * as moment from 'moment'
import * as os from 'os'
import * as path from 'path'

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Utils {
    export function generatedLogoColor() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return sample(['#269aff', '#ffaf26', '#8b72ff', '#0ecc9D']).replace('#', '')
    }
}

export const getDummyImage = (width: number, height: number, letter: string) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `https://dummyimage.com/${width}x${height}/${Utils.generatedLogoColor()}/ffffff.jpg&text=${letter}`
}

export const getUserDummyImage = (user: IUser) => {
    const firstNameLetter = user.firstName
        ? user.firstName.charAt(0).toUpperCase()
        : ''
    if (firstNameLetter) {
        return getDummyImage(330, 300, firstNameLetter)
    }
    const firstCityLetter = user.email.charAt(0).toUpperCase()

    return getDummyImage(330, 300, firstCityLetter)
}

export function reflect(promise) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    return promise.then(
        (data) => ({ data, status: 'fulfilled' }), // eslint-disable-line @typescript-eslint/no-unsafe-assignment

        (error) => ({ error, status: 'rejected' }), // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    )
}

/**
 * To calculate the last day of a month, we need to set date=0 and month as the next month.
 * So, if we want the last day of February (February is month = 1) we'll need to perform 'new Date(year, 2, 0).getDate()'
 */
export function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate() // eslint-disable-line @typescript-eslint/restrict-plus-operands
}

export function arrayToObject(array, key, value) {
    return array.reduce((prev, current) => {
        return {
            ...prev,
            [current[key]]: current[value],
        }
    }, {})
}

/*
 * To convert unix timestamp to datetime using date format
 */
export function unixTimestampToDate(timestamps, format = 'YYYY-MM-DD HH:mm:ss') {
    const millisecond = 1000
    return moment.unix(timestamps / millisecond).format(format)
}

/*
 * To convert any datetime to any datetime format
 */
export function convertToDatetime(datetime, format = 'YYYY-MM-DD HH:mm:ss') {
    if (moment(datetime).isValid()) {
        return moment(datetime).format(format)
    }

    return null
}

export async function tempFile(prefix) {
    const tempPath = path.join(os.tmpdir(), prefix)
    const folder = await fs.promises.mkdtemp(tempPath)
    return path.join(folder, prefix + moment().unix() + Math.random() * 10000) // eslint-disable-line @typescript-eslint/restrict-plus-operands
}
