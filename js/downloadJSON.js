// 文件下载
export function downloadJson(content) {
    const jsonStr = JSON.stringify(content)
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(jsonStr)}`;

    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `sample.json`;

    link.click();
}