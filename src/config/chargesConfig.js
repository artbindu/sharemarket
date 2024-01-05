const shareCharges = {
    "marketType": [
        "equity - delivery", "equity - intraDay",
        "derivative - future", "derivative - option"
    ],
    "exchangeType": ['NSE', 'BSE'],

    "stockChargesList": [
        {
            "id": "ch01",
            "title": "Equity Brokerage",
            "description": "Brokerage Regulatory Charges(GST Applicable) - Tax by Government when transacting on the exchanges",
            "isGSTApply": true,
            "showWithAddGST": false,
            "isShowRoundOffValue": false,
            "derivative": {
                "future": {
                    "buy": true,
                    "sell": true,
                    "charges": "20"
                },
                "option": {
                    "buy": true,
                    "sell": true,
                    "charges": "20"
                }
            },
            "equity": {
                "delivery": {
                    "buy": true,
                    "sell": true,
                    "charges": "0.05%",
                    "maxCharges": "20"
                },
                "intraDay": {
                    "buy": false,
                    "sell": true,
                    "charges": "0.05%",
                    "maxCharges": "20"
                }
            }
        },
        {
            "id": "ch02",
            "title": "ET charge",
            "description": "Exchange Transaction Charges(GST Applicable): Fees charged to allow clients to trade on the exchange",
            "isGSTApply": true,
            "showWithAddGST": false,
            "isShowRoundOffValue": false,
            "derivative": {
                "future": {
                    "buy": true,
                    "sell": true,
                    "charges": "NSE: 0.0019% | BSE: 0.00%"
                },
                "option": {
                    "buy": true,
                    "sell": true,
                    "charges": "NSE: 0.05% | BSE: 0.0375%"
                }
            },
            "equity": {
                "delivery": {
                    "buy": true,
                    "sell": true,
                    "charges": "NSE: 0.00325% | BSE: 0.00375%"
                },
                "intraDay": {
                    "buy": true,
                    "sell": true,
                    "charges": "NSE: 0.00325% | BSE: 0.00375%"
                }
            }
        },
        {
            "id": "ch03",
            "title": "IPFT charge",
            "description": "Investor Protection Fund Trust Charges(GST Applicable): Charges levied towards investor protection fund",
            "isGSTApply": true,
            "showWithAddGST": false,
            "isShowRoundOffValue": false,
            "derivative": {
                "future": {
                    "buy": true,
                    "sell": true,
                    "charges": "0.0001%"
                },
                "option": {
                    "buy": true,
                    "sell": true,
                    "charges": "0.0005%"
                }
            },
            "equity": {
                "delivery": {
                    "buy": true,
                    "sell": true,
                    "charges": "NSE: 0.0001% | BSE: 0%"
                },
                "intraDay": {
                    "buy": true,
                    "sell": true,
                    "charges": "NSE: 0.0001% | BSE: 0%"
                }
            }
        },
        {
            "id": "ch04",
            "title": "SEBI Turnover charge",
            "description": "SEBI Turnover charge(GST Applicable): Charges by Securities and Exchange Board of India for regulating the markets",
            "isGSTApply": true,
            "showWithAddGST": false,
            "isShowRoundOffValue": false,
            "derivative": {
                "future": {
                    "buy": true,
                    "sell": true,
                    "charges": "0.0001%"
                },
                "option": {
                    "buy": true,
                    "sell": true,
                    "charges": "0.0001%"
                }
            },
            "equity": {
                "delivery": {
                    "buy": true,
                    "sell": true,
                    "charges": "0.0001%"
                },
                "intraDay": {
                    "buy": true,
                    "sell": true,
                    "charges": "0.0001%"
                }
            }
        },
        {
            "id": "ch05",
            "title": "ST Tax",
            "description": "Securities Transaction Tax(GST not Applicable): Tax by the government when transacting on the exchanges",
            "isGSTApply": false,
            "showWithAddGST": false,
            "isShowRoundOffValue": true,
            "derivative": {
                "future": {
                    "buy": false,
                    "sell": true,
                    "charges": "0.0125%"
                },
                "option": {
                    "buy": false,
                    "sell": true,
                    "charges": "0.0625%"
                }
            },
            "equity": {
                "delivery": {
                    "buy": true,
                    "sell": true,
                    "charges": "0.1%"
                },
                "intraDay": {
                    "buy": false,
                    "sell": true,
                    "charges": "0.025%"
                }
            }
        },
        {
            "id": "ch06",
            "title": "Stamp Duty",
            "description": "Stamp Duty(GST not Applicable): tax imposed on the sale of property/property ownership by the state government",
            "extraDescription": "Article-62: 25 paise for every Rs. 100 or part thereof of the value of the share",
            "isGSTApply": false,
            "showWithAddGST": false,
            "isShowRoundOffValue": false,
            "derivative": {
                "future": {
                    "buy": true,
                    "sell": false,
                    "charges": "0.002%"
                },
                "option": {
                    "buy": true,
                    "sell": false,
                    "charges": "0.003%"
                }
            },
            "equity": {
                "delivery": {
                    "buy": true,
                    "sell": false,
                    "charges": "0.015%"
                },
                "intraDay": {
                    "buy": true,
                    "sell": false,
                    "charges": "0.003%"
                }
            }
        },
        {
            "id": "ch07",
            "title": "DP charges",
            "description": "Depository Participant charges(GST Applicable): Charged by the depository (CDSL)",
            "isGSTApply": true,
            "showWithAddGST": true,
            "isShowRoundOffValue": false,
            "derivative": {
                "future": {
                    "buy": true,
                    "sell": true,
                    "charges": "₹0"
                },
                "option": {
                    "buy": true,
                    "sell": true,
                    "charges": "₹0"
                }
            },
            "equity": {
                "delivery": {
                    "buy": false,
                    "sell": true,
                    "charges": "₹13.5 per Company"
                },
                "intraDay": {
                    "buy": true,
                    "sell": true,
                    "charges": "₹0"
                }
            }
        },
        {
            "id": "ch00",
            "title": "GST ",
            "description": "Goods & Service Tax: On Brokerage, DP charges, Exchange Transaction charges, IPFT, SEBI Turnover charges, delayed transaction charges and Auto Square-Off charges",
            "isGSTApply": false,
            "charges": "18%",
            "items": [
                {
                    "id": "ch01",
                    "title": "Equity Brokerage"
                },
                {
                    "id": "ch02",
                    "title": "Exchange Transaction charge"
                },
                {
                    "id": "ch03",
                    "title": "IPFT (Investor Protection Fund Trust) charge"
                },
                {
                    "id": "ch04",
                    "title": "SEBI Turnover charge"
                },
                {
                    "id": "ch07",
                    "title": "DP charges"
                }
            ]
        }
    ]
}

export default shareCharges;