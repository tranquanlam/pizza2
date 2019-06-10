import { combineReducers } from 'redux'

var product = {
    listProduct: [{
        "id": 1,
        "name": "Đế Bánh",
        "price": "10$",
        "img": "https://lh3.googleusercontent.com/-Jp6TtM6Ny5Q/WOJW8rFzGaI/AAAAAAABDKQ/Xi3UT7qCLZo/s1000/nguyen-lieu-lam-banh-pizza-pho-bien.html-image00.png"
    },
    {
        "id": 2,
        "name": "Nước sốt",
        "price": "5$",
        "img": "https://lh3.googleusercontent.com/-_sSIToR6zG8/WOJW_QhVWfI/AAAAAAABDKU/fnIRz3rC8N8/s1000/nguyen-lieu-lam-banh-pizza-pho-bien.html-image03.png"
    },
    {
        "id": 3,
        "name": "Phô mai",
        "price": "10$",
        "img": "https://lh3.googleusercontent.com/-dGgGGSX9UqQ/WOJXCKBwdEI/AAAAAAABDKY/_9fOq4nwXUk/s1000/nguyen-lieu-lam-banh-pizza-pho-bien.html-image02.png"
    },
    {
        "id": 4,
        "name": "Thịt xông khói",
        "price": "9.6$",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNNQQK-oBxgR4NKkLsJXSIqWqPD6aK1adHQ_js8qa_Qgm2_ar3"
    },
    {
        "id": 5,
        "name": "Thit zăm bông",
        "price": "12$",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyBVZwUcdfzaA25XM6xfQvPDD-gXCl2CIcmcXrkeQJfGU-stZw"
    },
    {
        "id": 6,
        "name": "Xúc xích",
        "price": "5$",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-cQJT8MxZct0SwPW2g8uZ1qZgVtzZRXblpGXdAwuHWwKsNQoBmQ"
    }],
    amount: [],
    name: {
        "id": 5,
        "name": "Thit zăm bông",
        "price": "12$",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyBVZwUcdfzaA25XM6xfQvPDD-gXCl2CIcmcXrkeQJfGU-stZw"
    }
}

var redux = require('redux');
var reducer1 = (state = product, action) => {
    switch (action.type) {
        case "SHOW_Product":
            return [...state.amount]
        case "ADD_Product":
            if (state.amount.length === 0) {
                state.amount = [{ id: action.id, number: 1 }]
            } else {
                let yesN = true;
                state.amount.forEach(element => {
                    if (element.id === parseInt(action.id)) {
                        yesN = false;
                    }
                });

                if (yesN === false) {
                    state.amount.map((value) => {
                        if (value.id === parseInt(action.id)) {
                            var num = value.number++;
                            return { ...state, amount: [...state.amount, { id: action.id, number: num }] }
                        } else {
                            return { ...state }
                        }
                    })
                } else {
                    state.amount.push({ id: action.id, number: 1 });
                }
            }
            console.log(state.amount)
            return { ...state }
        case "reset":
            var myNode = document.getElementById("viewPro");
            myNode.innerHTML = '';
            state.amount = []
            product.amount = []
            return { ...state}
        case "deletePro":
            state.amount.map((value) => {
                if (value.id === parseInt(action.id)) {
                    value.number = value.number - 1;
                    if (value.number === 0) {
                        let element = document.getElementById("img__" + action.id);
                        document.getElementById("viewPro").removeChild(element);
                    }
                    return { ...state, amount: [...state.amount, { id: action.id, number: value.number }] }
                } else {
                    return { ...state }
                }
            })
            let arrayDele = state.amount.filter((value) => {
                return value.number > 0
            })
            return { ...state, amount: arrayDele }

        default:
            return state
    }
}

var st = combineReducers({
    dbPro: reducer1
})
var store1 = redux.createStore(st);
store1.subscribe(() => {
    console.log(product.amount);
})
export default store1;