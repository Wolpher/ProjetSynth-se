import React, { Component} from 'react'

import { View, Text, ActivityIndicator} from 'react-native'

import WebView from 'react-native-webview'
import CartContext from '../CartContext'

export default class Paypal extends Component {
  static contextType = CartContext; //check this this weekend
  state = {
    accessToken: null,
    approvalUrl: null,
    paymentId: null
  }
  
  componentDidMount(){
    const {subTotal} = this.context //check this this weekend
    const taxRate = 0.15 //15%
    const tax = subTotal * taxRate //calculate the tax
    const total = subTotal + tax //calculate the total with the taxes
    const dataDetail = {
      "intent": "sale",
      "payer" : {
        "payment_method": "paypal"
      },
      "transactions": [{
        "amount": {
          "total": total.toFixed(2), //allow 2 numbers after the ,
          "currency": "CAD",
          "details": {
            "subtotal": subTotal, 
            "tax": tax.toFixed(2), //allow 2 numbers after the ,
            "shipping": "0.00",
            "handling_fee": "0.00",
            "shipping_discount": "0.00",
            "insurance": "0.00"
          }
        }
      }],
      "redirect_urls":{
        "return_url": "https://exemple.com",
        "cancel_url": "https://example.com"
      }
    }

    fetch('https://api.sandbox.paypal.com/v1/oauth2/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer A21AAJMN8kirfiVgdQg_tAulwB8F2uyDaoW-eHxVqbv7UCoPc5hSef9quennoaW4BTDSMWAylMV8oiOr344XOC8dt2rL6Sm5A`
      },
      body: 'grant_type=client_credentials'
    }
  )
    .then(res =>res.json())
    .then(response => {
      console.log("response====", response)
      this.setState({
        accessToken: response.access_token
      })
      fetch('https://api.sandbox.paypal.com/v1/payments/payment',
    {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${response.access_token}`
      },
      body: JSON.stringify(dataDetail)
    }
  )
    .then(res => res.json())
    .then(response =>{
      console.log("response", response)
      const {id, links} = response
      const approvalUrl = links.find(data => data.rel == "approval_url")
      console.log("approvalURL", approvalUrl);
      this.setState({
        paymentId: id,
        approvalUrl: approvalUrl.href
      })
    }).catch(err => {
      console.log({...err})
    })
  }).catch(err => {
    console.log({...err})
  })
  }

  _onNavigationStateChange = (webViewState) => {
    console.log("webViewState", webViewState);
    if (webViewState.url.includes('https://example.com/')){
      this.setState({
        approvalUrl: null
      })

      const {PayerID, paymentId} = webViewState.url

      fetch(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, {
        method: 'POST',
        body: {payer_id: PayerID},

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.accessToken}`
        }
      })
      .then(res => res.json())
      .then(response => {
        console.log("res", response)
        if(response.name == "INVALID_RESOURCE_ID"){
          alert('Payment Failed. Please Try Again!')
          this.setState({
            approvalUrl: null
          })
          this.props.navigation.pop()
        }
      }).catch(err => {
        console.log({...err})
      })
    }
  }

  render() {
    const {approvalUrl} = this.state
    return (
      <View style={{flex:1}}>
        {
          approvalUrl? <WebView
            style={{height:'100%', width:'100%', marginTop:40}}
            source= {{uri: approvalUrl}}
            onNavigationStateChange={this._onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            />:
            <View style={{flex: 1, justifyContent:'center'}}>
              <Text style={{
                color:'black',
                fontSize: 24, alignSelft:' center'
              }}> Do not press back or refresh page</Text>
              <ActivityIndicator color={'black'} size={'large'} style={{alignSelf:'center', marginTop:10}}/>
              </View>
        }
      </View>
    )
  }
}