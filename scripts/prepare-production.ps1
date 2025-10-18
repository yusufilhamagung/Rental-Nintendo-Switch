param(
  [string]$ReleaseDir = "release"
)

$ErrorActionPreference = 'Stop'

function Ensure-Dir([string]$path) {
  if (Test-Path $path) { Remove-Item -Recurse -Force $path }
  New-Item -ItemType Directory -Path $path | Out-Null
}

function Copy-Frontend($outDir) {
  Push-Location frontend
  try {
    if (-not (Test-Path node_modules)) { npm install | Out-Null }
    node ./node_modules/vite/bin/vite.js build | Out-Null
  } finally { Pop-Location }
  Ensure-Dir "$outDir/frontend"
  Copy-Item -Recurse -Force frontend/dist/* "$outDir/frontend/"
}

function Copy-Backend($outDir) {
  Push-Location express-api
  try {
    if (-not (Test-Path node_modules)) { npm install | Out-Null }
    npx tsc -p . | Out-Null
  } finally { Pop-Location }

  $apiOut = Join-Path $outDir 'express-api'
  Ensure-Dir $apiOut
  Copy-Item -Recurse -Force express-api/dist "$apiOut/dist"
  if (Test-Path express-api/.env.example) { Copy-Item express-api/.env.example "$apiOut/.env.example" }

  # Create minimal package.json with only prod deps and start script
  $pkg = Get-Content express-api/package.json -Raw | ConvertFrom-Json
  $outPkg = [ordered]@{
    name = $pkg.name
    version = $pkg.version
    private = $true
    main = "dist/server.js"
    scripts = @{ start = "node dist/server.js" }
    dependencies = $pkg.dependencies
    engines = $pkg.engines
  }
  $outPkg | ConvertTo-Json -Depth 5 | Out-File -Encoding UTF8 (Join-Path $apiOut 'package.json')

  # Optional: install production dependencies inside release (omit dev)
  Push-Location $apiOut
  try {
    npm install --omit=dev | Out-Null
  } finally { Pop-Location }
}

Write-Host "Preparing production bundle..."
Ensure-Dir $ReleaseDir
Copy-Frontend $ReleaseDir
Copy-Backend $ReleaseDir

@"
Production bundle created in: $ReleaseDir

frontend/: static assets (deploy to any static host)
express-api/: Node API (run with: npm start)

To run locally:
  cd $ReleaseDir/express-api
  copy .env.example .env  # then adjust DB config
  npm start
"@ | Out-File -Encoding UTF8 (Join-Path $ReleaseDir 'README.txt')

Write-Host "Done."

