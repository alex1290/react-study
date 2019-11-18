import  {Index, Experiment, Chess, Contact,Weather} from './pages';

const routes = [
    {
        path: '/',
        exact: true,
        component : Index,
        name: '首頁'
    },
    {
        path: '/experiment',
        component : Experiment,
        name: '實驗'
    },
    {
        path: '/chess',
        component : Chess,
        name: '西洋棋'
    },
    {
        path: '/contact',
        component : Contact,
        name: '聯絡方式'
    },{
        path: '/weather',
        component : Weather,
        name: '天氣'
    }
];
export default routes;