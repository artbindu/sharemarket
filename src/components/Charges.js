import React, { Component } from 'react';
import shareCharges from "../config/chargesConfig";

export default class Charges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marketType: shareCharges.marketType,
            exchangeType: shareCharges.exchangeType,
            selectedMarketType: shareCharges.marketType[0],
            selectBuyingExchangeType: shareCharges.exchangeType[0],
            selectSellingExchangeType: shareCharges.exchangeType[0],

            stockChargesList: shareCharges.stockChargesList,
            shareQuantity: 30,
            buyingPricePerUnit: 780.5,
            sellingPricePerUnit: 840,
            totalBuyingValue: 0,
            totalSellingValue: 0,
            totalProfit: 0,

            // filterChargesList: null,
            chargesData: [],
            totalBuyingCharges: 0,
            totalSellingCharges: 0
        }
    }
    onMarketTypeChange = (e) => {
        this.setState({
            selectedMarketType: e.currentTarget.value
        });
        this.calculation();
    }
    onChangeBuyExch = () => {
        this.setState({
            selectBuyingExchangeType: this.state.selectBuyingExchangeType === this.state.exchangeType[0] ? this.state.exchangeType[1] : this.state.exchangeType[0]
        });
        this.calculation();
    }
    onChangeSellExch = () => {
        this.setState({
            selectSellingExchangeType: this.state.selectSellingExchangeType === this.state.exchangeType[0] ? this.state.exchangeType[1] : this.state.exchangeType[0]
        });
        this.calculation();
    }
    onChangeShareQnt = (e) => {
        this.setState({
            shareQuantity: e.currentTarget.value
        });
        this.calculation();
    }
    onChangeShareByPrice = (e) => {
        this.setState({
            buyingPricePerUnit: e.currentTarget.value
        });
        this.calculation();
    }
    onChangeShareSelPrice = (e) => {
        this.setState({
            sellingPricePerUnit: e.currentTarget.value
        });
        this.calculation();
    }
    calculation = () => {
        let _totalBuyPr = this.state.buyingPricePerUnit * this.state.shareQuantity;
        let _totalSellPr = this.state.sellingPricePerUnit * this.state.shareQuantity
        this.setState({
            totalBuyingCharges: 0,
            totalSellingCharges: 0,
            totalBuyingValue: _totalBuyPr,
            totalSellingValue: _totalSellPr,
            totalProfit: _totalSellPr - _totalBuyPr
        });
        setTimeout(this.formatCharges(), 2000);
    }
    formatCharges = () => {
        // console.clear();
        const searchCategory = this.state.selectedMarketType.split(/ - /g);
        let _chargesDataList = [];
        let _totalBuyingCharges = 0;
        let _totalSellingCharges = 0;
        let _gstCharges = {
            buy: 0, sell: 0
        };
        this.state.stockChargesList.forEach((ele) => {
            let _data = {
                id: ele.id,
                title: ele.title,
                description: ele.description,
                isGSTApply: ele.isGSTApply,
                showWithAddGST: ele.showWithAddGST,
                isShowRoundOffValue: ele.isShowRoundOffValue,
                quantity: this.state.shareQuantity,
                unitPrice: {
                    buy: this.state.buyingPricePerUnit,
                    sell: this.state.sellingPricePerUnit
                },
                totalPrice: {
                    buy: this.state.shareQuantity * this.state.buyingPricePerUnit,
                    sell: this.state.shareQuantity * this.state.sellingPricePerUnit
                },
                exchangeType: {
                    buy: '',
                    sell: ''
                },
                charges: {
                    buy: 0,
                    sell: 0
                },
                totalCharges: {
                    buy: 0,
                    sell: 0
                }
            }

            // console.log(ele);
            let charges = ele[searchCategory[0]] ? ele[searchCategory[0]][searchCategory[1]] : null;
            // console.log(JSON.stringify(charges));
            // console.log('_data: ', _data);

            if (charges && charges.charges) {
                _data.chargesDetails = charges;
                charges = charges.charges;
                let _bseCharges = 0;
                let _nscCharges = 0;
                let isFixedCharges = false;
                if (/BSE/g.test(charges)) {
                    _bseCharges = charges.match(/(?<=BSE: )(\d*\.)?\d+(%)/g)?.toString();
                }
                if (/NSE/g.test(charges)) {
                    _nscCharges = charges.match(/(?<=NSE: )(\d*\.)?\d+(%)/g)?.toString();
                }
                if (!/BSE/g.test(charges) && !/NSE/g.test(charges)) {
                    _bseCharges = /%/g.test(charges) ? charges.match(/(\d*\.)?\d+(%)/g)?.toString() : charges.match(/(\d*\.)?\d+/g)?.toString();
                    _nscCharges = _bseCharges;
                    isFixedCharges = /%/g.test(charges) ? false : true;
                }
                // console.log(_bseCharges, _nscCharges);

                // if Buying Charges Exists
                if (_data.chargesDetails.buy) {
                    _data.exchangeType.buy = this.state.selectBuyingExchangeType;
                    _data.charges.buy = this.state.selectBuyingExchangeType === 'BSE' ? _bseCharges : _nscCharges;
                    _data.totalCharges.buy = isFixedCharges ? _data.charges.buy : this.getValueFromPercentage(_data.totalPrice.buy, _data.charges.buy, _data.chargesDetails.maxCharges);
                }
                // if Selling Charges Exists
                if (_data.chargesDetails.sell) {
                    _data.exchangeType.sell = this.state.selectSellingExchangeType;
                    _data.charges.sell = this.state.selectSellingExchangeType === 'BSE' ? _bseCharges : _nscCharges;
                    _data.totalCharges.sell = isFixedCharges ? _data.charges.sell : this.getValueFromPercentage(_data.totalPrice.sell, _data.charges.sell, _data.chargesDetails.maxCharges);
                }

                if (_data.isShowRoundOffValue) {
                    // { buy: '23.41', sell: '25.20' }
                    let decimalVal_buy = Number(_data.totalCharges.buy.match(/\.\d+/g).toString()); // '.41'
                    let decimalVal_sell = Number(_data.totalCharges.sell.match(/\.\d+/g).toString()); // '.20'
                    _data.totalCharges.buy = Math.round(_data.totalCharges.buy); // '23.41'
                    _data.totalCharges.sell = Math.round(_data.totalCharges.sell); // '25.20'
                    if (decimalVal_buy > decimalVal_sell && (decimalVal_buy + decimalVal_sell) >= .5) {
                        _data.totalCharges.buy += 1;
                    } else if (decimalVal_buy < decimalVal_sell && (decimalVal_buy + decimalVal_sell) >= .5) {
                        _data.totalCharges.sell += 1;
                    }
                }

                // GST Calculation
                _gstCharges.buy += (_data.isGSTApply && !_data.showWithAddGST) ? (Number(_data.totalCharges.buy) * 18 / 100) : 0;
                _gstCharges.sell += (_data.isGSTApply && !_data.showWithAddGST) ? (Number(_data.totalCharges.sell) * 18 / 100) : 0;
                // Update Total Charges for DP Charges
                if (_data.showWithAddGST && _data.isGSTApply) {
                    _data.totalCharges.buy = this.showData(_data.totalCharges.buy * 118 / 100);
                    _data.totalCharges.sell = this.showData(_data.totalCharges.sell * 118 / 100);
                }

                // Total Charges Calculation:
                _totalBuyingCharges += Number(_data.totalCharges.buy);
                _totalSellingCharges += Number(_data.totalCharges.sell);
                // console.log(`Add Selling Charges: ${_data.title} : value: ${_data.totalCharges.sell}`);
            } else if (/GST/gi.test(_data.title)) { // Update Total GST Data
                _data.chargesDetails = { buy: true, sell: true, charges: ele.charges };
            }
            _chargesDataList.push(_data);
        });
        console.log(_chargesDataList[2], 'gst: ', _gstCharges);
        // Update Total GST Data
        let _gstDataIndex = _chargesDataList.findIndex(el => /GST/gi.test(el.title));
        if (_gstDataIndex) {
            _chargesDataList[_gstDataIndex].totalCharges.buy = this.showData(_gstCharges.buy);
            _chargesDataList[_gstDataIndex].totalCharges.sell = this.showData(_gstCharges.sell);
            // Update Total Charges with GST Charges:
            _totalBuyingCharges += Number(_gstCharges.buy);
            _totalSellingCharges += Number(_gstCharges.sell);
        }
        this.setState({
            chargesData: _chargesDataList
        });


        this.setState({
            totalBuyingCharges: this.showData(_totalBuyingCharges),
            totalSellingCharges: this.showData(_totalSellingCharges)
        })
    }

    getValueFromPercentage = (value, percent, maxCharges) => {
        if (/%/g.test(percent)) {
            let val = (value * Number(percent.replace(/%/g, '').trim()) / 100);
            return this.showData(maxCharges ? Math.min(Number(maxCharges), val) : val);
        } else {
            let val = (value * Number(percent.trim()) / 100);
            return this.showData(maxCharges ? Math.min(Number(maxCharges), val) : val);
        }
    }

    calculatePercentage = (profit, capital) => {
        return this.showData(profit * 100 / capital);
    }

    componentDidMount() {
        this.calculation();
    }
    showData = (_prValue, _addPreString = '', _addPostString = '') => {
        return `${_addPreString} ${Number(_prValue).toFixed(2)} ${_addPostString}`;
    }
    render() {
        // this.calculation();
        return (
            <>
                <div className="container my-2 p-5 shadow">
                    <h1 className="text-center my-1 p-5 shadow">Share Charges Information</h1>

                    <div className="p-5 my-3 shadow">
                        <div className="equity shadow form-check-inline p-2">
                            <div className='text-center'><h5>Equity Market</h5></div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="marketType" id="marketType" value={this.state.marketType[0]}
                                    checked={this.state.selectedMarketType === this.state.marketType[0]} onChange={this.onMarketTypeChange} />
                                <label className="form-check-label" htmlFor="marketType">Delivery</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="marketType" id="marketType" value={this.state.marketType[1]}
                                    checked={this.state.selectedMarketType === this.state.marketType[1]} onChange={this.onMarketTypeChange} />
                                <label className="form-check-label" htmlFor="marketType" >Intra Day</label>
                            </div>
                        </div>
                        <div className="equity shadow form-check-inline p-2">
                            <div className='text-center'><h5>Derivative Market</h5></div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="marketType" id="marketType" value={this.state.marketType[2]}
                                    checked={this.state.selectedMarketType === this.state.marketType[2]} onChange={this.onMarketTypeChange} />
                                <label className="form-check-label" htmlFor="marketType" >Future</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="marketType" id="marketType" value={this.state.marketType[3]}
                                    checked={this.state.selectedMarketType === this.state.marketType[3]} onChange={this.onMarketTypeChange} />
                                <label className="form-check-label" htmlFor="marketType">Option</label>
                            </div>
                        </div>

                        <div className="equity shadow text-inline p-2 my-2">
                            <div className="mb-3 row mx-4">
                                <label htmlFor="number" className="col-sm-4 col-form-label">Quantity</label>
                                <div className="col-sm-4">
                                    <input type="number" className="form-control" id="quantity"
                                        value={this.state.shareQuantity} onChange={this.onChangeShareQnt} />
                                </div>
                                <div className="col-sm-4">
                                    <span className={`badge bg-${this.state.totalProfit > 0 ? 'success' : 'danger'} text-dark`}><h5>{this.showData(this.state.totalProfit)}</h5></span>
                                </div>
                            </div>
                            <div className="mb-3 row mx-4">
                                <label htmlFor="number" className="col-sm-4 col-form-label">Buying Price per Quantity</label>
                                <div className="col-sm-4">
                                    <input type="number" className="form-control" id="buyingPrice"
                                        value={this.state.buyingPricePerUnit} onChange={this.onChangeShareByPrice} />
                                </div>
                                <div className="col-sm-4">
                                    <span className="badge bg-info text-dark"><h5>{this.showData(this.state.totalBuyingValue)}</h5></span>
                                </div>
                            </div>
                            <div className="mb-3 row mx-4">
                                <label htmlFor="number" className="col-sm-4 col-form-label">Selling Price per Quantity</label>
                                <div className="col-sm-4">
                                    <input type="number" className="form-control" id="sellingPrice"
                                        value={this.state.sellingPricePerUnit} onChange={this.onChangeShareSelPrice} />
                                </div>
                                <div className="col-sm-4">
                                    <span className="badge bg-warning text-dark"><h5>{this.showData(this.state.totalSellingValue)}</h5></span>
                                </div>
                            </div>
                        </div>

                        <table className="table p-2 my-5 shadow">
                            <thead>
                                <tr>
                                    <th scope="col"><h4><strong>Charges List</strong></h4></th>
                                    <th scope="col">
                                        <h4 className="form-check-inline m-0"><strong className="form-check-inline m-0">
                                            <div className="form-check-inline m-1">Buy</div>
                                        </strong></h4>
                                        <div className="form-check form-check-inline form-switch">
                                            <input className="form-check-input" type="checkbox" id="selectBuyExchangeType" onClick={this.onChangeBuyExch} />
                                            <label className="form-check-label" htmlFor="selectBuyExchangeType">
                                                {this.state.selectBuyingExchangeType}</label>
                                        </div>

                                    </th>
                                    <th scope="col">
                                        <h4 className="form-check-inline m-0"><strong className="form-check-inline m-0">
                                            <div className="form-check-inline m-1">Sell</div>
                                        </strong></h4>
                                        <div className="form-check form-check-inline form-switch">
                                            <input className="form-check-input" type="checkbox" id="selectSellExchangeType" onClick={this.onChangeSellExch} />
                                            <label className="form-check-label" htmlFor="selectSellExchangeType">
                                                {this.state.selectSellingExchangeType}</label>
                                        </div>
                                    </th>
                                    <th scope="col"><h4><strong>Total</strong></h4></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.chargesData && this.state.chargesData.length && this.state.chargesData.map((ele) => {
                                    return <tr key={ele.id}>
                                        <th scope="row" title={ele.description}>{ele.title} -
                                            <span className={`badge bg-${/gst/gi.test(ele.title) ? 'danger' : 'info'} text-dark`}>
                                                {ele.chargesDetails.charges}
                                                {ele.showWithAddGST ? '+ GST: 18%' : ''}
                                                {/gst/gi.test(ele.title) ? ' on items: 💰' : ''}
                                            </span>
                                            <span title="GST Apply Later">{(ele.isGSTApply && !ele.showWithAddGST) ? '💰' : ''}</span>
                                        </th>
                                        <td>₹{Number(ele.totalCharges.buy).toFixed(2)}</td>
                                        <td>₹{Number(ele.totalCharges.sell).toFixed(2)}</td>
                                        <td>₹{(Number(ele.totalCharges.buy) + Number(ele.totalCharges.sell)).toFixed(2)}</td>
                                    </tr>
                                })}
                                <tr>
                                    <th scope="row"><h4><strong>Total Charges</strong></h4></th>
                                    <td><h4><strong>{this.showData(this.state.totalBuyingCharges, '₹')}</strong></h4></td>
                                    <td><h4><strong>{this.showData(this.state.totalSellingCharges, '₹')}</strong></h4></td>
                                    <td><h4><strong>{this.showData(Number(this.state.totalBuyingCharges) + Number(this.state.totalSellingCharges), '₹')}</strong></h4></td>
                                </tr>
                                <tr>
                                    <th scope="row">Percentage Charges on Profit Amount - {this.showData(this.state.totalProfit, '₹')}</th>
                                    <td>{this.showData(this.calculatePercentage(this.state.totalBuyingCharges, this.state.totalProfit), '', '%')}</td>
                                    <td>{this.showData(this.calculatePercentage(this.state.totalSellingCharges, this.state.totalProfit), '', '%')}</td>
                                    <td>{this.showData(this.calculatePercentage(Number(this.state.totalBuyingCharges) + Number(this.state.totalSellingCharges), this.state.totalProfit), '', '%')}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Percentage Charges on Invest Amount - {this.showData(this.state.totalBuyingValue, '₹')}</th>
                                    <td>{this.showData(this.calculatePercentage(this.state.totalBuyingCharges, this.state.totalBuyingValue), '', '%')}</td>
                                    <td>{this.showData(this.calculatePercentage(this.state.totalSellingCharges, this.state.totalBuyingValue), '', '%')}</td>
                                    <td>{this.showData(this.calculatePercentage(Number(this.state.totalBuyingCharges) + Number(this.state.totalSellingCharges), this.state.totalBuyingValue), '', '%')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <h5> {this.state.selectedMarketType}</h5>
                <h5> Buy: {this.state.selectBuyingExchangeType} | Sell: {this.state.selectSellingExchangeType}</h5>
                <h5>{this.state.shareQuantity} | {this.state.buyingPricePerUnit} | {this.state.sellingPricePerUnit}</h5>
            </>
        )
    }
}
