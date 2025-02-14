import React from 'react'

export default function Selection() {
  return (
    <form className='flex justify-center border-img  flex-col md:w-[25%] w-4/6 m-auto gap-4 border rounded-2xl p-4'
      onSubmit={onSubmit}
    >
      <div className='block text-center bg-primary border border-dashed rounded-lg mb-2 h-[7rem]'>
        <div className='w-[14rem] text-white place-self-center m-3'>
          <h1 className='text-2xl font-bold'>Techember Fest "25</h1>
          <p className='text-[8px]'>Join us for an unforgettable experience at Techember Fest "25! Secure your spot now.</p>
          <p className='text-[8px]'>📍 04 Rumens road, Ikoyi, Lagos. || March 15, 2025 | 7:00PM</p>
        </div>
      </div>
      <hr className='border border-img ' />
      <div>

      </div>
      <div>
        <select name="" id=""></select>
      </div>

      <button type='submit' className='bg-beta text-white p-2 rounded-lg cursor-pointer text-[10px]'>Get My Free Ticket
      </button>
      {selectedTicket && (
        <div className="mt-6 p-4 border border-[#00A8E8] rounded-md text-center">
          <h4 className="text-lg font-semibold">Selected Ticket:</h4>
          <p className="text-gray-200">
            {selectedTicket.type} - ${selectedTicket.price}
          </p>
        </div>
      )}
    </form>
  )
}
