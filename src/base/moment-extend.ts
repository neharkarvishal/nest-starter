import * as momentDefault from 'moment'
import { extendMoment } from 'moment-range'

export const moment = extendMoment(momentDefault) // eslint-disable-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
