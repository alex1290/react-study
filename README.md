# React
裡面命名通常使用小駝峰

## 兩種Component
名稱第一個字使用大寫

### class
`class App extends React.Component {
    coonstructor(props){
        super(props); //使constuctor接的到props的值
        this.state = {
            "example":"Hello World"
        }
    }
    render() {
        return (
            <div>
                <h1>{this.state.example}</h1>
                <Container />
            </div>
        )
    }
}`

### stateless function 
`
    const  StatelessComponent = props => <div>{props.example}</div>;
`

[差別](https://itnext.io/react-component-class-vs-stateless-component-e3797c7d23ab#:~:targetText=A%20functional(a.k.a.,and%20returns%20a%20react%20element.&targetText=When%20react%20renders%20our%20stateless,function%20and%20pass%20props%20there.)



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
提供一個state容器，在客戶端、伺服器、原生應用程式上皆會相同

## immutable
[簡介](https://github.com/alex1290/react-study/blob/master/guide/immutable.md) </br >
提供immutable的資料，解決JS資料複製之後會修改到原本資料的問題

## history
[簡介](https://github.com/alex1290/react-study/blob/master/guide/history.md) </br >

## react-lazyload
[簡介](https://github.com/alex1290/react-study/blob/master/guide/react-lazyload.md) </br >

