import http from "@/api/apron";

export const getApron = params => http.get('/piclog/_search')

export const getsupplementaryList = params => http.get('/settle/processSystem/')
