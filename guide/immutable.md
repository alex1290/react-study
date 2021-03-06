主要是為了將資料轉成不可變更的資料

## fromJs()
### 使用範例
```
import Immutable from 'immutable';

export const dataState = Immutable.fromJS({
    'todoState': {
        todoList: [
            {
                complete: false,
                id: 0,
                text: 'learn'
            },
            {
                complete: true,
                id: 1,
                text: 'play'
            },
            {
                complete: false,
                id: 2,
                text: 'sleep'
            },
        ],
        nextId: 3
    }

})

export default dataState;
```
### 取用資料
轉換完成後，全部資料內容物件轉成Map，陣列轉成List<br />
若要取用裡面的內容就得使用```get()```或是```getIn([a,b])```<br />
以上方的資料為例子<br />
```
    dataState.get('todoState') 
    // => 將會是以下物件
    //
    //     List [
    //         Map {
    //             complete: false,
    //             id: 0,
    //             text: 'learn'
    //         },
    //         Map {
    //             complete: true,
    //             id: 1,
    //             text: 'play'
    //         },
    //         Map {
    //             complete: false,
    //             id: 2,
    //             text: 'sleep'
    //         },
    //     ],
    //     3
    // ]


    // 若要取得多層以下的得使用
    dataState.getIn(['todoState','nextId'])
    // => 3
```
### Map、List 特色

1. 兩者皆可以使用陣列、物件作為key值
2. 可以使用原本陣列的處理方式, Ex: map

###### values()、keys()、entires()
可以使用以上function獲得內容<br />
```
    [...dataState.keys()] 
    // => ['todoList','nextId']
    // 或是使用
    for(let k of dataState.keys())
    console.log(k) 
    //=> 'todoList','nextId'
    
```


| [回到目錄](https://github.com/alex1290/react-study/blob/master/README.md) |
