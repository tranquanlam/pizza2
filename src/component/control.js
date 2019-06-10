import React, { Component } from 'react';
import Product from './product';
import { connect } from 'react-redux';

class control extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            data: this.props.dbPro.amount,
            total: 0,
            getDataSourceState(id, data) {
                let number = 0;
                data.forEach(element => {
                    if (element.id === parseInt(id)) {
                        number = element.number;
                    }
                });
                return number
            }
        })
    }
    add = (i, y, z) => {
        let has = false
        this.props.dbPro.amount.forEach(element => {
            if (element.id === i) {
                has = true;
            }
        });

        this.props.addProduct(i);
        this.setState({
            data: this.props.dbPro.amount,

        })
        let sum = this.state.total + parseFloat(z)
        this.setState({
            total: sum
        })

        if (has === false) {
            var view = document.createElement("img");
            view.setAttribute("src", y.toString());
            view.setAttribute("height", "100");
            view.setAttribute("width", "100");
            view.setAttribute("alt", "Flower");
            view.setAttribute("id", "img__" + i.toString());
            view.setAttribute("class", "img img-thumbnail");
            document.getElementById("viewPro").appendChild(view);
        }
    }
    detelePro = (id, price) => {
        this.props.delete(id)
        this.setState({
            data: this.props.dbPro.amount,
            total: this.state.total - parseFloat(price)
        })

    }

    resetPro = () => {
        this.props.reset()
        console.log(this.props.dbPro.amount)
        this.setState({
            data:this.props.dbPro.amount,
            total: 0
        })
    }
    render() {
        return (
            <div className="addPro">
                <div className="addPro__topInfo">
                    <p className="addPro__topInfo__title">Your Pizza</p>
                    <p className="addPro__topInfo__total">{this.state.total} $</p>
                    <button className="btn btn-warning" onClick={() => this.resetPro()} >Reset Pizza</button>
                </div>
                <div className="addPro__listProduct">
                    {
                        this.props.dbPro.listProduct.map((value, key) => (
                            <Product key={key} name={value.name} id={value.id} quatity={this.state.getDataSourceState(value.id, this.state.data)} them={() => this.add(value.id, value.img, value.price)} detele={() => this.detelePro(value.id, value.price)}></Product>
                        ))
                    }
                    <div className="product row pay">
                        <div className="col-6">
                            <p>Total :</p>
                        </div>
                        <div className="col-6">
                            <p>{this.state.total} $</p>
                        </div>
                    </div>
                    <div className="product row pay">
                        <div className="btn btn-primary">Checkout</div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { dbPro: state.dbPro }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (id) => {
            dispatch({ type: "ADD_Product", id })
        },
        delete: (id) => {
            dispatch({ type: "deletePro", id })
        },
        reset: () => {
            dispatch({ type: "reset" })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(control)
