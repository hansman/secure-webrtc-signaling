# Generate a token

`node generateJWT.js -r testroom -u symphony.com.public.openssl -v symphony.com.openssl`

# Secure webrtc signaling - proof of concept
[Architecture](https://docs.google.com/presentation/d/1kTuesyISq-X03Mcx62v2_HD5o7-Q-NUnHWAxYHhNqq8/edit#slide=id.g15fbd73bca_0_0)


## Nginx auth checks

### How to test

`curl -i --header "cookie: mycookie" localhost:8081`
--> expected: http status 401, signaling server is not accessed

`curl -i --header "cookie: mycookie" localhost:8080/grant`

`curl -i --header "cookie: mycookie" localhost:8081`
--> expected: http status 204, signaling server is accessed

### How to start

`node index.js`

`nginx -c /absolute/path/to/secure-webrtc-signaling/nginx.conf`


### How to configure

Dependencies: nginx, node, redis, [ngx_http_auth_request_module](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html)

#### Mac

`brew install nvm redis`

`nvm install 5`

`redis-server`

`brew install nginx-full --with-auth-req`

## Json Web token authentication in XMPP server

### Generate a token
`node generateJWT.js -r {roomID}`

### Start a conference

In `/etc/hosts` set `54.197.39.123 rtc.symphony.com`

Load in your browser `https://rtc.symphony.com/{roomID}#config.token="{token}"`
