## 檔案架構
```
src
    |-action
        |--index.js
        |--type.js
    |-components
    |-constants
        |--data.js
    |-reducer</br >
        |--index.js
    |-index.js
```
*在src下，除了 actions 和 reducers 其餘可以自行修改*

## 概念
  建立一個store儲存所有的state，裡面的資料最好存放唯獨、不變的，例如: 文字訊息。 </br >

### 資料流程:
  1. 使用者與 View 互動 
  2. dispatch Action 到 Reducer
  3. Reducer 根據 action tyoe 的處理方式，回傳新的 state 
  4. 透過 React Redux 傳送給 React，React 重新繪製 View
  
## State 
store的格式沒有固定，可以是物件、陣列，可以搭配 ImmutableJs使用。</br >
example:
```
    import { createStore } from 'redux';
    const state = {
        lang:'en',
        userState:{
            name:'',
            id:''
        }
        productState:{
            tittle:'',
            text: {
                item1-tittle:'',

            }
        }
    }
```

## Action

## Reducer




| [回到目錄](https://github.com/alex1290/react-study/blob/master/README.md) |
