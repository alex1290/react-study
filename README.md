# React
裡面命名通常使用小駝峰，使用JSX撰寫標籤語法，使用變數用 {} 包起來，

## 兩種Component
```
    import React from 'react';
```
皆必須有元素 return 出來，returnt 出來的元素必為一個，若有多個元素必須外面包一層
名稱第一個字使用大寫

### class
```
    class App extends React.Component {
        coonstructor(props){
            super(props); //使constuctor接的到props的值
            this.state = {
                "example":"Hello World"
            }
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

## Render Element
``` 
    import ReactDOM from 'react-dom';
    ReactDOM.render(
        App, 
        document.getElementById('root')
    );
    //在#root渲染出App組件
}
```

## 生命週期
區分為三種時期,建立、更新、移除，時間依序排列如下
  1. Mounting
   - componentWillMount() 
   - componentDidMount() 
  2. Updating
   - componentWillReceiveProps()
   - shouldComponentUpdate()
   - componentWillUpdate()
   - componentDidUpdate()
  3. Unmoubting
   - componentWillUnmount()

*Ajax 非同步請在 componentDidMount()執行*

***

# React 開發使用套件

## [Create React App](https://github.com/facebook/create-react-app)
[簡介](https://github.com/alex1290/react-study/blob/master/guide/create-react-app.md) </br >
用來快速建立 React 開發環境

## [semantic-ui-react](https://react.semantic-ui.com/)
類似 bootstrap 提供多種組件以及 layout 以供取用

## react-router
[簡介](https://github.com/alex1290/react-study/blob/master/guide/react-router.md) </br >
方便寫出SPA

## [redux](https://chentsulin.github.io/redux/)
[簡介](https://github.com/alex1290/react-study/blob/master/guide/redux.md) </br >
提供一個state容器，方便維護、除錯，不用一個個找是哪個 Component 的 state 出了問題。 

## immutable
[簡介](https://github.com/alex1290/react-study/blob/master/guide/immutable.md) </br >
提供immutable的資料，解決JS修改資料複製的值也會修改到原本的值問題

## history
[簡介](https://github.com/alex1290/react-study/blob/master/guide/history.md) </br >

## react-lazyload
[簡介](https://github.com/alex1290/react-study/blob/master/guide/react-lazyload.md) </br >

