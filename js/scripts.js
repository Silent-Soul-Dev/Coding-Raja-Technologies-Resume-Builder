function updatePreview() {
    const templateSelect = document.getElementById('templateSelect').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;

    fetch(`/templates/${templateSelect}`)
        .then(response => response.text())
        .then(template => {
            let filledTemplate = template;
            filledTemplate = filledTemplate.replace('{{name}}', name);
            filledTemplate = filledTemplate.replace('{{email}}', email);
            filledTemplate = filledTemplate.replace('{{phone}}', phone);
            filledTemplate = filledTemplate.replace('{{education}}', education);
            filledTemplate = filledTemplate.replace('{{experience}}', experience);
            filledTemplate = filledTemplate.replace('{{skills}}', skills);

            const previewFrame = document.getElementById('resumePreview');
            previewFrame.contentDocument.open();
            previewFrame.contentDocument.write(filledTemplate);
            previewFrame.contentDocument.close();
        });
}

async function downloadResume() {
    // Ensure jsPDF is loaded
    const { jsPDF } = window.jspdf;

    // Select the iframe content
    const previewFrame = document.getElementById('resumePreview');

    // Capture the iframe content as a canvas
    html2canvas(previewFrame.contentDocument.body, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        // Create a new PDF document
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = 210; // A4 width in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;

        // Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        // Save the PDF file
        pdf.save('resume.pdf');
    }).catch(error => {
        console.error('Error generating PDF:', error);
    });
}