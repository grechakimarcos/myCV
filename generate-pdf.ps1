$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$htmlFile = Join-Path $PSScriptRoot "cv-marcos-dominhaki.html"
$pdfFile = Join-Path $PSScriptRoot "cv-marcos-dominhaki.pdf"

Write-Host "Gerando PDF do currículo..."
Write-Host "HTML: $htmlFile"
Write-Host "PDF: $pdfFile"

& $chromePath --headless --disable-gpu --print-to-pdf="$pdfFile" --no-margins "file:///$htmlFile"

if (Test-Path $pdfFile) {
    Write-Host "✓ PDF gerado com sucesso: $pdfFile" -ForegroundColor Green
} else {
    Write-Host "✗ Erro ao gerar PDF" -ForegroundColor Red
}
