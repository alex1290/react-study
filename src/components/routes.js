import { Index, Experiment, Chess, DragList, Weather } from './pages';

const routes = [
    {
        path: '/',
        exact: true,
        component: Index,
        name: '首頁'
    },
    {
        path: '/experiment',
        component: Experiment,
        name: '實驗'
    },
    {
        path: '/chess',
        component: Chess,
        name: '西洋棋'
    },
    {
        path: '/draglist',
        component: DragList,
        name: '拖曳清單'
    }, {
        path: '/weather',
        component: Weather,
        name: '天氣'
    }
];
export default routes;