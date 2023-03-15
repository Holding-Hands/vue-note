import file from "@/api/file";

const uploadFile = params => file.post('/file-base-server/api/v1/sys/upload', params)
const downloadFile = fileId => file.get(`/file-base-server/api/v1/sys/download/${fileId}`)

export default {
  downloadFile,
  uploadFile
}


