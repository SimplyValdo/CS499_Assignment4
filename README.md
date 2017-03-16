# CS499_Assignment4

<h3>Data Monitor Dashboard using ElasticSearch and Kibana</h3><br>

<b>DOMAIN</b>: &nbsp;Yahoo weather API<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Explanation:</b><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I used the yahoo public API Domain that they provide.<br>

<b>DATA</b>: &nbsp;Weather Data per Hour<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Explanation:</b><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yahoo provides weather updates every hour. I used YQL statement to fetch forecasts and render with JQuery.<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You can easily extract this data by using a special link. They provide many different kinds of data <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
from many cities. In my example I picked four citities: San Diego, Los Angeles, San Francisco and Sacramento. <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;From these cities, the only data attributes I extracted where the following: location, temperature, sky status <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and date/time. Once the data has been extracted, I stored them into my elasticSearch.<br>

<b>Build a Dashboard using Kibana to Visualize the Data:</b><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I created three interesting visualizations tools provided in Kibana which consists of Data Table, Pie Chart and a <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bar Graph. 



