import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function PhoneScanner() {
  useEffect(() => {
    // Initialize the QR code scanner with configuration
    const scanner = new Html5QrcodeScanner(
      "qr-reader",  // The ID of the container where the scanner will display
      {
        fps: 10,  // Frames per second
        qrbox: 250,  // Size of the scanning box
      },
      false  // Disables verbose logging
    );

    // Start scanning
    scanner.render(
      (decodedText: string) => {
        console.log("Scanned QR code: ", decodedText);
        // Here you can send the decodedText (QR data) to the backend or perform other actions
        alert(`QR Code Scanned: ${decodedText}`);

        // Optionally, you can stop the scanner after one scan
        scanner.clear();  // Stop the scanning after getting the result
      },
      (error: any) => {
        console.warn("QR scan error:", error);
      }
    );

    // Cleanup function to clear scanner when component unmounts
    return () => {
      scanner.clear().catch(console.error);
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Scan QR Code with your phone</h2>
      <div id="qr-reader" className="w-full max-w-md mx-auto" style={{ height: '400px' }}></div>
    </div>
  );
}
