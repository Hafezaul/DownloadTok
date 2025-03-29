// Alert Notification for Premium
document.getElementById("myBtn").addEventListener("click", function () {
  Swal.fire({
    title: "Nikmati masa free saja",
    text: "Maaf sementara fitur Pro belum kami kembangkan",
    icon: "info",
  });
});

// Paste Notification

const pasteInput = document.getElementById("pasteInput");
const pasteButton = document.getElementById("pasteButton");
const downloadButton = document.getElementById("downloadButton");
const linkPreview = document.getElementById("linkPreview");
const progressContainer = document.querySelector(".progress-container");
const downloadProgress = document.getElementById("downloadProgress");
const downloadStatus = document.getElementById("downloadStatus");

function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

async function downloadFile(url) {
  try {
    // Tampilkan progress container
    progressContainer.style.display = "block";
    downloadStatus.textContent = "Memulai download...";
    downloadProgress.style.width = "0%";
    downloadProgress.classList.add("progress-bar-animated");

    // Fetch file
    const response = await fetch(url);

    // Dapatkan ukuran total file
    const contentLength = response.headers.get("Content-Length");
    const total = parseInt(contentLength, 10);
    let loaded = 0;

    // Buat stream pembaca
    const reader = response.body.getReader();
    const chunks = [];

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      chunks.push(value);
      loaded += value.length;

      // Update progress bar
      if (total) {
        const percent = Math.round((loaded / total) * 100);
        downloadProgress.style.width = `${percent}%;`;
        downloadStatus.textContent = `Downloading: ${percent}%;`;
      }
    }

    // Gabungkan chunk
    const blob = new Blob(chunks);

    // Dapatkan nama file dari URL atau header
    const filename = getFilenameFromURL(url, response.headers);

    // Buat link download
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename;

    // Trigger download
    downloadLink.click();

    // Reset progress
    downloadProgress.classList.remove("progress-bar-animated");
    downloadStatus.textContent = "Download selesai!";
    setTimeout(() => {
      progressContainer.style.display = "none";
    }, 2000);
  } catch (error) {
    console.error("Download error:", error);
    downloadStatus.textContent =
      "Gagal mendownload. Periksa kembali link Anda.";
    downloadProgress.classList.add("bg-danger");
  }
}

function getFilenameFromURL(url, headers) {
  // Coba ambil nama file dari header Content-Disposition
  const contentDisposition = headers.get("Content-Disposition");
  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
    if (filenameMatch) return filenameMatch[1];
  }

  // Jika tidak ada, gunakan bagian terakhir dari URL
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    return pathParts[pathParts.length - 1] || "download";
  } catch {
    return "download";
  }
}

pasteButton.addEventListener("click", async () => {
  try {
    const clipboardText = await navigator.clipboard.readText();
    pasteInput.value = clipboardText;

    if (isValidURL(clipboardText)) {
      linkPreview.innerHTML = `
                        <div class="alert alert-success" role="alert">
                            Link valid. Siap untuk download!
                        </div>
                    `;
      downloadButton.disabled = false;
    } else {
      linkPreview.innerHTML = `
                        <div class="alert alert-warning" role="alert">
                            Link tidak valid. Pastikan Anda memasukkan URL yang benar.
                        </div>
                    `;
      downloadButton.disabled = true;
    }
  } catch (err) {
    console.error("Gagal membaca clipboard:", err);
    linkPreview.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        Tidak dapat mengakses clipboard.
                    </div>
                `;
  }
});

downloadButton.addEventListener("click", () => {
  const url = pasteInput.value;
  if (isValidURL(url)) {
    downloadFile(url);
  }
});

// Alert Notification
document.getElementById("alert").addEventListener("click", function () {
  Swal.fire({
    title: "Masih dalam tahap pengembangan",
    text: "Kami sedang mengusahakan yang terbaik :)",
    icon: "warning",
  });
});

document.getElementById("alert1").addEventListener("click", function () {
  Swal.fire({
    title: "Masih dalam tahap pengembangan",
    text: "Kami sedang mengusahakan yang terbaik :)",
    icon: "warning",
  });
});

document.getElementById("alert2").addEventListener("click", function () {
  Swal.fire({
    title: "Masih dalam tahap pengembangan",
    text: "Kami sedang mengusahakan yang terbaik :)",
    icon: "warning",
  });
});
