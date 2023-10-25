# dockerfile

# 安装轻量级版本的node
FROM node:16-alpine3.15

# 创建一个目录
RUN mkdir -p /home/app/

# 设置工作目录。后续任何命令都将在这个目录下执行
WORKDIR /home/app/

# 此指令将本地目录中的 package.json 和 package-lock.json 文件复制到 Docker 镜像中当前工作目录（/home/app/）
COPY package*.json ./

# 安装yarn
RUN npm install -g yarn

# 安装项目依赖
RUN yarn

# 此指令将本地目录中的所有文件和目录复制到 Docker 镜像中当前工作目录（/home/app/）。
COPY . .

# 此指令告诉 Docker 容器将在运行时监听端口 666
EXPOSE 666

# 此指令指定容器启动时要执行的命令。在本例中，它将入口点设置为 yarn run。
ENTRYPOINT ["yarn", "run"]

# 此指令为入口点命令提供默认参数。它指定如果在启动容器时未提供命令，则应执行 yarn run serve。
CMD ["serve"]