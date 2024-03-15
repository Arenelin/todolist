import {useAppSelector} from "../../hooks/hooks";
import {RequestStatusType} from "../app-reducer/app-reducer";

export const useApp = () => {
    const status = useAppSelector<RequestStatusType>(state =>
        state.application.status)
    const isInitialized = useAppSelector<boolean>(state =>
        state.application.isInitialized)
    return {status, isInitialized}
}