# React 筆記

## 前言
需要了解:

1. ES6 
2. NodeJs 的 NPM 

語法規則:

1. 物件、屬性命名規則通常使用小駝峰
2. 使用JSX撰寫標籤語法 
3. 在 {} 內使用變數

## Component
必須先 import React 進入檔案:
```
    import React from 'react';
```
在 React 中有兩種類型的組件，命名規則第一個字母通常為大寫，皆必須有元素 return 出來，return 出來的元素若有多個，外面需要包一層。

### class
```
    class App extends React.Component {
        //存放component的狀態資料
        state = {  
                "example":"Hello World" 
            }
        render() {
            return (
                <div> //包一層
                    <h1>{this.state.example}</h1> //使用變數用 {} 包起來
                    <Container /> //使用名為Container的組件
                </div>
            )
        }
    } 

    //props: <App yeee="123"/> 那麼在裡面console.log(this.props.yeee) -> 123
```


### stateless function 
```
    const  StatelessComponent = props => <div className="sample">{props.example}</div>;
```

###### [兩種Component的差別](https://reurl.cc/GkNAkG)

###### 當props過多時通常會這樣撰寫，以方便閱讀:
```
    <div
        helloWorld="this"
        is="example"
        example={sample}
    >anythiong</div>
```
## Render Element
渲染出網頁
``` 
    import ReactDOM from 'react-dom';
    ReactDOM.render(
        App, 
        document.getElementById('root')
    );
    //在#root渲染出App組件
```

## 生命週期
區分為三種時期,建立、更新、移除，時間依序排列如下

   1. Mounting
       * componentWillMount() 
       * componentDidMount() 
   2. Updating
       * componentWillReceiveProps()
       * shouldComponentUpdate()
       * componentWillUpdate()
       * componentDidUpdate()
   3. Unmoubting
       * componentWillUnmount()

*Ajax 非同步請在 componentDidMount()執行*


***


# React 開發使用套件
以下為常用到的套件，安裝NodeJs後，在終端機輸入以下名稱就能安裝
`npm install tittleName`

## 1. [create-react-app](https://github.com/facebook/create-react-app)
[簡介](https://github.com/alex1290/react-study/blob/master/guide/create-react-app.md) </br >
用來快速建立 React 開發環境。

## 2. [semantic-ui-react](https://react.semantic-ui.com/)
類似 bootstrap 提供多種組件以及 layout 以供取用。

## 3. react-router
[簡介](https://github.com/alex1290/react-study/blob/master/guide/react-router.md) </br >
提供路由，方便寫出SPA。

## 4. [redux](https://chentsulin.github.io/redux/)
[簡介](https://github.com/alex1290/react-study/blob/master/guide/redux.md) </br >
提供一個state容器，方便維護、除錯，不用一個個找是哪個 Component 的 state 出了問題。 

## 5. immutable
[簡介](https://github.com/alex1290/react-study/blob/master/guide/immutable.md) </br >
提供immutable的資料，解決JS修改資料複製的值也會修改到原本的值問題。

## 6. history
[簡介](https://github.com/alex1290/react-study/blob/master/guide/history.md) </br >
提供管理 history session 的功能。

## 7. react-lazyload
[簡介](https://github.com/alex1290/react-study/blob/master/guide/react-lazyload.md) </br >
提供延遲載入，先載入重要的部分，提高效能。

