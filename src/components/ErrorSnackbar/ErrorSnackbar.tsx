import React from 'react';
import {notification} from 'antd';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setAppError} from '../../App/app-reducer/app-reducer';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const ErrorSnackbar: React.FC = () => {
    const [api, contextHolder] = notification.useNotification();
    const error = useAppSelector(state => state.application.error)
    const dispatch = useAppDispatch()

    if (error !== null) {
        const openNotificationWithIcon = (type: NotificationType) => {
            api[type]({
                message: 'Error!',
                description: `${error}`,
                onClose: () => dispatch(setAppError(null)),
                duration: 5
            });
        };
        openNotificationWithIcon('error')
    }

    return (
        <>
            {contextHolder}
        </>
    );
};

