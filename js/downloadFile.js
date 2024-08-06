// 文件下载
export function downloadFile(url, label) {
    return axios.get(url, { responseType: "blob" }).then((res) => {
        const blob = new Blob([res.data]);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = label;
        link.click();
        URL.revokeObjectURL(link.href);
    }).catch(console.error);
}