import Dropdown from '../partials/dashboard/dropdown'
import Anomally from '../partials/dashboard/anomally'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import Spectrogram from '../partials/spectogram';
import { useEffect, useState } from 'react';
import apiServices from '../../api-services';
import Popup from '../partials/popup';

export default function Dashboard () {
  const [anomalies, setAnomalies] = useState<any>({});
  const [currentAnomaly, setCurrentAnomaly] = useState<any>({});
  const [activeList, setActiveList] = useState(0);
  const [newAnomalies, setNewAnomalies] = useState<any>({});
  const [dataToSend, setDataToSend] = useState<any>({
    "reason": "",
    "action": "",
    "comments": "",
    "new": false
  })
  const [loading, setLoading] = useState(false);

  function handleUpdate() {
    setLoading(() => (true));
    apiServices.editAnomaly(currentAnomaly.id, dataToSend).then(() => {
      setLoading(() => (false));

      apiServices.listAnomalies().then(data => {
        const counts = data.results.reduce((datum:any, { new: key }:{new:any}) => (datum[key] = (datum[key] || 0) + 1, datum), {});
        setNewAnomalies(() => {
          return counts;
        })
        setAnomalies(() => (
          data
        ))
      });
    });
  }
  useEffect(() => {
    apiServices.listAnomalies().then(data => {
      const counts = data.results.reduce((datum:any, { new: key }:{new:any}) => (datum[key] = (datum[key] || 0) + 1, datum), {});
      setNewAnomalies(() => {
        return counts;
      })
      setAnomalies(() => (
        data
      ))
    });
  },[])  
  
  return (
    <div className="min-h-screen bg-gray-100 flex px-5 pb-10 pt-20">
      <div className="flex flex-col w-full bg-white rounded-md">
        <div className="border-2 b-gray-200 rounded-t-md px-3 py-1">
          <Dropdown list={[
                      { label: 'CNC Machine' },
                      { label: 'Milling Machine' }
                    ]} className={'z-0'}
                    chooseData={() => {}} />
        </div>     
        <div className='border-2 border-t-0 h-full b-gray-200 rounded-b-md flex'>
          <section className='flex border-r-2 w-3/12 flex-col list-section'>
            <div className='px-6 py-3 border-b-2'>
              <span><ChevronLeftIcon className=' inline-block h-6 w-6' /></span>
              <span className='align-middle'>Back</span>
            </div>
            <div className='px-4 py-3 border-b-2'>
              <div className='flex flex-row gap-x-0.5 w-full'> 
                {
                  anomalies.results && (
                    <div className='w-20 text-center cursor-pointer rounded-md hover:bg-sky-800 hover:text-white text-gray-600'> {anomalies.results.length} Alerts</div>
                  )
                }
                {
                  newAnomalies.true && (
                    <div className='w-20 rounded-md cursor-pointer bg-sky-700 hover:bg-sky-800 text-center text-white'> {newAnomalies.true} New </div>
                  )
                }
              </div>
            </div>

            <div className='px-3 py-3 '>
              {
                anomalies.results && 
                anomalies.results.map( (data:any, index: string) => (
                  <Anomally 
                    key={index}
                    data={data}
                    currentId={activeList}
                    setActive={
                      (data:any) => {
                        setCurrentAnomaly(() => (data));
                        setActiveList(() => (data.id))
                      }
                    }
                  />
                ))
              }
              {/* <Anomally 
                newData={true}
                />
              <Anomally 
              />
              <Anomally 
              /> */}
            </div>
            <div></div>
          </section>
          <section className='flex w-9/12 flex-col detail-section px-4'>
            {
              currentAnomaly.id ? 
              (
                <>
                  <div className='w-full border-b-2 border-b-gray-300 py-5'>
                    <h3 className='text-xl text-gray-600'> Alert ID #{currentAnomaly.id} </h3>
                    <h4 className='text-l text-gray-500'> Detected at 2021-04-22 20:10:04 </h4>
                  </div>
                  <div className='flex py-4 space-x-8'>
                    <div className='w-1/2'>
                      <h3 className='text-xl text-gray-600 mb-3'> Anomaly Machine Output </h3>
                      {
                        currentAnomaly.anomalyFile &&
                        (
                          <div className='chart flex flex-col space-y-8'>
                            <Spectrogram 
                              key={`wave${currentAnomaly.id}`}
                              id={`wave${currentAnomaly.id}`}
                              spectrogramId={`spectro${currentAnomaly.id}`}
                              sounds={`${process.env.REACT_APP_BE_ENDPOINT}${currentAnomaly.anomalyFile}`}
                              />
                          </div>
                        )
                      }
                    </div>
                    <div className='w-1/2'>
                      <h3 className='text-xl text-gray-600 mb-3'> Normal Machine Output </h3>
                      <div className='chart flex flex-col space-y-8'>
                        {
                          currentAnomaly.normalFile &&
                          <Spectrogram 
                          key={`wave_normal${currentAnomaly.id}`}
                          id={`wave_normal${currentAnomaly.id}`}
                          spectrogramId={`spectro_normal${currentAnomaly.id}`}
                            sounds={`${process.env.REACT_APP_BE_ENDPOINT}${currentAnomaly.normalFile}`}
                            />
                        }
                      </div>
                    </div>
                  </div>
                  <div className='my-3'>
                    <h2 className='font-semibold'>Equipment</h2>
                    <h2 className='font-normal text-gray-600'> CNC Machine </h2>
                    <h2 className='font-semibold'>Suspected Reason</h2>
                    <Dropdown 
                      key={`reason_${currentAnomaly.id}`}
                      list={[
                        { label: 'Unknown Anomaly 1' },
                        { label: 'Unknown Anomaly 2' }
                      ]} 
                      currentData={
                        { label: currentAnomaly.reason }
                      }
                      className={'z-20'}  
                      chooseData={(selected:String) => (setDataToSend((prevData:any) => ( {...prevData, 'reason': selected } )))}
                      />
                    <h2 className='font-semibold'>Action Required</h2>
                    <Dropdown 
                      key={`action_${currentAnomaly.id}`}
                      list={[
                        { label: 'Action 1' },
                        { label: 'Action 2' }
                      ]}
                      currentData={
                        { label: currentAnomaly.action }
                      }
                      className={'z-10'}
                      chooseData={(selected:String) => (setDataToSend((prevData:any) => ( {...prevData, 'action': selected } )))}
                      />
                    <h2 className='mt-6 font-semibold'>Comments</h2>
                    <textarea 
                      key={`comments_${currentAnomaly.id}`}
                      onChange={(e) => (setDataToSend((prevData:any) => ( {...prevData, 'comments': e.target.value } )))} className='border-2 border-gray-300 rounded-md' 
                      rows={4} 
                      cols={50} 
                      defaultValue={currentAnomaly.comments}
                      /> <br />
                    <button disabled={loading} onClick={() => handleUpdate()} className='mt-6 text-white bg-blue-600 rounded-md px-6 py-2'> {loading ? 'Loading...' : 'Update'} </button>
                    <Popup 
                      openModal={loading}
                    />
                  </div>
                </>
              ) : 'Select Anomaly to Continue'
            }
          </section>
        </div>
      </div>
    </div>
  )
}