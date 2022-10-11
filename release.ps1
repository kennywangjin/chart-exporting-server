Write-Host "Start building docker image"

$ImageVersion = "0.0.2.0"
$ImageTag = "mfcharbor.mflex.com.cn/mes/echarts-exporting-server"

Start-Process "docker" `
    -ArgumentList "build -t ${ImageTag}:${ImageVersion} ." `
    -NoNewWindow `
    -Wait

Start-Process "docker" `
    -ArgumentList "push ${ImageTag}:${ImageVersion}" `
    -NoNewWindow `
    -Wait

Write-Host "Complete pushing docker image to harbor"