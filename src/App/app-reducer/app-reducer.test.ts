import {ApplicationStateType, appReducer, setAppError, setAppStatus} from './app-reducer';

let startState: ApplicationStateType;
beforeEach(() => {
    startState = {status: 'idle', error: null}

})

test('correct error message should be set', () => {
    const error = 'Something went wrong'
    const endState = appReducer(startState, setAppError(error))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState.status).toBe('idle')
    expect(endState.error).toBe(error)
})

test('correct status should be set', () => {
    const newStatus = 'succeeded' as const
    const endState = appReducer(startState, setAppStatus(newStatus))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState.status).toBe(newStatus)
    expect(endState.error).toBe(null)
})