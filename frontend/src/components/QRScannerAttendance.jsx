import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import api from "../services/api";

function QRScannerAttendance({ unitId, attendanceDate, onClose }) {
  const qrCodeRef = useRef(null);
  const scannerContainerId = "qr-reader-box";

  useEffect(() => {
    let scanner;

    const startScanner = async () => {
      try {
        scanner = new Html5Qrcode(scannerContainerId);
        qrCodeRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 5,
            qrbox: { width: 220, height: 220 },
          },
          async (decodedText) => {
            try {
              await api.post("/unit-attendance/mark", {
                qrCodeValue: decodedText,
                unitId,
                attendanceDate,
                status: "Present",
              });

              alert("Attendance marked successfully");

              if (scanner) {
                await scanner.stop();
                await scanner.clear();
              }

              if (onClose) onClose();
            } catch (error) {
              alert(
                error.response?.data?.message || "Failed to mark attendance"
              );
            }
          },
          () => {}
        );
      } catch (error) {
        console.error("QR scanner failed to start", error);
        alert("Unable to access camera. Please allow camera permission and try again.");
      }
    };

    startScanner();

    return () => {
      const stopScanner = async () => {
        try {
          if (qrCodeRef.current) {
            const state = qrCodeRef.current.getState?.();
            if (state === 2 || state === 1) {
              await qrCodeRef.current.stop().catch(() => {});
            }
            await qrCodeRef.current.clear().catch(() => {});
            qrCodeRef.current = null;
          }
        } catch (error) {
          console.error("Failed to close scanner", error);
        }
      };

      stopScanner();
    };
  }, [unitId, attendanceDate, onClose]);

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h3 style={{ marginBottom: "6px" }}>QR Scanner</h3>
          <p className="small-text" style={{ marginBottom: 0 }}>
            Allow camera access and scan the student QR code.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{ width: "auto", minWidth: "130px" }}
        >
          Close Scanner
        </button>
      </div>

      <div
        id={scannerContainerId}
        style={{
          width: "100%",
          maxWidth: "420px",
          margin: "20px auto 0",
        }}
      ></div>
    </div>
  );
}

export default QRScannerAttendance;