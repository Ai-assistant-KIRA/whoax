param(
  [string]$InputVideo = "C:\Users\KIRA\Downloads\Firefly_kling_Cinematic VFX sequence a photore 352879 TEh.mp4",
  [double]$Fps = 18
)

$outDir = Join-Path $PSScriptRoot "..\public\hero-sequence"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
Remove-Item (Join-Path $outDir "*") -ErrorAction SilentlyContinue

$pattern = Join-Path $outDir "frame-%03d.webp"
ffmpeg -y -i $InputVideo -vf "fps=$Fps,scale=1920:-2" -f image2 -c:v libwebp -q:v 80 $pattern -loglevel error

$count = (Get-ChildItem (Join-Path $outDir "*.webp")).Count
$sizeMb = [math]::Round(((Get-ChildItem (Join-Path $outDir "*.webp") | Measure-Object Length -Sum).Sum / 1MB), 1)
Write-Output "frames=$count total=${sizeMb}MB"
