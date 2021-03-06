import React, { Component } from 'react';
import './App.css';

import gql from "graphql-tag";
import {Subscription } from "react-apollo";

import { ApolloProvider } from "react-apollo";
import client from './apollo';

var LineChart = require("react-chartjs").Line;
var chartData = {
  labels: [],
  datasets: [
    {
      label: "Placed",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(200,50,100,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(200,50,100,1)",
      data: []
    },
    {
      label: "Validated",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(150,100,100,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(150,100,100,1)",
      data: []
    },
    {
      label: "Paid",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(100,150,100,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(100,150,100,1)",
      data: []
    },
    {
      label: "Approved",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(50,200,100,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(50,200,100,1)",
      data: []
    },
    {
      label: "Assigned",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(0,200,100,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(0,200,100,1)",
      data: []
    }
  ]
};

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Subscription
            subscription={gql`
              subscription {
                number_order {
                  count
                }
                number_order_validated {
                  count
                }
                number_order_payment_valid {
                  count
                }
                number_order_restaurant_approved {
                  count
                }
                number_order_agent_assigned {
                  count
                }
              }
              `}>

            {({ loading, error, data }) => {
               if (loading) return <p>Loading...</p>;
               if (error) return <p>Error {JSON.stringify(error)}</p>;

               chartData.datasets[0].data.push(data.number_order[0].count);
               chartData.datasets[1].data.push(data.number_order_validated[0].count);
               chartData.datasets[2].data.push(data.number_order_payment_valid[0].count);
               chartData.datasets[3].data.push(data.number_order_restaurant_approved[0].count);
               chartData.datasets[4].data.push(data.number_order_agent_assigned[0].count);
               var d = new Date();
               let h = d.getHours(); // => 9
               let m = d.getMinutes(); // =>  30
               let s = d.getSeconds(); // => 51
               chartData.labels.push(`${h}:${m}:${s}`);
               return (
                 <LineChart data={chartData}
                            options={{responsive: true, maintainAspectRatio: false,
                                      scales: {
                                        xAxes: [{ labels: { userCallback: () => ('') } }]
                                      }
                            }}
                 />
               );
            }}
          </Subscription>
        </div>
      </ApolloProvider>
    );}
}

export default App;
