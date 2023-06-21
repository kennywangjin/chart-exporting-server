Write-Host "Start building docker image"

$ImageVersion = "0.0.5"
$ImageTag = "mfcharbor.mflex.com.cn/mes/echarts-exporting-server"

Start-Process "docker" `
    -ArgumentList "buildx build --platform=linux/amd64 -t ${ImageTag}:${ImageVersion} --push --force-rm ." `
    -NoNewWindow `
    -Wait

Write-Host "Complete pushing docker image to harbor"