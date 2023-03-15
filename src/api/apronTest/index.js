import http from "@/api/apron";
import file from "@/api/file";

const getApron = params => http.get('/piclog/_search')

const getsupplementaryList = params => http.get('/settle/processSystem/')

const downloadFile = fileId => file.get(`/file-base-server/api/v1/sys/download/${fileId}`)

export default {
  getsupplementaryList,
  getApron,
  downloadFile
}
