const readFile = (reader: FileReader) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = () => {
        var file = input.files?.[0];
        if (file) {
            if (file.size > 1048576) { // 太大容易卡
                alert("目前不建议上传大于 1MB 的图片哦！");
                return;
            }
            if (file) {
                reader.readAsDataURL(file);
            }
        }
    }
    input.click();
}

export { readFile }