import APIS from './apis';
import axiosApi from '../helper/axios';

const listAnomalies = async () => {
  const json = await axiosApi({
    method: 'get',
    url: APIS.ALL_ANOMALIES
  });
  const result = await json.data;
  return result;
};

const editAnomaly = async (id, data) => {
  const json = await axiosApi({
    method: 'put',
    url: `${APIS.EDIT_ANOMALIES}/${id}`,
    data: data,
  });
  const result = await json.data;
  return result;
};

const apiServices = {
  listAnomalies: listAnomalies,
  editAnomaly: editAnomaly
}

export default apiServices;