import App from './App';
import {ReduxStoreProviderDecorator} from '../../stories/decorators/ReduxStoreProviderDecorator';

export default {
    title: 'App Component',
    component: App,
    decorators:[ReduxStoreProviderDecorator]
}


export const AppWithReduxBaseExample = () => {
    return <App/>
}