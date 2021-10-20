const decoder = new TextDecoder();
const encoder = new TextEncoder();
csvFileInput = document.getElementById('FileCSV');
document.getElementById('EnviarCSV').addEventListener("click", (e) => {
    Papa.parse(csvFileInput.files[0], {
        delimiter: ",",
        skipEmptyLines: true,
        complete: datos
    })
});

function datos(result) {
    var data = result.data;
    console.log(data);
}