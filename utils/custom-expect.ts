import { expect as baseExpect } from '@playwright/test';
import { APILogger } from './logger';


let apiLogger: APILogger

export const setCustomExpectLogger = (logger: APILogger) => {
    apiLogger = logger
}

export const expect = baseExpect.extend({


})