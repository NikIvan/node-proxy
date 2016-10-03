# node-proxy

This is test project which works like follows:

Server on port ```3030``` works as a proxy. It receives POST request with some data and sends all data to handler server that is running on port ```3031```. Handler server get contents of the file ```data.dat``` and send its content in respond and writes request contents to file.

To start both servers run

```node server``` or ```npm start```
