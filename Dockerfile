FROM skornehl/ansijet
Maintainer Martin Zachrison <martin.zachrison@strawpay.com>

COPY . /root/

COPY ssh_known_hosts /etc/ssh/ssh_known_hosts

RUN sed -i "s"#"\/usr\/bin\/env node#$NODE_PATH/node#g" start-app.js

RUN pip install -U ansible
