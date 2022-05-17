Invoke-Command -ScriptBlock {
    docker build -t echarts-exporting-server:latest .
    docker tag echarts-exporting-server:latest mflexdockhub.azurecr.cn/echarts-exporting-server:latest
    docker push mflexdockhub.azurecr.cn/echarts-exporting-server:latest
}