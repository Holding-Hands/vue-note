import http from "@/api/apron";

const getApron = params => http.get('/piclog/_search')

export default {
  getApron
}
