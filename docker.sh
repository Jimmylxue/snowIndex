# 打包出项目镜像
docker build -f ./Dockerfile -t snowIndex:0.0.1 .

# 启动镜像
docker run -d -p 666:666 snowIndex:0.0.1