import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useOrg } from '@/context/OrgContext';
import ReactDOM from 'react-dom';
const QRCodePage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [printCount, setPrintCount] = useState(3);
  const code = 'GQQQ-PJXNNU-EQAK-SNQJDB';
  const { orgId, branch } = useOrg();
  const qrCodeUrl = `https://app.playzuno.com/scan/${orgId}/${branch?.id}`;
  // console.log('qrCodeUrl', qrCodeUrl);
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleDownload = () => {
    if (!orgId || !branch) return;
    // Create a canvas element to draw the QR code
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 800;

    // Draw white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Create a temporary QR code SVG element
    const tempContainer = document.createElement('div');
    const qrComponent = <QRCodeSVG value={qrCodeUrl} size={400} />;
    ReactDOM.render(qrComponent, tempContainer);

    // Convert SVG to image and draw on canvas
    const svgElement = tempContainer.querySelector('svg');
    if (svgElement) {
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const img = new Image();
      img.src = 'data:image/svg+xml;base64,' + btoa(svgString);

      img.onload = () => {
        // Center the QR code on the canvas
        const x = (canvas.width - img.width) / 2;
        const y = (canvas.height - img.height) / 2;
        ctx.drawImage(img, x, y);

        // Convert to blob and download
        canvas.toBlob(blob => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'zuno-qr-code.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        });
      };
    }
  };

  const handlePrint = () => {
    if (printCount > 0) {
      setPrintCount(prev => prev - 1);

      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      // Add content to the print window
      printWindow.document.write(`
        <html>
          <head>
            <title>ZUNO QR Code</title>
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 2rem;
                font-family: system-ui, -apple-system, sans-serif;
              }
              .qr-container {
                width: 400px;
                height: 400px;
                margin-bottom: 2rem;
              }
              .code {
                font-size: 1.25rem;
                font-weight: 500;
                margin-bottom: 1rem;
              }
              .company {
                font-size: 1rem;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="qr-container">
              ${document.querySelector('.qr-code-svg')?.outerHTML}
            </div>
            <div class="code">${code}</div>
            <div class="company">${branch?.name}</div>
            <script>
              window.onload = () => {
                window.print();
                window.close();
              };
            </script>
          </body>
        </html>
      `);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div>
        <div className="text-base">
          Company Name:{' '}
          <span className="text-brand font-medium pl-2">{branch?.name}</span>
        </div>
      </div>

      <div className="flex gap-12">
        {/* QR Code Section */}
        <div className="flex-1 flex flex-col items-center">
          {/* QR Code with Character */}
          <div className="relative w-[400px] h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[320px] h-[320px] bg-white rounded-3xl shadow-lg p-8 relative">
                {/* QR Code Image */}
                {/* <div className="w-full h-full bg-white">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full qr-code-svg"
                  >
                    <rect x="20" y="20" width="20" height="20" fill="#6B21A8" />
                    <rect x="60" y="20" width="20" height="20" fill="#6B21A8" />
                    <rect x="20" y="60" width="20" height="20" fill="#6B21A8" />
                    <rect x="40" y="40" width="20" height="20" fill="#FF6E01" />
                  </svg>
                </div> */}
                <QRCodeSVG size={256} value={qrCodeUrl} />

                {/* Arms and Legs */}
                <div className="absolute -left-6 top-1/2 w-6 h-20 bg-white rounded-l-full -translate-y-1/2 shadow-md" />
                <div className="absolute -right-6 top-1/2 w-6 h-20 bg-white rounded-r-full -translate-y-1/2 shadow-md" />
                <div className="absolute -bottom-6 left-1/3 w-6 h-12 bg-white rounded-b-full shadow-md" />
                <div className="absolute -bottom-6 right-1/3 w-6 h-12 bg-white rounded-b-full shadow-md" />

                {/* Smile */}
                {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-8 bg-[#FF6E01] rounded-[100%] rotate-[15deg]" /> */}
              </div>
            </div>
          </div>

          {/* Code with Copy Button */}
          <div className="mt-8 w-full max-w-md">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-4">
              <span className="flex-1 text-center font-medium">{code}</span>
              <button
                onClick={handleCopyCode}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors group relative"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                )}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {copied ? 'Copied!' : 'Copy code'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="w-[400px]">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="space-y-2">
              <div>Coupon Name:</div>
              <div className="text-base font-semibold text-brand">
                ZUNO Labs coupon
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm">Hooray! Lets print your ZUNO code</p>
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={handleDownload}
                className="w-full py-4 bg-brand text-white rounded-lg font-medium hover:bg-brand-dark transition-colors"
              >
                Download Now
              </button>

              <div className="flex items-center">
                <button
                  onClick={handlePrint}
                  disabled={printCount === 0}
                  className={`flex-1 py-4 rounded-lg font-medium transition-colors ${
                    printCount > 0
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Print Now
                </button>
                <div className="ml-4 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg text-gray-700 font-medium">
                  {printCount.toString().padStart(2, '0')}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() =>
                  window.open('https://help.zuno.com/qr-printing', '_blank')
                }
                className="text-brand hover:underline"
              >
                Need help in printing your QR?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
