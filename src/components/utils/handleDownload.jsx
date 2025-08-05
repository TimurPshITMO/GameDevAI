 export default function handleDownload(filePath){

    fetch(filePath, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const link = document.createElement('a');
        link.href = url;
        link.download = filePath.split('/'[2]);

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      });
  };