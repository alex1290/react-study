import  {Index, Experiment, Goods, Contact,Weather} from './pages';

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
        path: '/goods',
        component : Goods,
        name: '商品'
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