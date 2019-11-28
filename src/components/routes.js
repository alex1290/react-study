import { Index, Experiment, Chess, DragList, Weather, Snake } from './pages';

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
        path: '/game',
        exact: true,
        // component: null,
        name: '遊戲',
        list: [
            {
                path: '/chess',
                component: Chess,
                name: '西洋棋'
            },
            {
                path: '/snake',
                component: Snake,
                name: '貪吃蛇'
            },
        ]
    },
    {
        path: '/draglist',
        component: DragList,
        name: '拖曳清單'
    },
    {
        path: '/weather',
        component: Weather,
        name: '天氣'
    }
];
export default routes;