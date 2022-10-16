import Ellipse from '../../../assets/Ellipse.png'
import moment from 'moment';

type anomallyType = {
  active?: boolean,
  newData?: boolean,
  data: any,
  setActive: (data:object) => void,
  currentId?: number
}
function classNames(...classes:String[]) {
  return classes.filter(Boolean).join(' ')
}
function alert(type:string) {
  const typeAlert = type.toLowerCase();
  switch (typeAlert) {
    case 'severe':
      return 'bg-red-500';
    case 'mild':
      return 'bg-green-500';
    case 'moderate':
      return 'bg-orange-500';
    default:
      return 'bg-green-500';
  }

}
export default function Anomally({ newData, data, setActive, currentId}: anomallyType) {
  const active = currentId == data.id;
  return (
    <div onClick={() => setActive(data)} className={classNames(active ? 'border-2 border-sky-600' : 'border border-gray-200',"cursor-pointer mb-3 hover:border-sky-600 p-6 max-w-sm bg-white rounded-lg")}>
        <div className="flex flex-cols relative">  
          {
            data.new && <span style={{left:'-14px', top: '5px'}} className="text-9xl inline text-sky-600 absolute"> <img src={Ellipse} alt='Ellipse' /> </span>
          }
          <span className="w-6/12">
              <h5 className="mb-2 text-sm tracking-tight text-gray-600">ID #{data.id} </h5>
          </span>
          <span className="text-right w-6/12">
              <h5 className={`${alert(data.alertType)} mb-2 w-auto float-right text-sm tracking-tight px-5 rounded-md text-white`}>{data.alertType}</h5>
          </span>
        </div>
        <p className="text-sm font-semibold text-gray-900">Unknown Anomally</p>
        <p className="mb-3 text-sm text-gray-600">Detected at {moment(data.detectionTime).format('YYYY-MM-DD HH:mm:ss')}</p>
        <a href="#!" className="inline-flex text-sm items-center text-blue-600 hover:underline">
          {data.equipment}
        </a>
    </div>

  )
}