FROM skornehl/ansijet
Maintainer Martin Zachrison <martin.zachrison@strawpay.com>

COPY . /root/

RUN sed -i "s"#"\/usr\/bin\/env node#$NODE_PATH/node#g" start-app.js
