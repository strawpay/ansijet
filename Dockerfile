FROM skornehl/ansijet
Maintainer Martin Zachrison <martin.zachrison@strawpay.com>

COPY . /root/

COPY ssh_known_hosts /etc/ssh/ssh_known_hosts

RUN pip install -U ansible

RUN sed -i "s"#"\/usr\/bin\/env node#$NODE_PATH/node#g" start-app.js


