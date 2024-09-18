const virusTotalApiKey = "eb56fb5af7697b414e54f1364bff857d4e79ecbd4258b3e9d9d195061be0732f";

// Handle tab switching
function openTool(evt, toolName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(toolName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Generate report for uploaded files, including VirusTotal API check
async function generateReport() {
    const files = document.getElementById("fileUpload").files;
    const fileDetails = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = file.name;
        const fileType = file.type;
        const fileSize = file.size;

        let isDuplicate = false;
        for (let j = 0; j < fileDetails.length; j++) {
            if (fileDetails[j].name === fileName) {
                isDuplicate = true;
                break;
            }
        }

        // Check if the file is safe using VirusTotal
        let virusCheckResult = await checkFileSafety(file);

        fileDetails.push({
            name: fileName,
            type: fileType,
            size: fileSize,
            isDuplicate: isDuplicate,
            virusResult: virusCheckResult
        });
    }

    const report = fileDetails.map(file => 
        `<div class="${file.isDuplicate ? 'duplicate' : 'original'}">
            File: ${file.name} - Type: ${file.type} - Size: ${file.size}
            <br>Status: ${file.virusResult}
        </div>`
    ).join("");

    document.getElementById("fileReport").innerHTML = report;
}

// Check file safety using VirusTotal API (hash-based or content-based)
async function checkFileSafety(file) {
    const fileArrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', fileArrayBuffer);
    const fileHash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

    const virusTotalUrl = `https://www.virustotal.com/api/v3/files/${fileHash}`;
    const response = await fetch(virusTotalUrl, {
        method: "GET",
        headers: {
            "x-apikey": virusTotalApiKey
        }
    });

    if (response.ok) {
        const result = await response.json();
        const lastAnalysisStats = result.data.attributes.last_analysis_stats;
        if (lastAnalysisStats.malicious > 0) {
            return "Malicious";
        } else if (lastAnalysisStats.suspicious > 0) {
            return "Suspicious";
        } else {
            return "Safe";
        }
    } else {
        return "Unknown (not scanned)";
    }
}

// Compress and delete duplicates (dummy implementation)
function deleteDuplicates() {
    const files = document.getElementById("duplicateFileUpload").files;
    const zip = new JSZip();
    
    for (let i = 0; i < files.length; i++) {
        if (!isDuplicate(files[i])) {
            zip.file(files[i].name, files[i]);
        }
    }

    zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, "cleaned_files.zip");
    });
}

function isDuplicate(file) {
    // Implement your duplicate detection logic here
    return false; 
}
